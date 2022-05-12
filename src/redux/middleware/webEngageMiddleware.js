import moment from "moment";

export default function webEngageMiddleware() {
  return ({ getState }) => next => action => {
    if (__CLIENT__) {
      const { type } = action;
      if (window && window.webengage) {
        const {
          location: { pathname }
        } = getState().router;
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
                  // google_product_category,
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
            category: category_names,
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

          // update wishList

          const { data } = getState().wishlist;
          if (Array.isArray(data)) {
            const data2 = [...data, action.result];

            window.webengage.track("Update Wishlist", {
              category: data2.map(
                item =>
                  // item.product_info.data.google_product_category ||
                  item.product_info.data.category_names
              ),
              color: data2.map(item => item.product_info.data.color),
              name: data2.map(item => item.product_info.data.name),
              discountPercent: data2.map(item => item.product_info.saving),
              sub_category: data2.map(
                item => item.product_info.data.category_type
              ),
              deliveryText: data2.map(
                item => item.wishlist_info.delivery_details[0].value || ""
              ),
              brand: data2.map(item => item.product_info.data.brand),
              sku: data2.map(item => item.product_info.data.sku),
              stockStatus: data2.map(item =>
                item.product_info.soldout ? "Outofstock" : "Instock"
              ),
              currencyCode: "INR",
              MRP: data2.map(item => item.product_info.data.price),
              OfferPrice: data2.map(
                item => item.product_info.data.special_price
              ),
              itemCount: data2.length
            });
          }
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
                // google_product_category,
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
            category: category_names,
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

          // update wishList

          const { data: data3 } = getState().wishlist;
          if (Array.isArray(data3)) {
            const data2 = data3.filter(
              item => String(item.wishlist_info.id_customer_wishlist) !== id
            );
            if (data2.length) {
              window.webengage.track("Update Wishlist", {
                category: data2.map(
                  item =>
                    // item.product_info.data.google_product_category ||
                    item.product_info.data.category_names
                ),
                color: data2.map(item => item.product_info.data.color),
                name: data2.map(item => item.product_info.data.name),
                discountPercent: data2.map(item => item.product_info.saving),
                sub_category: data2.map(
                  item => item.product_info.data.category_type
                ),
                deliveryText: data2.map(
                  item => item.wishlist_info.delivery_details[0].value || ""
                ),
                brand: data2.map(item => item.product_info.data.brand),
                sku: data2.map(item => item.product_info.data.sku),
                stockStatus: data2.map(item =>
                  item.product_info.soldout ? "Outofstock" : "Instock"
                ),
                currencyCode: "INR",
                MRP: data2.map(item => item.product_info.data.price),
                OfferPrice: data2.map(
                  item => item.product_info.data.special_price
                ),
                itemCount: data2.length
              });
            } else {
              window.webengage.track("Update Wishlist", {
                category: [],
                color: [],
                name: [],
                discountPercent: [],
                sub_category: [],
                deliveryText: [],
                brand: [],
                sku: [],
                stockStatus: [],
                currencyCode: "",
                MRP: [],
                OfferPrice: [],
                itemCount: 0
              });
            }
          }
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
              discountPercent: parseInt(discount_percent) || 0,
              // sub_category: "",
              deliveryText: delivery_date_text,
              // width: "",
              brand: brand,
              sku: sku,
              stockStatus: !stock ? "Outofstock" : "Instock",
              images: [image_url],
              currencyCode: "INR",
              MRP: parseInt(max_retail_price) || 0,
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
          window.webengage.track("Apply Coupon Success", {
            couponName: couponCode,
            success: true,
            orderAmount: itemsTotal,
            subtotal_price: total,
            itemCount: itemsCount,
            discount: savings,
            promoCodeDiscount: couponDiscount
          });
        }

        // Apply coupon failed
        if (type === "coupon/APPLY_COUPON_FAIL_WE") {
          window.webengage.track("Apply Coupon Fail", {
            couponName: action.payLoad
          });
        }

        //   checkout started
        if (type === "cart/CHECKCART") {
          const { data, summary } = getState().cart;
          if (data && Array.isArray(data) && data.length) {
            window.webengage.track("Checkout Started", {
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

        //   checkout complete
        if (
          type === "PUSH_TO_DATALAYER" &&
          pathname &&
          pathname === "/payment-success"
        ) {
          const { data } = getState().paymentstatus;
          if (data && data !== null) {
            const {
              cart_products: products = {},
              net_order_amount,
              mrp_total,
              shipping_charges,
              savings,
              packages = {},
              payment_method,
              payment_method_type,
              order_no,
              coupon_code,
              customer_type,
              discount_coupon_value,
              unbxd_data: unbxdData = {}
            } = data;

            if (products && products.length) {
              let cartList = products
                .filter(item => item.package === false)
                .map(x => {
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
                    quantity: 1,
                    variant: "package",
                    category: "package",
                    price: item.package_amount,
                    brand: "HomeTown"
                  };
                });
                cartList = [...cartList, ...packageItems];
              }

              window.webengage.track("Payment Success", {
                pageTitle: "Payment",
                subtotal_price: mrp_total,
                orderAmount: net_order_amount,
                paymentMode: payment_method_type
              });
              window.webengage.track("Checkout Completed", {
                SKUs: cartList.map(item => item.id) || [],
                brands: cartList.map(item => item.brand) || [],
                price: cartList.map(item => item.price) || [],
                names: cartList.map(item => item.name) || [],
                quantities: cartList.map(item => item.quantity) || [],
                itemCount: cartList.length,
                mrp: mrp_total,
                orderAmount: net_order_amount,
                promoCodeDiscount: discount_coupon_value,
                currencyCode: "INR",
                discount: savings,
                category: cartList.map(item => item.category) || [],
                orderid: order_no
              });
            }
          }
        }

        //   payment failure
        if (type === "paymentstatus/WE_PAYMENT_FAILURE") {
          // const { data, summary } = getState().cart;
          // if (data && Array.isArray(data) && data.length) {
          window.webengage.track("Payment Failure", {
            Reason: "Some thing went wrong"
          });
          // }
        }

        // update profile
        if (type === "profile/UPDATE_PROFILE_SUCCESS") {
          const {
            result: { email, city }
          } = action;
          window.webengage.track("Update Profile", {
            email: email,
            address: city
          });
        }

        // update shipping address
        if (type === "myaddress/UPDATE_ADDRESS_SUCCESS") {
          const {
            result: { address1, address2, address3, city, country, state }
          } = action;
          window.webengage.track("Update Shipping Address", {
            addressLine1: address1 || "",
            addressLine2: address2 || "",
            // addressLine3: address3 || "",
            city: city || "",
            country: country || "",
            state: state || ""
          });
        }

        // submit lead
        if (type === "services/LOAD_SUCCESS") {
          const {
            result: { city, email, mobile, name, state }
          } = action;
          if (name && email && mobile && city && state) {
            window.webengage.track("Submit Lead", {
              name: name,
              email: email,
              phone: mobile,
              city: city,
              state: state
            });
          }

          // Subscribe Newsletter
          if (Object.keys(action.result).length <= 2) {
            window.webengage.track("Subscribe Newsletter", {
              email: email
            });
          }
        }

        // visit store
        if (type === "loadStores/SET_SELECTED_STORE") {
          const {
            storeDetails: { city, store, event, category }
          } = action;
          if (store && city) {
            window.webengage.track("Store Viewed", {
              store: store,
              city: city
            });
          }
        }

        // track order
        if (
          type === "tracking/LOAD_SUCCESS" ||
          type === "trackorder/LOAD_SUCCESS"
        ) {
          const {
            result: { orderrNumber }
          } = action;
          window.webengage.track("Track Your order", {
            order_id: orderrNumber
          });
        }

        // contact us
        if (type === "services/WE_CONTACTUS") {
          const {
            data: { email, name, mobile }
          } = getState().profile;
          if (email && name && mobile) {
            window.webengage.track("Contact Us", {
              email,
              name,
              mobile
            });
          }
        }

        // Banner clicked
        if (type === "hompageCategories/WE_BANNER_IMPRESSION") {
          const { payLoad } = action;
          window.webengage.track("Banner Clicked", payLoad);
        }

        // add review
        if (type === "reviews/ADD_REVIEW_SUCCESS") {
          const { simpleSku, productDescription } = getState().productdetails;
          if (
            simpleSku &&
            productDescription &&
            Object.keys(productDescription).length
          ) {
            const {
              attributes: { main_material },
              meta: { category_details, brand, name, category_type }
            } = productDescription;
            const category =
              category_details && category_details.length
                ? category_details
                    .filter(x => x !== null)
                    .map(item => item.url_key)
                    .join("/")
                : "";
            window.webengage.track("Write Review", {
              ProductID: simpleSku,
              ProductName: name,
              ProductCategory: category || "",
              ProductSubCategory: category_type || "",
              Brand: brand,
              ProductMainMaterial: main_material || ""
              // Primary Material Subtype:"",
            });
          }
        }

        // load more reviews
        if (type === "reviews/WE_LOAD_MORE_REVIEWS") {
          const { simpleSku, productDescription } = getState().productdetails;
          if (
            simpleSku &&
            productDescription &&
            Object.keys(productDescription).length
          ) {
            const {
              attributes: { main_material },
              meta: { category_details, brand, name, category_type }
            } = productDescription;
            const category =
              category_details && category_details.length
                ? category_details
                    .filter(x => x !== null)
                    .map(item => item.url_key)
                    .join("/")
                : "";
            window.webengage.track("Load More Review", {
              ProductID: simpleSku,
              ProductName: name,
              ProductCategory: category || "",
              ProductSubCategory: category_type || "",
              Brand: brand,
              ProductMainMaterial: main_material || ""
              // Primary Material Subtype:"",
            });
          }
        }
      }
    }
    return next(action);
  };
}
