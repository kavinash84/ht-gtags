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
          window.google_tag_params.ecomm_pagetype = 'other';
          if (location === '/cart') {
            window.google_tag_params.ecomm_pagetype = 'cart';
            if (getState().cart.summary) {
              window.google_tag_params.ecomm_totalvalue = getState().cart.summary.total;
            }
          }
          if (location === '/') {
            window.google_tag_params.ecomm_pagetype = 'home';
          }
          if (location === '/search/') {
            window.google_tag_params.ecomm_pagetype = 'searchresults';
          }
        }
        if (type === 'productdetails/LOAD_PRODUCT_DESCRIPTION') {
          const { products } = getState();
          const { query } = products;
          const category = query ? JSON.parse(window.atob(query)).params.join('/') : null;
          const { position } = getState().productdetails;
          const product = products.list[position - 1];

          const {
            name, sku, price, brand
          } = product.data;

          const eventObject = {
            event: 'productClick',
            ecommerce: {
              click: {
                actionField: { list: '' }, //
                products: [
                  {
                    name,
                    price,
                    brand,
                    category,
                    position,
                    id: sku,
                    variant: ''
                  }
                ]
              }
            }
          };

          window.dataLayer.push(eventObject);
        }
        if (type === 'productdetails/LOAD_PRODUCT_DESCRIPTION_SUCCESS') {
          window.google_tag_params.ecomm_pagetype = 'product';
          window.google_tag_params.ecomm_totalvalue = action.result.meta.price;
          const { query } = getState().products;
          const category = query ? JSON.parse(window.atob(query)).params.join('/') : null;
          const { position } = getState().productdetails;
          const {
            name, sku, price, brand
          } = action.result.meta;
          const { color } = action.result.attributes;
          const eventObject = {
            event: 'productDetail',
            ecommerce: {
              click: {
                actionField: { list: '' }, //
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

          window.dataLayer.push(eventObject);
        }
        if (type === 'products/LOAD_FILTER_SUCCESS') {
          window.google_tag_params.ecomm_pagetype = 'category';
          const eventObject = {
            event: 'impression',
            ecommerce: {
              currencyCode: 'INR',
              impressions: []
            }
          };
          const { query } = getState().products;
          const { location } = getState().router;

          const category = query ? JSON.parse(window.atob(query)).params.join('/') : null;
          eventObject.impressions = action.result.metadata.results.map((item, position) => {
            const {
              name, sku, price, brand
            } = item.data;
            return {
              name,
              price,
              brand,
              category,
              position: position + 1,
              id: sku,
              variant: '', // ? To be discussed ?
              list: location.pathname === '/search/' ? 'Search Result' : ' category listing page'
            };
          });
          window.dataLayer.push(eventObject);
        }
        if (type === 'cart/ADD_TO_CART_SUCCESS') {
          const { id_customer_cart: idcustomerCart } = action.result;
          const [product] = action.result.cart.cart.filter(item => item.id_customer_cart === idcustomerCart);
          // const { query } = getState().products;
          // const category = query ? JSON.parse(window.atob(query)).params.join('/') : null;
          const { name, net_price: netprice } = product.product_info;
          window.dataLayer.push({
            event: 'addToCart',
            ecommerce: {
              currencyCode: 'INR',
              add: {
                products: [
                  {
                    name,
                    price: netprice,
                    brand: '', // Missing
                    // category,
                    list: '', // eg Search Result,
                    id: product.configurable_sku,
                    quantity: product.qty
                  }
                ]
              }
            }
          });
        }
        if (type === 'cart/REMOVE_FROM_CART_SUCCESS') {
          const { data } = getState().cart;
          const [product] = data.filter(item => item.id_customer_cart === action.payLoad);
          // const { query } = getState().products;
          // const category = query ? JSON.parse(window.atob(query)).params.join('/') : null;
          const { name, net_price: netprice } = product.product_info;
          window.dataLayer.push({
            event: 'removeFromCart',
            ecommerce: {
              currencyCode: 'INR',
              remove: {
                products: [
                  {
                    name,
                    price: netprice,
                    brand: '',
                    id: product.configurable_sku,
                    // category,
                    list: '', // eg Search Result,
                    variant: '',
                    quantity: product.qty
                  }
                ]
              }
            }
          });
        }
        // Handles Checkout GA
        if (type === '@@router/LOCATION_CHANGE') {
          const location = payload.pathname;
          // const { query } = getState().products;
          // const category = query ? JSON.parse(window.atob(query)).params.join('/') : null;

          const { data } = getState().cart;
          const products = data.map(item => {
            const { name, net_price: netprice } = item.product_info;
            return {
              name,
              price: netprice,
              brand: '',
              id: item.configurable_sku,
              // category,
              list: '', // eg Search Result,
              variant: '',
              quantity: item.qty
            };
          });
          const eventObject = {
            event: 'checkout',
            ecommerce: {
              actionField: { step: null, option: '' },
              products
            }
          };
          if (location === '/checkout/delivery-address') {
            eventObject.ecommerce.actionField.step = 1;
            eventObject.ecommerce.actionField.option = 'Shipping and Login';
            window.dataLayer.push(eventObject);
          }
          if (location === '/checkout/payment-options') {
            eventObject.ecommerce.actionField.step = 2;
            eventObject.ecommerce.actionField.option = 'Payment Method';
            window.dataLayer.push(eventObject);
          }
          if (location === '/checkout/review-order') {
            eventObject.ecommerce.actionField.step = 3;
            eventObject.ecommerce.actionField.option = 'Order Review';
            window.dataLayer.push(eventObject);
          }
        }
      }
    }
    return next(action);
  };
}
