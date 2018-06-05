import { routerReducer } from 'react-router-redux';
import multireducer from 'multireducer';
import info from './modules/info';
import cart from './modules/cart';
import products from './modules/products';
import wishlist from './modules/wishlist';
import search from './modules/search';
import loadmore from './modules/loadmore';
import pincode from './modules/pincode';
import homepage from './modules/homepage';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    info,
    cart,
    products,
    wishlist,
    search,
    loadmore,
    pincode,
    homepage: multireducer({
      menu: homepage,
      categories: homepage,
      topSelling: homepage,
      banners: homepage,
      stores: homepage
    }),
    ...asyncReducers
  };
}
