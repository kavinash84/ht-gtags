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
            window.google_tag_params.ecomm_totalvalue = getState().cart.summary.total;
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
              list: ' category listing page'
            };
          });
          window.dataLayer.push(eventObject);
        }
        if (type === 'cart/ADD_TO_CART_SUCCESS') {
          window.dataLayer.push({
            event: 'addToCart',
            ecommerce: {
              currencyCode: 'INR',
              add: {
                products: [{}]
              }
            }
          });
        }
      }
    }
    return next(action);
  };
}
