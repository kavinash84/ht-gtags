export default function webEngageMiddleware() {
  return ({ getState }) => next => action => {
    if (__CLIENT__) {
      const { type } = action;
      if (window && window.webengage) {
        //   user login
        if (type === "app/LOAD_SUCCESS") {
          window.webengage.user.login(action.result.session);
        }
        //   user track
        if (type === "profile/LOAD_SUCCESS") {
          const {
            result: { email, dob }
          } = action;
          window.webengage.user.setAttribute("we_email", email);
          window.webengage.user.setAttribute("we_birth_date", dob);
        }
        //   add to cart
        if (type === "cart/ADD_TO_CART_SUCCESS") {
          const {
            result: { qty },
            configId
          } = action;
          const [product] =
            action.result &&
            action.result.cart.cart.filter(
              item => item.id_customer_cart === idcustomerCart
            );
          const {
            name,
            net_price: netprice,
            color,
            brand,
            category_details: categoryDetails
          } = product.product_info;
          if (window && window.webengage) {
            console.log("webengage.track", window.webengage);
            window.webengage.track("Added To Cart", {
              "Product ID": configId,
              Price: netprice
            });
          }
        }
      }
    }
    return next(action);
  };
}
