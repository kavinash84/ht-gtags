import cookie from "js-cookie";

const getChannelForAdmitAd = name => {
  const source = cookie.get(name);
  let channel;
  if (!source) {
    channel = "na";
  } else if (source && window && window.deduplication_cookie_value) {
    if (source != window.deduplication_cookie_value) channel = source;
  } else {
    channel = "adm";
  }
  return channel;
};

export default function admitadMiddleware() {
  return ({ getState }) => next => action => {
    if (__CLIENT__) {
      const { type } = action;
      if (window && window.ADMITAD) {
        const {
          location: { pathname }
        } = window;
        if (
          type === "PUSH_TO_DATALAYER" &&
          pathname &&
          pathname === "/payment-success"
        ) {
          const {
            paymentstatus: { data }
          } = getState();

          if (data) {
            const {
              order_no: orderNo,
              sub_total_amount: newOrderAmount
            } = data;

            const orderedItem = [];
            orderedItem.push({
              Product: {
                productID: "", // internal product ID (not more than 100 characters).
                // Not used for "Insurance and finance" program category- leave this string as blank like this
                category: "1", // tariff code (see list below)
                price: newOrderAmount, // Pass the total amount paid by user here.
                priceCurrency: "INR" // currency code in the ISO-4217 alfa-3 format
              },
              orderQuantity: "1", // product quantity. keep this as constant
              additionalType: "sale" // always sale
            });

            const channel = getChannelForAdmitAd("source");
            if (
              window.ADMITAD.Invoice &&
              window.ADMITAD.Invoice.referencesOrder
            ) {
              window.ADMITAD.Invoice.referencesOrder =
                window.ADMITAD.Invoice.referencesOrder || [];
              window.ADMITAD.Invoice.referencesOrder.push({
                orderNumber: orderNo,
                orderedItem
              });
              window.ADMITAD.Invoice.broker = channel;
              window.ADMITAD.Invoice.category = "1";
            }
          }
        }
      }
    }
    return next(action);
  };
}
