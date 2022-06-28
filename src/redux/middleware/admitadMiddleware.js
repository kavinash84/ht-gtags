import cookie from "js-cookie";

const getChannelForAdmitAd = name => {
  const source = cookie.get(name);
  console.log("cookie source here", source);
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
        // console.log(type, pathname);
        // console.log('type === PUSH_TO_DATALAYER', type === 'PUSH_TO_DATALAYER');
        if (
          type === "PUSH_TO_DATALAYER" &&
          pathname &&
          pathname === "/payment-success"
        ) {
          console.log("inside if /payment-success", window.ADMITAD);
          const {
            paymentstatus: { data }
          } = getState();

          if (data) {
            const {
              order_no: orderNo,
              net_order_amount: newOrderAmount
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
            // console.log('Create orderItem for ADMITAD', orderedItem);
            if (
              window.ADMITAD.Invoice &&
              window.ADMITAD.Invoice.referencesOrder
            ) {
              // console.log('inside if object exist for admitad and invoice', window.ADMITAD);
              window.ADMITAD.Invoice.referencesOrder =
                window.ADMITAD.Invoice.referencesOrder || [];
              window.ADMITAD.Invoice.referencesOrder.push({
                orderNumber: orderNo,
                orderedItem
              });
              window.ADMITAD.Invoice.broker = channel;
              window.ADMITAD.Invoice.category = "1";
              console.log(
                "ADMITAD window variable successfully added",
                window.ADMITAD
              );
            }
          }
        }
      }
    }
    return next(action);
  };
}
