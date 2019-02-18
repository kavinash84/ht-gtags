import { filterCategoryDetails, isKeyExists } from 'utils/helper';
import { CART_URL } from 'helpers/Constants';
import { getCartListSKU, getCartListSKUFromResult } from 'selectors/cart';
import { resetReferrer } from '../modules/analytics';

export default function gaMiddleware() {
  return ({ getState, dispatch }) => next => action => {
    if (__CLIENT__) {
      const { payload, type } = action;
      const {
        analytics: { isFirstHit }
      } = getState();
      if (window && window.dataLayer) {
        if (type === 'TRACK_PAGEVIEW') {
          const {
            location: { pathname, search }
          } = window;
          window.dataLayer.push({
            event: 'pageviewtracking',
            vpv: `${pathname}${search}`.trim()
          });
        }
        if (type === '@@router/LOCATION_CHANGE') {
          const {
            location: { hostname, pathname }
          } = window;
          const location = (payload && payload.pathname) || pathname;
          if (document.referrer !== '' && document.referrer !== hostname && isFirstHit !== 1) {
            Object.defineProperty(document, 'referrer', { get: () => hostname });
          }
          if (isFirstHit === 1) dispatch(resetReferrer());
          if (location === '/') {
            window.google_tag_params.ecomm_pagetype = 'home';
            window.google_tag_params.ecomm_totalvalue = '';
            window.google_tag_params.ecomm_prodid = [];
          } else if (location === CART_URL) {
            window.google_tag_params.ecomm_pagetype = 'cart';
            if (getState().cart.summary) {
              window.google_tag_params.ecomm_totalvalue = getState().cart.summary.total;
              window.google_tag_params.ecomm_prodid = getCartListSKU(getState().cart);
            }
          } else if (location === '/search/') {
            window.google_tag_params.ecomm_pagetype = 'searchresults';
          } else if (location === '/payment-success') {
            window.google_tag_params.ecomm_pagetype = 'purchase';
          } else {
            window.google_tag_params.ecomm_pagetype = 'other';
            window.google_tag_params.ecomm_totalvalue = '';
            window.google_tag_params.ecomm_prodid = [];
          }
        }
        if (type === 'productdetails/LOAD_PRODUCT_DESCRIPTION') {
          const { products } = getState();
          const { position } = getState().productdetails;
          let eventObject;
          if (products && products.list.length > 0) {
            const product = products.list[position - 1];
            const checkKey = isKeyExists(products, 'data.metadata.category_details');
            const category = checkKey
              ? checkKey
                .filter(x => x !== null)
                .map(item => item.url_key)
                .join('/')
              : '';
            if (product) {
              const {
                name, sku, price, brand, color
              } = product.data;
              eventObject = {
                event: 'productClick',
                ecommerce: {
                  click: {
                    actionField: { list: 'Listing' },
                    products: [
                      {
                        name,
                        price,
                        brand,
                        category,
                        position,
                        id: sku,
                        variant: color
                      }
                    ]
                  }
                }
              };
              window.dataLayer.push(eventObject);
            }
          }
        }
        if (type === 'productdetails/PRODUCT_DETAILS_TRACK') {
          const { position, productDescription } = getState().productdetails;
          window.google_tag_params.ecomm_pagetype = 'product';
          window.google_tag_params.ecomm_totalvalue =
            productDescription.meta.special_price || productDescription.meta.price;
          const {
            name, sku, price, brand, category_details: categoryDetails, color
          } = productDescription.meta;
          const category = filterCategoryDetails(categoryDetails)
            .map(item => item.url_key)
            .join('/');
          const eventObject = {
            event: 'productDetail',
            ecommerce: {
              click: {
                actionField: { list: 'Listing' },
                products: [
                  {
                    name,
                    price,
                    brand,
                    category,
                    position,
                    variant: color,
                    id: sku
                  }
                ]
              }
            }
          };
          window.google_tag_params.ecomm_prodid = sku;
          window.dataLayer.push(eventObject);
        }
        if (type === 'products/LISTING_TRACK') {
          const {
            router: { location },
            products: { list: results, data }
          } = getState();
          if (location.pathname === '/search/') {
            window.google_tag_params.ecomm_pagetype = 'searchresults';
          } else {
            window.google_tag_params.ecomm_pagetype = 'category';
          }
          const eventObject = {
            event: 'impression',
            ecommerce: {
              currencyCode: 'INR',
              impressions: []
            }
          };
          const skus = [];
          let totalValue = 0;
          const checkKey = isKeyExists(data, 'metadata.category_details');
          const category = checkKey
            ? checkKey
              .filter(x => x !== null)
              .map(item => item.url_key)
              .join('/')
            : '';
          eventObject.ecommerce.impressions = results.map((item, position) => {
            const {
              name, sku, price, brand, color, special_price: netprice
            } = item.data;
            skus.push(sku);
            totalValue += parseInt(netprice, 10) || parseInt(price, 10);
            return {
              name,
              price,
              brand,
              category,
              position: position + 1,
              id: sku,
              variant: color,
              list: location.pathname === '/search/' ? 'Search Result' : ' category listing page'
            };
          });

          window.google_tag_params.ecomm_prodid = skus;
          window.google_tag_params.ecomm_totalvalue = String(totalValue);

          window.dataLayer.push(eventObject);
        }
        /* Cart Tracking */
        if (type === 'cart/ADD_TO_CART_SUCCESS') {
          const {
            id_customer_cart: idcustomerCart,
            cart: {
              summary: { total }
            }
          } = action.result;
          const [product] =
            action.result && action.result.cart.cart.filter(item => item.id_customer_cart === idcustomerCart);
          const {
            name, net_price: netprice, color, brand, category_details: categoryDetails
          } = product.product_info;
          const category = categoryDetails ? categoryDetails.join('/') : null;
          window.dataLayer.push(
            {
              event: 'addToCart',
              ecommerce: {
                currencyCode: 'INR',
                add: {
                  products: [
                    {
                      name,
                      price: netprice,
                      variant: color,
                      brand,
                      category,
                      list: 'Listing',
                      id: product.configurable_sku,
                      quantity: product.qty
                    }
                  ]
                }
              }
            },
            {
              event: 'cart change',
              cart_total: total
            }
          );
        }
        if (type === 'cart/UPDATE_CART_SUCCESS') {
          const {
            id_customer_cart: idcustomerCart,
            cart: {
              summary: { total }
            }
          } = action.result;
          const [product] =
            action.result && action.result.cart.cart.filter(item => item.id_customer_cart === idcustomerCart);
          const {
            name, net_price: netprice, color, brand, category_details: categoryDetails
          } = product.product_info;
          const category = categoryDetails ? categoryDetails.join('/') : null;
          const { updateType } = action.result;
          window.dataLayer.push(
            {
              event: updateType === 'add' ? 'addToCart' : 'removeFromCart',
              ecommerce: {
                currencyCode: 'INR',
                [updateType]: {
                  products: [
                    {
                      name,
                      price: netprice,
                      variant: color,
                      brand,
                      category,
                      list: 'Listing',
                      id: product.configurable_sku,
                      quantity: product.qty
                    }
                  ]
                }
              }
            },
            {
              event: 'cart change',
              cart_total: total
            }
          );
        }
        if (type === 'cart/REMOVE_FROM_CART_SUCCESS') {
          const { data } = getState().cart;
          const {
            cart: {
              summary: { total }
            }
          } = action.result;
          const [product] = data.filter(item => item.id_customer_cart === Number(action.result.cartId));
          if (product) {
            const checkKey = isKeyExists(product.product_info, 'category_details');
            const category = checkKey
              ? checkKey
                .filter(x => x !== null)
                .map(item => item.url_key)
                .join('/')
              : '';
            const {
              name, net_price: netprice, color, brand
            } = product.product_info;
            if (action.result) {
              window.google_tag_params.ecomm_totalvalue = action.result.cart.summary.total;
              window.google_tag_params.ecomm_prodid = getCartListSKUFromResult(action.result.cart);
            }
            window.dataLayer.push(
              {
                event: 'removeFromCart',
                ecommerce: {
                  currencyCode: 'INR',
                  remove: {
                    products: [
                      {
                        name,
                        price: netprice,
                        brand,
                        id: product.configurable_sku,
                        category,
                        list: 'Listing', // eg Search Result, //D
                        variant: color,
                        quantity: product.qty
                      }
                    ]
                  }
                }
              },
              {
                event: 'cart change',
                cart_total: total
              }
            );
          }
        }
        // Handles Checkout GA
        if (type === '@@router/LOCATION_CHANGE') {
          const location = payload.pathname;
          if (location === '/checkout/delivery-address' || '/checkout/payment-options' || '/checkout/review-order') {
            const { data } = getState().cart;
            let products;
            if (data) {
              products = data.map(item => {
                const { name, net_price: netprice, category_details: categoryDetails } = item.product_info;
                const category = categoryDetails ? categoryDetails.filter(x => x !== null).join('/') : '';
                return {
                  name,
                  price: netprice,
                  brand: '',
                  id: item.configurable_sku,
                  category,
                  variant: '',
                  quantity: item.qty
                };
              });
            }
            const eventObject = {
              event: 'checkout',
              ecommerce: {
                checkout: {
                  actionField: { step: null, option: '' },
                  products
                }
              }
            };
            if (location === '/checkout/delivery-address') {
              eventObject.ecommerce.checkout.actionField.step = 1;
              eventObject.ecommerce.checkout.actionField.option = 'Shipping and Login';
              window.dataLayer.push(eventObject);
            }
            if (location === '/checkout/payment-options') {
              eventObject.ecommerce.checkout.actionField.step = 2;
              eventObject.ecommerce.checkout.actionField.option = 'Payment Method';
              window.dataLayer.push(eventObject);
            }
            if (location === '/checkout/review-order') {
              eventObject.ecommerce.checkout.actionField.step = 3;
              eventObject.ecommerce.checkout.actionField.option = 'Order Review';
              window.dataLayer.push(eventObject);
            }
          }
        }
        // Handle Payment success
        /* eslint-disable camelcase */
        const {
          location: { pathname }
        } = getState().router;
        if (type === 'PUSH_TO_DATALAYER' && pathname && pathname === '/payment-success') {
          const { data } = getState().paymentstatus;
          if (data) {
            const {
              cart_products: products,
              net_order_amount,
              shipping_charges,
              transaction_id,
              coupon_code,
              customer_type
            } = data;
            const skus = [];
            const cartList = products.map(x => {
              const {
                sku,
                name,
                qty,
                price,
                brand,
                categories,
                details: {
                  attributes: { color }
                }
              } = x;
              skus.push(sku);
              return {
                id: sku,
                name,
                quantity: qty,
                variant: color,
                category: categories ? categories.split('|').join('/') : '',
                price,
                brand
              };
            });
            const paymentObj = {
              event: 'purchase',
              ecommerce: {
                purchase: {
                  actionField: {
                    id: transaction_id,
                    affiliation: 'Online Store',
                    revenue: net_order_amount,
                    tax: '',
                    shipping: shipping_charges,
                    coupon: coupon_code || ''
                  },
                  products: [...cartList]
                }
              }
            };
            window.google_tag_params.ecomm_pagetype = 'purchase';
            window.google_tag_params.ecomm_prodid = skus;
            window.google_tag_params.ecomm_totalvalue = net_order_amount;
            /* customer type */
            const cust_type = customer_type === 'returning customer' ? 'Repeat' : 'Fresh';
            window.dataLayer.push(paymentObj, { event: 'buyer_type', type: cust_type });
          }
        }
        if (type === 'mainSlider/BANNER_IMPRESSION') {
          const {
            homepage: {
              banners: { data }
            }
          } = getState();
          if (pathname !== '/plan-your-kitchen') {
            if (data && data.length) {
              const imp = data[action.payload];
              const obj = {
                event: 'promotionImpression',
                ecommerce: {
                  promoView: {
                    promotions: [
                      {
                        ...imp.meta,
                        position: action.payload + 1,
                        creative: imp.image
                      }
                    ]
                  }
                }
              };
              window.dataLayer.push(obj);
            }
          }
        }
        if (type === 'mainSlider/BANNER_CLICK') {
          const {
            homepage: {
              banners: { data }
            }
          } = getState();
          if (data && data.length) {
            const imp = data[action.payload];
            const obj = {
              event: 'promotionClick',
              ecommerce: {
                promoClick: {
                  promotions: [
                    {
                      ...imp.meta,
                      position: action.payload + 1,
                      creative: imp.image
                    }
                  ]
                }
              }
            };
            window.dataLayer.push(obj);
          }
        }
      }
      if (type === 'cart/UPDATE_CART_SUCCESS') {
        if (action.result.cart.summary) {
          window.google_tag_params.ecomm_totalvalue = action.result.cart.summary.total;
        }
      }
      if (type === 'signUp/SIGNUP_SUCCESS') {
        const {
          result: { origin }
        } = action;
        const signUpEvent = {
          event: 'event register',
          category: 'New User Sign Up',
          action: 'Register',
          label: origin
        };
        window.dataLayer.push(signUpEvent);
      }
      if (type === 'checkout/SEND_DELIVERY_ADDRESS_SUCCESS') {
        const origin = 'Guest Sign up';
        const signUpEvent = {
          event: 'event register',
          category: 'New User Sign Up',
          action: 'Register',
          label: origin
        };
        window.dataLayer.push(signUpEvent);
      }
    }
    return next(action);
  };
}
