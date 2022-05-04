import moment from "moment";

export default function webEngageMiddleware() {
  return ({ getState }) => next => action => {
    if (__CLIENT__) {
      const { type } = action;
      if (window && window.webengage) {
        // const {
        //   location: { pathname }
        // } = getState().router;
        //   user login
        // if (type === "login/LOGIN_SUCCESS") {
        //   const { userLogin } = getState();
        //   window.webengage.track("User Login Mode", {
        //     mode: userLogin.loginType
        //   });
        // }

        // //   user sign-up
        // if (type === "signUp/SIGNUP_SUCCESS") {
        //   const { userLogin } = getState();
        //   window.webengage.track("User Sign-up Mode", {
        //     mode: userLogin.loginType
        //   });
        // }

        //   user track
        if (type === "profile/LOAD_SUCCESS") {
          const {
            result: { email, dob, id_customer, mobile, full_name }
          } = action;
          console.log(dob, mobile, "dob");
          window.webengage.user.login(id_customer);
          window.webengage.user.setAttribute("we_email", email);
          window.webengage.user.setAttribute(
            "we_birth_date",
            moment(dob).format("YYYY-MM-DD")
          );
          window.webengage.user.setAttribute("we_phone", mobile);
          window.webengage.user.setAttribute("we_first_name", full_name);
        }

        //   user log out
        if (type === "login/LOGOUT_SUCCESS") {
          window.webengage.user.logout();
        }

        // //   add to cart
        // if (type === "cart/ADD_TO_CART_SUCCESS") {
        //   const {
        //     result: { qty },
        //     configId
        //   } = action;
        //   const [product] =
        //     action.result &&
        //     action.result.cart.cart.filter(
        //       item => item.id_customer_cart === idcustomerCart
        //     );
        //   const {
        //     name,
        //     net_price: netprice,
        //     color,
        //     brand,
        //     category_details: categoryDetails
        //   } = product.product_info;
        //   const category = categoryDetails ? categoryDetails.join("/") : null;
        //   if (window && window.webengage) {
        //     window.webengage.track("Added To Cart", {
        //       category: category,
        //       path: "",
        //       color: color,
        //       stockAvailable: "",
        //       name: name,
        //       discountPercent: "",
        //       sub_category: "",
        //       deliveryText: "",
        //       width: "",
        //       brand: brand,
        //       sku: configId,
        //       stockStatus: "",
        //       images: [],
        //       currencyCode: "INR",
        //       MRP: "",
        //       OfferPrice: ""
        //     });
        //   }
        // }

        // view catagory
        if (type === "categoryPage/SET_CURRENT_CATEGORY") {
          window.webengage.track("Category View", {
            category: action.payLoad
          });
        }

        // view sub catagory
        if (type === "categoryPage/VIEW_SUB_CATEGORY") {
          window.webengage.track("Sub Category View", action.payLoad);
        }

        // view product
        if (type === "productdetails/PRODUCT_DETAILS_WE_TRACK") {
          const { simpleSku, productDescription } = getState().productdetails;
          console.log("productdetails/PRODUCT_DETAILS_WE_TRACK");
          if (
            simpleSku &&
            productDescription &&
            Object.keys(productDescription).length
          ) {
            console.log("productdetails/PRODUCT_DETAILS_WE_TRACK");
            const {
              attributes: { product_width },
              images,
              pricing_details: { mrp, offer_price },
              meta: {
                category_details,
                brand,
                color,
                name,
                max_saving_percentage,
                category_type
              },
              delivery_details
            } = productDescription;
            const category =
              category_details && category_details.length
                ? category_details
                    .filter(x => x !== null)
                    .map(item => item.url_key)
                    .join("/")
                : "";
            window.webengage.track("Product View", {
              category: category,
              path: category,
              color: color,
              // stockAvailable: "",
              name: name,
              discountPercent: max_saving_percentage,
              sub_category: category_type,
              deliveryText:
                delivery_details &&
                delivery_details.length &&
                delivery_details[0].value,
              width: product_width,
              brand: brand,
              sku: simpleSku,
              // stockStatus: "",
              images: images.map(item => item.url),
              currencyCode: "INR",
              MRP: mrp,
              OfferPrice: offer_price
            });
          }
        }

        // // add to wishlist
        // if (type === "wishList/ADD_TO_WISHLIST_SUCCESS") {
        //   window.webengage.track("Add To Wishlist", {
        //     category: "",
        //     path: "",
        //     color: "",
        //     stockAvailable: "",
        //     name: "",
        //     discountPercent: "",
        //     sub_category: "",
        //     deliveryText: "",
        //     width: "",
        //     brand: "",
        //     sku: "",
        //     stockStatus: "",
        //     images: [],
        //     currencyCode: "INR",
        //     MRP: "",
        //     OfferPrice: ""
        //   });
        // }

        // // remove from wishlist
        // if (type === "wishList/REMOVE_FROM_WISHLIST_SUCCESS") {
        //   window.webengage.track("Remove From Wishlist", {
        //     category: "",
        //     path: "",
        //     color: "",
        //     stockAvailable: "",
        //     name: "",
        //     discountPercent: "",
        //     sub_category: "",
        //     deliveryText: "",
        //     width: "",
        //     brand: "",
        //     sku: "",
        //     stockStatus: "",
        //     images: [],
        //     currencyCode: "INR",
        //     MRP: "",
        //     OfferPrice: ""
        //   });
        // }

        // // remove from cart
        // if (type === "cart/REMOVE_FROM_CART_SUCCESS") {
        //   const { data } = getState().cart;
        //   const {
        //     cart: {
        //       summary: { total }
        //     }
        //   } = action.result;
        //   const [product] = data.filter(
        //     item => item.id_customer_cart === Number(action.result.cartId)
        //   );
        //   if (product) {
        //     const checkKey = isKeyExists(
        //       product.product_info,
        //       "category_details"
        //     );
        //     const category = checkKey
        //       ? checkKey.filter(x => x !== null).join("/")
        //       : "";
        //     const {
        //       name,
        //       net_price: netprice,
        //       color,
        //       brand
        //     } = product.product_info;
        //     window.webengage.track("Remove From Cart", {
        //       category: category,
        //       path: "",
        //       color: color,
        //       stockAvailable: "",
        //       name: name,
        //       discountPercent: "",
        //       sub_category: "",
        //       deliveryText: "",
        //       width: "",
        //       brand: brand,
        //       sku: product.configurable_sku,
        //       stockStatus: "",
        //       images: [],
        //       currencyCode: "INR",
        //       MRP: "",
        //       OfferPrice: ""
        //     });
        //   }
        // }

        // // applay coupon success
        // if (type === "coupon/APPLY_COUPON_SUCCESS") {
        //   const {
        //     summary: {
        //       coupon,
        //       coupon_discount,
        //       items,
        //       savings,
        //       items_count,
        //       total
        //     }
        //   } = action.result;
        //   window.webengage.track("Applay Coupon Success", {
        //     couponName: coupon,
        //     success: true,
        //     orderAmount: items,
        //     subtotal_price: total,
        //     itemCount: items_count,
        //     discount: savings,
        //     promoCodeDiscount: coupon_discount
        //   });
        // }

        // // applay coupon failed
        // if (type === "coupon/APPLY_COUPON_FAIL_WE") {
        //   window.webengage.track("Applay Coupon Fail", {
        //     couponName: action.payLoad
        //   });
        // }

        // // checkout complete
        // if (
        //   type === "PUSH_TO_DATALAYER" &&
        //   pathname &&
        //   pathname === "/payment-success"
        // ) {
        //   const { data } = getState().paymentstatus;
        //   if (data) {
        //     const {
        //       cart_products: products = [],
        //       net_order_amount,
        //       shipping_charges,
        //       order_no,
        //       coupon_code
        //     } = data;
        //     if (products && products.length) {
        //       const cartList = products.map(x => {
        //         const { sku, name, qty, categories } = x;
        //         return {
        //           id: sku,
        //           name,
        //           quantity: qty,
        //           category: categories ? categories.split("|").join("/") : ""
        //         };
        //       });

        //       window.webengage.track("Checkout Complete", {
        //         currencyCode: "INR",
        //         // discount: "",
        //         // mrp: "",
        //         name: cartList.map(item => item.name),
        //         // orderAmount: "",
        //         SKU: cartList.map(item => item.id),
        //         // price: "",
        //         promoCodeApplied: coupon_code,
        //         // promoCodeDiscount: "",
        //         // itemCount: "",
        //         shippingCharges: shipping_charges,
        //         total_price: net_order_amount,
        //         category: cartList.map(item => item.category),
        //         orderid: order_no
        //       });
        //     }
        //   }
        // }

        // // update profile
        // if (type === "profile/UPDATE_PROFILE_SUCCESS") {
        //   const {
        //     result: { email, city }
        //   } = action;
        //   window.webengage.track("Update Profile", {
        //     email: email,
        //     address: city
        //   });
        // }

        // // update shipping address
        // if (type === "myaddress/UPDATE_ADDRESS_SUCCESS") {
        //   const {
        //     result: { address1, address2, address3, city, country, state }
        //   } = action;
        //   window.webengage.track("Update Shipping Address", {
        //     addressLine1: address1,
        //     addressLine2: address2,
        //     addressLine3: address3,
        //     city: city,
        //     country: country,
        //     state: state
        //   });
        // }

        // // submit lead
        // if (type === "services/LOAD_SUCCESS") {
        //   const {
        //     result: { city, email, mobile, name, state }
        //   } = action;
        //   window.webengage.track("Submit Lead", {
        //     name: name,
        //     email: email,
        //     phone: mobile,
        //     city: city,
        //     state: state
        //   });
        // }

        // // visit store
        // if (type === "loadStores/SET_SELECTED_STORE") {
        //   const {
        //     storeDetails: { city, store, event, category }
        //   } = action;
        //   window.webengage.track("Store Viewed", {
        //     store: store,
        //     city: city
        //   });
        // }
      }
    }
    return next(action);
  };
}
