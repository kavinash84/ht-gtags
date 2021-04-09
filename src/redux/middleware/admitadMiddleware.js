const getChannelForAdmitAd = name => {
  const re = new RegExp(`${name}=([^;]+)`);
  let value = re.exec(document.cookie);
  value = value !== null ? unescape(value[1]) : null;

  const source = value;
  let channel = 'other';
  if (source === 'affiliate_admitad') {
    channel = 'adm';
  }
  return channel;
};

const groupSimilarProducts = products => {
  console.log('groupSimilarProducts');
  console.log(JSON.stringify(products));
  let groupedProducts = [];

  products.forEach(arr => {
    if (groupedProducts[arr.sku] && groupedProducts[arr.sku].sku === arr.sku) {
      groupedProducts[arr.sku].qty += 1;
    } else {
      groupedProducts[arr.sku] = arr;
    }
  });
  groupedProducts = Object.values(groupedProducts);
  return groupedProducts;
};

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
            const { cart_products: cartProducts = [], order_no: orderNo } = data;

            const orderedItem = [];

            const products = groupSimilarProducts(cartProducts);

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

            const channel = getChannelForAdmitAd();

            console.log('Channel for admitad', channel);

            if (window.ADMITAD.Invoice && window.ADMITAD.Invoice.referencesOrder) {
              console.log('Log to check - Inside if condition of window.ADMITAD.Invoice', window.ADMITAD.Invoice);
              window.ADMITAD.Invoice.referencesOrder = window.ADMITAD.Invoice.referencesOrder || [];
              window.ADMITAD.Invoice.referencesOrder.push({
                orderNumber: orderNo,
                orderedItem
              });
              window.ADMITAD.Invoice.broker = channel;
            }
          }
        }
      }
    }
    return next(action);
  };
}
