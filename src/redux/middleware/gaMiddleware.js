import { filterCategoryDetails, isKeyExists } from "utils/helper";
import { CART_URL } from "helpers/Constants";
import { getCartListSKU, getCartListSKUFromResult } from "selectors/cart";
import { resetReferrer } from "../modules/analytics";

export default function gaMiddleware() {
  return ({ getState, dispatch }) => next => action => {
    if (__CLIENT__) {
      const { payload, type } = action;
      const {
        analytics: { isFirstHit }
      } = getState();
      if (window && window.dataLayer) {
        if (type === "TRACK_PAGEVIEW") {
          const {
            location: { pathname, search }
          } = window;
          window.dataLayer.push({
            event: "pageviewtracking",
            vpv: `${pathname}${search}`.trim()
          });
        }
        // if (
        //   (type === 'wishList/REMOVE_FROM_WISHLIST_SUCCESS' ||
        //   type === 'wishList/ADD_TO_WISHLIST_SUCCESS' ||
        //   type === 'wishList/LOAD_WISHLIST_SUCCESS') &&
        //   window.unbxd &&
        //   !!window.unbxd.toggleWishList
        // ) {
        //   const { sku, simpleSku } = action;
        //   window.unbxd.toggleWishList(sku, simpleSku);
        // }
        // if (type === 'categoryPage/LOAD_SUCCESS') {
        //   const {
        //     location: { pathname }
        //   } = window;
        //   const { id } = action;
        //   if (window && window.Unbxd && id && pathname) {
        //     window.Unbxd.track('categoryPage', {
        //       page: pathname,
        //       page_type: 'BOOLEAN',
        //       page_name: id
        //     });
        //   }
        // }
        if (type === "wishList/ADD_TO_WISHLIST_SUCCESS") {
          const { sku, simpleSku, unbxd } = action;
          if (unbxd) {
            if (window && !!window.unbxd && !!window.unbxd.toggleWishList) {
              window.unbxd.toggleWishList(sku, simpleSku);
            } else {
            }
          }
        }
        // if ((type === 'login/LOGIN_SUCCESS' || type === 'login/LOGOUT_SUCCESS') && window && window.unbxd) {
        //   window.unbxd.handleUserSwitch();
        // }

        if (
          (type === "cart/ADD_TO_CART_SUCCESS" ||
            type === "cart/UPDATE_CART_SUCCESS" ||
            type === "cart/REMOVE_FROM_CART_SUCCESS") &&
          window &&
          window.unbxd
        ) {
          window.unbxd.renderCartItemsonSRP();
        }
        if (
          (type === "wishList/ADD_TO_WISHLIST_SUCCESS" ||
            type === "wishList/REMOVE_FROM_WISHLIST_SUCCESS") &&
          window &&
          window.unbxd
        ) {
          window.unbxd.renderWishListItemsOnSRP();
        }
        if (type === "@@router/LOCATION_CHANGE") {
          const {
            location: { hostname, pathname }
          } = window;
          const location = (payload && payload.pathname) || pathname;
          if (
            document.referrer !== "" &&
            document.referrer !== hostname &&
            isFirstHit !== 1
          ) {
            Object.defineProperty(document, "referrer", {
              get: () => hostname
            });
          }
          if (isFirstHit === 1) dispatch(resetReferrer());
          if (location === "/") {
            window.google_tag_params.ecomm_pagetype = "home";
            window.google_tag_params.ecomm_totalvalue = "";
            window.google_tag_params.ecomm_prodid = [];
          } else if (
            location === CART_URL &&
            window.google_tag_params &&
            window.google_tag_params.ecomm_pagetype
          ) {
            window.google_tag_params.ecomm_pagetype;
            if (getState().cart.summary) {
              window.google_tag_params.ecomm_totalvalue = getState().cart.summary.total;
              window.google_tag_params.ecomm_prodid = getCartListSKU(
                getState().cart
              );
            }
          } else if (location === "/search") {
            window.google_tag_params.ecomm_pagetype = "searchresults";
          } else if (location === "/payment-success") {
            window.google_tag_params.ecomm_pagetype = "purchase";
          } else {
            if (window && window.google_tag_params) {
              window.google_tag_params.ecomm_pagetype = "other";
              window.google_tag_params.ecomm_totalvalue = "";
              window.google_tag_params.ecomm_prodid = [];
            }
          }
        }
        if (type === "productdetails/LOAD_PRODUCT_DESCRIPTION") {
          const { products } = getState();
          const { position } = getState().productdetails;
          let eventObject;
          if (products && products.list.length > 0) {
            const product = products.list[position - 1];
            const checkKey = isKeyExists(
              products,
              "data.metadata.category_details"
            );
            const category = checkKey
              ? checkKey
                  .filter(x => x !== null)
                  .map(item => item.url_key)
                  .join("/")
              : "";
            if (product) {
              const { name, sku, price, brand, color } = product.data;
              eventObject = {
                event: "productClick",
                ecommerce: {
                  click: {
                    actionField: { list: "Listing" },
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
        if (type === "productdetails/LOAD_PRODUCT_DESCRIPTION_SUCCESS") {
          const {
            result: {
              meta: { config_id: pid = "" }
            }
          } = action;
          if (window && window.Unbxd && window.Unbxd.track && pid) {
            window.Unbxd.track("click", { pid: pid });
          }
          // if (window && window.Unbxd && window.Unbxd.track && pid) {
          //   window.Unbxd.track("product_view", { pid });
          // }
        }
        if (type === "productdetails/PRODUCT_DETAILS_TRACK") {
          const { position, productDescription } = getState().productdetails;
          window.google_tag_params.ecomm_pagetype = "product";
          window.google_tag_params.ecomm_totalvalue =
            productDescription.meta.special_price ||
            productDescription.meta.price;
          const {
            name,
            sku,
            price,
            brand,
            category_details: categoryDetails,
            color
          } = productDescription.meta;
          const category = filterCategoryDetails(categoryDetails)
            .map(item => item.url_key)
            .join("/");
          const eventObject = {
            event: "productDetail",
            ecommerce: {
              detail: {
                actionField: { list: "Listing" },
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
              },
              currencyCode: "INR"
            }
          };
          window.google_tag_params.ecomm_prodid = sku;
          window.dataLayer.push(eventObject);
        }
        if (type === "products/LISTING_TRACK") {
          const {
            router: { location },
            products: { list: results, data }
          } = getState();
          if (location.pathname === "/search/") {
            window.google_tag_params.ecomm_pagetype = "searchresults";
          } else {
            window.google_tag_params.ecomm_pagetype = "category";
          }
          // const eventObject = {
          //   event: 'impression',
          //   ecommerce: {
          //     currencyCode: 'INR',
          //     impressions: []
          //   }
          // };
          // const skus = [];
          // let totalValue = 0;
          const checkKey = isKeyExists(data, "metadata.category_details");
          const category = checkKey
            ? checkKey
                .filter(x => x !== null)
                .map(item => item.url_key)
                .join("/")
            : "";
          const PACKET_SIZE = 10;

          for (let i = 0; i < results.length; i += PACKET_SIZE) {
            const packet = results.slice(i, i + PACKET_SIZE);
            const eventObject = {
              event: "impression",
              ecommerce: {
                currencyCode: "INR",
                impressions: []
              }
            };
            const skus = [];
            let totalValue = 0;
            eventObject.ecommerce.impressions = packet.map((item, position) => {
              const {
                name,
                sku,
                price,
                brand,
                color,
                special_price: netprice
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
                list:
                  location.pathname === "/search/"
                    ? "Search Result"
                    : " category listing page"
              };
            });
            window.google_tag_params.ecomm_prodid = skus;
            window.google_tag_params.ecomm_totalvalue = String(totalValue);
            // window.dataLayer.push(eventObject);
          }

          // eventObject.ecommerce.impressions = results.map((item, position) => {
          //   const {
          //     name, sku, price, brand, color, special_price: netprice
          //   } = item.data;
          //   skus.push(sku);
          //   totalValue += parseInt(netprice, 10) || parseInt(price, 10);
          //   return {
          //     name,
          //     price,
          //     brand,
          //     category,
          //     position: position + 1,
          //     id: sku,
          //     variant: color,
          //     list: location.pathname === '/search/' ? 'Search Result' : ' category listing page'
          //   };
          // });

          // window.google_tag_params.ecomm_prodid = skus;
          // window.google_tag_params.ecomm_totalvalue = String(totalValue);

          // window.dataLayer.push(eventObject);
        }
        /* Cart Tracking */
        if (type === "cart/ADD_TO_CART_SUCCESS" && action.configId) {
          const { configId } = action;
          const cartItems = Object.values(action.result.cartItems);
          const total = action.result.summary.total;
          const product = cartItems.filter(item => item.config_id === configId);
          const qty = product[0].qty;
          // if (!configId) {
          //   window.unbxd.addToCart(key, sku, simpleSku, pincode);
          // }
          if (window && window.Unbxd && window.Unbxd.track && configId && qty) {
            window.Unbxd.track("addToCart", {
              pid: configId,
              variantId: "",
              qty: `${qty}`
            });
          }
          const {
            name,
            selling_price: netprice,
            color,
            brand,
            configurable_sku
          } = product[0];
          const categoryDetails = "";
          const category = categoryDetails ? categoryDetails.join("/") : null;

          window.dataLayer.push(
            {
              event: "addToCart",
              ecommerce: {
                currencyCode: "INR",
                add: {
                  products: [
                    {
                      name,
                      price: netprice,
                      variant: color,
                      brand,
                      category,
                      list: "Listing",
                      id: configurable_sku,
                      quantity: 1
                    }
                  ]
                }
              }
            },
            {
              event: "cart change",
              cart_total: total
            }
          );
        }
        if (type === "cart/UPDATE_CART_SUCCESS") {
          const { data } = getState().cart;
          const cartItems = Object.values(action.result.cartItems);
          const total = action.result.summary.total;
          const productt = data.filter(
            (item, i) =>
              item.configurable_sku === action.result.configurable_sku
          );
          const productQty = productt[0].qty;
          const { configId, qty } = action;
          if (
            window &&
            window.Unbxd &&
            window.Unbxd.track &&
            configId &&
            productQty
          ) {
            window.Unbxd.track("addToCart", {
              pid: configId,
              variantId: "",
              qty: `${productQty}`
            });
          }
          const product = data.filter(
            (item, i) =>
              item.configurable_sku === action.result.configurable_sku
          );
          const {
            name,
            net_price: netprice,
            color,
            brand
          } = product[0].product_info;
          const categoryDetails = "";
          const category = categoryDetails ? categoryDetails.join("/") : null;
          const { updateType } = action.result;
          window.dataLayer.push(
            {
              event: updateType === "add" ? "addToCart" : "removeFromCart",
              ecommerce: {
                currencyCode: "INR",
                [updateType]: {
                  products: [
                    {
                      name,
                      price: netprice,
                      variant: color,
                      brand,
                      category,
                      list: "Listing",
                      id: product.configurable_sku,
                      quantity: Math.abs(qty)
                    }
                  ]
                }
              }
            },
            {
              event: "cart change",
              cart_total: total
            }
          );
        }
        if (type === "cart/REMOVE_FROM_CART_SUCCESS") {
          const { data } = getState().cart;
          const total = action.result.summary.total;
          const { qty, configId } = action;
          if (window && window.Unbxd && window.Unbxd.track && configId && qty) {
            window.Unbxd.track("cartRemoval", {
              pid: configId,
              qty: `${qty}`
            });
          }
          const [product] = data.filter(
            item => item.product_info.product_id === configId
          );
          if (product) {
            const checkKey = isKeyExists(
              product.product_info,
              "category_details"
            );
            const category = checkKey
              ? checkKey.filter(x => x !== null).join("/")
              : "";
            const {
              name,
              net_price: netprice,
              color,
              brand
            } = product.product_info;
            if (action.result) {
              window.google_tag_params.ecomm_totalvalue = total;
              window.google_tag_params.ecomm_prodid = getCartListSKUFromResult(
                data
              );
            }
            window.dataLayer.push(
              {
                event: "removeFromCart",
                ecommerce: {
                  currencyCode: "INR",
                  remove: {
                    products: [
                      {
                        name,
                        price: netprice,
                        brand,
                        id: product.configurable_sku,
                        category,
                        list: "Listing", // eg Search Result, //D
                        variant: color,
                        quantity: product.qty
                      }
                    ]
                  }
                }
              },
              {
                event: "cart change",
                cart_total: total
              }
            );
          }
        }
        // Handles Checkout GA
        if (type === "@@router/LOCATION_CHANGE") {
          const location = payload.pathname;
          if (
            location === "/checkout/delivery-address" ||
            "/checkout/payment-options" ||
            "/checkout/review-order"
          ) {
            const { data } = getState().cart;
            const { searchQuery = "" } = getState().search;
            let products;
            if (data) {
              products = data.map(item => {
                const {
                  name,
                  net_price: netprice,
                  category_details: categoryDetails,
                  brand,
                  color
                } = item.product_info;
                const category = categoryDetails
                  ? categoryDetails.filter(x => x !== null).join("/")
                  : "";
                return {
                  name,
                  price: netprice,
                  brand,
                  id: item.configurable_sku,
                  category,
                  variant: color,
                  quantity: item.qty
                };
              });
            }
            const eventObject = {
              event: "checkout",
              ecommerce: {
                checkout: {
                  actionField: { step: null, option: "" },
                  products
                }
              }
            };
            if (
              location === "/search/" &&
              searchQuery &&
              window.Unbxd &&
              window.Unbxd.track
            ) {
              console.log("search query from middleware", searchQuery);
              window.Unbxd.track("search", { query: searchQuery });
            }
            if (location === "/checkout/delivery-address") {
              eventObject.ecommerce.checkout.actionField.step = 1;
              eventObject.ecommerce.checkout.actionField.option =
                "Shipping and Login";
              window.dataLayer.push(eventObject);
            }
            if (location === "/checkout/payment-options") {
              eventObject.ecommerce.checkout.actionField.step = 2;
              eventObject.ecommerce.checkout.actionField.option =
                "Payment Method";
              window.dataLayer.push(eventObject);
            }
            if (location === "/checkout/review-order") {
              eventObject.ecommerce.checkout.actionField.step = 3;
              eventObject.ecommerce.checkout.actionField.option =
                "Order Review";
              window.dataLayer.push(eventObject);
            }
          }
        }
        // Handle Payment success
        /* eslint-disable camelcase */
        const {
          location: { pathname }
        } = getState().router;
        if (
          type === "PUSH_TO_DATALAYER" &&
          pathname &&
          pathname === "/payment-success"
        ) {
          const { data } = getState().paymentstatus;
          if (data) {
            const {
              cart_products: products = [],
              net_order_amount,
              shipping_charges,
              packages = {},
              // transaction_id,
              order_no,
              coupon_code,
              customer_type,
              unbxd_data: unbxdData = []
            } = data;
            console.log(data, "payamentstatusdata");
            const skus = [];

            // let groupedProducts = [];
            let paymentObj = {};
            if (products && products.length) {
              // products.forEach(arr => {
              //   if (groupedProducts[arr.sku] && groupedProducts[arr.sku].sku === arr.sku) {
              //     groupedProducts[arr.sku].qty += 1;
              //   } else {
              //     groupedProducts[arr.sku] = arr;
              //   }
              // });
              // groupedProducts = Object.values(groupedProducts);
              let cartList = products
                .filter(item => item.package === false)
                .map(x => {
                  const {
                    // product_info: { product_id },
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
                    category: categories ? categories.split("|").join("/") : "",
                    price,
                    brand
                  };
                });
              if (Object.keys(packages).length !== 0) {
                const packageItems = Object.values(packages).map(item => {
                  return {
                    id: item.package_id,
                    name: item.package_name,
                    dimension11: item.package_name,
                    quantity: 1,
                    variant: "",
                    category: "",
                    price: item.package_amount,
                    brand: "HomeTown"
                  };
                });
                cartList = [...cartList, ...packageItems];
              }
              paymentObj = {
                event: "purchase",
                ecommerce: {
                  purchase: {
                    actionField: {
                      id: order_no,
                      affiliation: "Online Store",
                      revenue: net_order_amount,
                      tax: "0",
                      shipping: shipping_charges,
                      coupon: coupon_code || ""
                    },
                    products: [...cartList]
                  },
                  currencyCode: "INR"
                }
              };
            }
            window.google_tag_params.ecomm_pagetype = "purchase";
            window.google_tag_params.ecomm_prodid = skus;
            window.google_tag_params.ecomm_totalvalue = net_order_amount;
            /* customer type */
            const cust_type =
              customer_type === "returning customer" ? "Repeat" : "Fresh";
            window.dataLayer.push(paymentObj, {
              event: "buyer_type",
              type: cust_type
            });
            if (
              window &&
              window.Unbxd &&
              window.Unbxd.track &&
              unbxdData.length
            ) {
              unbxdData.forEach(p => {
                window.Unbxd.track("order", p);
              });
            }
          }
        }
        if (type === "mainSlider/BANNER_IMPRESSION") {
          const {
            homepage: {
              banners: { data }
            }
          } = getState();
          if (pathname !== "/plan-your-kitchen") {
            if (data && data.length) {
              const imp = data[action.payload];
              let obj = {};
              if (imp && imp.meta) {
                obj = {
                  event: "promotionImpression",
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
              }
              window.dataLayer.push(obj);
            }
          }
        }
        if (type === "mainSlider/BANNER_CLICK") {
          const {
            homepage: {
              banners: { data }
            }
          } = getState();
          if (data && data.length) {
            const imp = data[action.payload];
            const obj = {
              event: "promotionClick",
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
      if (type === "cart/UPDATE_CART_SUCCESS") {
        if (action.result.summary) {
          window.google_tag_params.ecomm_totalvalue =
            action.result.summary.total;
        }
      }
      if (type === "signUp/SIGNUP_SUCCESS") {
        const {
          result: { origin }
        } = action;
        const signUpEvent = {
          event: "event register",
          category: "New User Sign Up",
          action: "Register",
          label: origin
        };
        window.dataLayer.push(signUpEvent);
      }
      if (type === "checkout/SEND_DELIVERY_ADDRESS_SUCCESS") {
        const origin = "Guest Sign up";
        const signUpEvent = {
          event: "event register",
          category: "New User Sign Up",
          action: "Register",
          label: origin
        };
        window.dataLayer.push(signUpEvent);
      }
      if (type === "cart/ADD_TO_CART_COMBINED_SUCCESS") {
        const {
          result: { uniqueSetName },
          configId
        } = action;
        const {
          summary: { total }
        } = action.result;
        const items =
          action.result && action.result.cart ? action.result.cart : [];
        const products = [];
        const unbxdData = [];
        items.forEach(item => {
          const {
            name,
            net_price: netprice,
            color,
            brand,
            category_details: categoryDetails
          } = item.product_info;
          const category = categoryDetails ? categoryDetails.join("/") : null;
          const event = {
            name,
            price: netprice,
            variant: color,
            brand,
            category,
            list: "Listing",
            id: item.configurable_sku,
            quantity: 1
          };
          products.push(event);
        });
        configId.forEach(id => {
          unbxdData.push({
            pid: id || "",
            variantId: "",
            qty: "1"
          });
        });
        window.dataLayer.push(
          {
            event: "Combo_offer",
            Combo_Offer: uniqueSetName
          },
          {
            event: "addToCart",
            ecommerce: {
              currencyCode: "INR",
              add: {
                products
              }
            }
          },
          {
            event: "cart change",
            cart_total: total
          }
        );

        if (window && window.Unbxd && window.Unbxd.track && unbxdData.length) {
          unbxdData.forEach(p => {
            window.Unbxd.track("addToCart", p);
          });
        }
      }
      if (type === "loadStores/SET_SELECTED_STORE") {
        const {
          storeDetails: { city, store, event, category }
        } = action;
        const storeVisitEvent = {
          event,
          category,
          action: city,
          label: store
        };
        window.dataLayer.push(storeVisitEvent);
      }
      if (type === "services/LOAD_SUCCESS") {
        const {
          formType,
          result: { category }
        } = action;
        if (category && formType === "bulkorder") {
          const bulkOrderLeadEvent = {
            event: "Submit",
            category,
            action: "FormSubmit",
            label: "RequestCallBack"
          };
          window.dataLayer.push(bulkOrderLeadEvent);
        }
      }
    }
    return next(action);
  };
}
