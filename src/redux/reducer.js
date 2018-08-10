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
import trackorder from './modules/trackorder';
import orders from './modules/orders';
import pagination from './modules/pagination';
import paymentoptions from './modules/paymentoptions';
import checkout from './modules/checkout';
import shipping from './modules/shipping';
import billing from './modules/billing';
import colorproducts from './modules/colorproducts';
import coupon from './modules/coupon';
import myaddress from './modules/myaddress';
import relatedproducts from './modules/relatedproducts';
import paymentstatus from './modules/paymentstatus';
import recentlyviewed from './modules/recentlyviewed';
import storelocator from './modules/storelocator';
import emioptions from './modules/emioptions';

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
      offerstrip: homepage,
      footer: homepage,
      recentlyviewed: homepage
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
    trackorder,
    orders,
    pagination,
    paymentoptions,
    checkout,
    shipping,
    billing,
    colorproducts,
    coupon,
    myaddress,
    relatedproducts,
    paymentstatus,
    recentlyviewed,
    storelocator,
    emioptions,
    ...asyncReducers
  };
}
