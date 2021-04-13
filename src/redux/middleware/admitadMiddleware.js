import cookie from 'js-cookie';

const getChannelForAdmitAd = name => {
  // const re = new RegExp(`${name}=([^;]+)`);
  // const value = re.exec(document.cookie);

  // console.log('getChannelForAdmitAd function - value', value);

  // const source = value !== null ? unescape(value[1]) : null;

  // console.log('getChannelForAdmitAd function - source', source);
  const source = cookie.get(name);
  console.log('cookie source here', source);
  let channel = 'other';
  if (source === 'affiliate_admitad') {
    channel = 'adm';
  }
  return channel;
};

const groupSimilarProducts = products => {
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
        const {
          location: { pathname }
        } = getState().router;
        if (type === 'PUSH_TO_DATALAYER' && pathname && pathname === '/payment-success') {
          const {
            paymentstatus: { data }
          } = getState();

          if (data) {
            const { cart_products: cartProducts = [], order_no: orderNo } = data;

            const orderedItem = [];

            const products = groupSimilarProducts(cartProducts);

            // products.forEach(x => {
            //   const { sku, qty, price } = x;

            //   orderedItem.push({
            //     Product: {
            //       productID: sku,
            //       category: '1',
            //       price,
            //       priceCurrency: 'INR'
            //     },
            //     orderQuantity: qty,
            //     additionalType: 'sale'
            //   });
            // });

            orderedItem.push({
              Product: {
                // eslint-disable-next-line max-len
                productID: '', // internal product ID (not more than 100 characters). Not used for "Insurance and finance" program category- leave this string as blank like this
                category: '1', // tariff code (see list below)
                price: 'price', // Pass the total amount paid by user here.
                priceCurrency: 'INR' // currency code in the ISO-4217 alfa-3 format
              },
              orderQuantity: '1', // product quantity. keep this as constant
              additionalType: 'sale' // always sale
            });

            const channel = getChannelForAdmitAd('source');
            console.log('value of getChannelForAdmitAd', channel);
            if (window.ADMITAD.Invoice && window.ADMITAD.Invoice.referencesOrder) {
              window.ADMITAD.Invoice.referencesOrder = window.ADMITAD.Invoice.referencesOrder || [];
              window.ADMITAD.Invoice.referencesOrder.push({
                orderNumber: orderNo,
                orderedItem
              });
              window.ADMITAD.Invoice.broker = channel;
              console.log('window.ADMITAD.Invoice.broker = channel - ', (window.ADMITAD.Invoice.broker = channel));
            }
          }
        }
      }
    }
    return next(action);
  };
}
