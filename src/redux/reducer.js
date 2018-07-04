import { routerReducer } from 'react-router-redux';
import multireducer from 'multireducer';
import app from './modules/app';
import info from './modules/info';
import cart from './modules/cart';
import products from './modules/products';
import wishlist from './modules/wishlist';
import search from './modules/search';
import loadmore from './modules/loadmore';
import pincode from './modules/pincode';
import homepage from './modules/homepage';
import stores from './modules/stores';
import userLogin from './modules/login';
import userSignUp from './modules/signUp';
import updatepassword from './modules/updatepassword';
import profile from './modules/profile';
import forgotpassword from './modules/forgotpassword';
import category from './modules/category';
import productdetails from './modules/productdetails';
import reviews from './modules/reviews';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    app,
    info,
    cart,
    products,
    wishlist,
    search,
    loadmore,
    pincode,
    homepage: multireducer({
      menu: homepage,
      banners: homepage,
      categories: homepage,
      hashtags: homepage,
      products: homepage,
      offerstrip: homepage
    }),
    category,
    stores,
    userLogin,
    userSignUp,
    updatepassword,
    profile,
    forgotpassword,
    productdetails,
    reviews,
    ...asyncReducers
  };
}
