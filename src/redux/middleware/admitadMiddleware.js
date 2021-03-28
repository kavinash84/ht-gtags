export default function admitadMiddleware() {
  return ({ getState }) => next => action => {
    if (__CLIENT__) {
      const { type } = action;
      if (window && window.ADMITAD) {
        console.log('Inside admitad window vairable');
        const {
          location: { pathname }
        } = getState().router;
        if (type === 'PUSH_TO_DATALAYER' && pathname && pathname === '/payment-success') {
          const {
            paymentstatus: { data }
          } = getState();
          console.log('Hello World for admidAd', data);

          if (data) {
            const { cart_products: products = [], order_no: orderNo } = data;

            const orderedItem = [];
            products.forEach(x => {
              const { sku, qty, price } = x;

              orderedItem.push({
                Product: {
                  productID: sku,
                  category: '1',
                  price,
                  priceCurrency: 'INR'
                },
                orderQuantity: qty,
                additionalType: 'sale'
              });
            });

            console.log('Before push to dataLayar', orderedItem);
            if (window.ADMITAD.Invoice && window.ADMITAD.Invoice.referencesOrder) {
              window.ADMITAD.Invoice.referencesOrder = window.ADMITAD.Invoice.referencesOrder || [];
              window.ADMITAD.Invoice.referencesOrder.push({
                orderNumber: orderNo,
                orderedItem
              });
            }
          }
        }
      }
    }
    return next(action);
  };
}
