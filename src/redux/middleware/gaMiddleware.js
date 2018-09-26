import { filterCategoryDetails, isKeyExists } from 'utils/helper';
import { CART_URL } from 'helpers/Constants';
import { getCartListSKU, getCartListSKUFromResult } from 'selectors/cart';

export default function gaMiddleware() {
  return ({ getState }) => next => action => {
    if (__CLIENT__) {
      const { payload, type } = action;
      if (window && window.dataLayer) {
        if (type === '@@router/LOCATION_CHANGE') {
          const location = payload.pathname;
          window.dataLayer.push({
            event: 'pageviewtracking',
            vpv: location
          });
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
        if (type === 'productdetails/LOAD_PRODUCT_DESCRIPTION_SUCCESS' && !action.result.error_message) {
          window.google_tag_params.ecomm_pagetype = 'product';
          window.google_tag_params.ecomm_totalvalue = action.result.meta.special_price || action.result.meta.price;
          const { position } = getState().productdetails;
          const {
            name, sku, price, brand, category_details: categoryDetails, color
          } = action.result.meta;
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
        if (type === 'products/LOAD_FILTER_SUCCESS') {
          const { location } = getState().router;
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
          const checkKey = isKeyExists(action.result, 'metadata.category_details');
          const category = checkKey
            ? checkKey
              .filter(x => x !== null)
              .map(item => item.url_key)
              .join('/')
            : '';
          const results = action.result && action.result.success ? action.result.metadata.results : [];
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
          const { id_customer_cart: idcustomerCart, cart: { summary: { total } } } = action.result;
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
        if (type === 'cart/REMOVE_FROM_CART_SUCCESS') {
          const { data } = getState().cart;
          const { cart: { summary: { total } } } = action.result;
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
                const category = categoryDetails
                  ? categoryDetails
                    .filter(x => x !== null)
                    .map(pp => pp.url_key)
                    .join('/')
                  : '';
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
        const { location: { pathname } } = getState().router;
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
                sku, name, qty, price, brand, category_details, color
              } = x;
              skus.push(sku);
              return {
                id: sku,
                name,
                quantity: qty,
                variant: color,
                category: category_details,
                price,
                brand
              };
            });
            const paymentObj = {
              event: 'purchase',
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
            };
            window.google_tag_params.ecomm_pagetype = 'purchase';
            window.google_tag_params.ecomm_prodid = skus;
            window.google_tag_params.ecomm_totalvalue = net_order_amount;
            /* customer type */
            let cust_type;
            if (customer_type === 'returning customer') cust_type = 'Repeat';
            else cust_type = 'Fresh';
            window.dataLayer.push(paymentObj, { event: 'buyer_type', type: cust_type });
          }
        }
        if (type === 'mainSlider/BANNER_IMPRESSION') {
          const { homepage: { banners: { data } } } = getState();
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
        if (type === 'mainSlider/BANNER_CLICK') {
          const { homepage: { banners: { data } } } = getState();
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
    }
    return next(action);
  };
}
