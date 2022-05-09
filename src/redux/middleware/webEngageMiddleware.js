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
        if (type === "login/LOGIN_SUCCESS") {
          const { result } = action;
          window.webengage.track("User Login Mode", {
            mode: result.loginMode
          });
        }

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

        // add to wishlist
        if (type === "wishList/ADD_TO_WISHLIST_SUCCESS") {
          const {
            result: {
              product_info: {
                saving,
                soldout,
                images,
                data: {
                  color,
                  google_product_category,
                  category_names,
                  category_type,
                  sku,
                  special_price,
                  brand,
                  name,
                  price
                }
              },
              wishlist_info: { delivery_details }
            }
          } = action;
          window.webengage.track("Add To Wishlist", {
            category: google_product_category || category_names,
            // path: "",
            color: color,
            // stockAvailable: "",
            name: name,
            discountPercent: saving,
            sub_category: category_type,
            deliveryText: delivery_details[0].value || "",
            // width: "",
            brand: brand,
            sku: sku,
            stockStatus: soldout ? "Outofstock" : "Instock",
            images: images.map(item => item.url) || [],
            currencyCode: "INR",
            MRP: price,
            OfferPrice: special_price
          });
        }

        // remove from wishlist
        if (type === "wishList/REMOVE_FROM_WISHLIST_SUCCESS") {
          const {
            result: { id }
          } = action;
          const { data } = getState().wishlist;
          const {
            product_info: {
              saving,
              soldout,
              images,
              data: {
                color,
                google_product_category,
                category_names,
                category_type,
                sku,
                special_price,
                brand,
                name,
                price
              }
            },
            wishlist_info: { delivery_details }
          } = data.find(
            item => String(item.wishlist_info.id_customer_wishlist) === id
          );
          window.webengage.track("Remove From Wishlist", {
            category: google_product_category || category_names,
            // path: "",
            color: color,
            // stockAvailable: "",
            name: name,
            discountPercent: saving,
            sub_category: category_type,
            deliveryText: delivery_details[0].value || "",
            // width: "",
            brand: brand,
            sku: sku,
            stockStatus: soldout ? "Outofstock" : "Instock",
            images: images.map(item => item.url) || [],
            currencyCode: "INR",
            MRP: price,
            OfferPrice: special_price
          });
        }

        //   add to cart
        if (type === "cart/ADD_TO_CART_SUCCESS" && action.simpleSku) {
          const { simpleSku } = action;
          const cartItems = Object.values(action.result.cartItems);
          const product =
            cartItems.length &&
            cartItems.filter(item => item.sku === simpleSku);
          const {
            name,
            stock,
            brand,
            discount_percent,
            delivery_date_text,
            sku,
            image_url,
            max_retail_price,
            selling_price
          } = product[0];
          if (window && window.webengage) {
            window.webengage.track("Added To Cart", {
              // category: "",
              // path: "",
              // color: "",
              stockAvailable: stock,
              name: name,
              discountPercent: discount_percent,
              // sub_category: "",
              deliveryText: delivery_date_text,
              // width: "",
              brand: brand,
              sku: sku,
              stockStatus: !stock ? "Outofstock" : "Instock",
              images: [image_url],
              currencyCode: "INR",
              MRP: max_retail_price,
              SellingPrice: selling_price
            });
          }
        }

        // remove from cart
        if (type === "cart/REMOVE_FROM_CART_SUCCESS") {
          const { data } = getState().cart;
          const [product] = data.filter(
            item => item.product_info.product_id === action.configId
          );
          if (product) {
            const {
              delivery_time_text,
              discount,
              stock,
              image,
              name,
              unit_price,
              net_price,
              // color,
              brand
            } = product.product_info;
            window.webengage.track("Remove From Cart", {
              // category: "",
              // path: "",
              // color: "",
              stockAvailable: stock,
              name: name,
              discountPercent: discount,
              // sub_category: "",
              deliveryText: delivery_time_text,
              // width: "",
              brand: brand,
              sku: product.configurable_sku,
              stockStatus: !stock ? "Outofstock" : "Instock",
              images: [image],
              currencyCode: "INR",
              MRP: unit_price,
              SellingPrice: net_price
            });
          }
        }

        //   view cart
        if (type === "cart/WE_VIEW_CART") {
          const { data, summary } = getState().cart;
          if (data && Array.isArray(data) && data.length) {
            if (window && window.webengage) {
              window.webengage.track("View Cart", {
                SKUs: data.map(item => item.simple_sku) || [],
                brands: data.map(item => item.product_info.brand) || [],
                MRPs: data.map(item => item.product_info.unit_price) || [],
                names: data.map(item => item.product_info.name) || [],
                quantities: data.map(item => item.qty) || [],
                orderAmount: summary.total,
                total_priceItems: data.length
              });
            }
          }
        }

        // applay coupon success
        if (type === "coupon/APPLY_COUPON_SUCCESS") {
          const {
            summary: {
              couponCode,
              couponDiscount,
              itemsTotal,
              savings,
              itemsCount,
              total
            }
          } = action.result;
          window.webengage.track("Applay Coupon Success", {
            couponName: couponCode,
            success: true,
            orderAmount: itemsTotal,
            subtotal_price: total,
            itemCount: itemsCount,
            discount: savings,
            promoCodeDiscount: couponDiscount
          });
        }

        // applay coupon failed
        if (type === "coupon/APPLY_COUPON_FAIL_WE") {
          window.webengage.track("Applay Coupon Fail", {
            couponName: action.payLoad
          });
        }
      }
    }
    return next(action);
  };
}
