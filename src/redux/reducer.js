import { routerReducer } from "react-router-redux";
import multireducer from "multireducer";
import modularkitchen from "./modules/modularkitchen";
import app from "./modules/app";
import cart from "./modules/cart";
import products from "./modules/products";
import wishlist from "./modules/wishlist";
import search from "./modules/search";
import loadmore from "./modules/loadmore";
import pincode from "./modules/pincode";
import homepage from "./modules/homepage";
import stores from "./modules/stores";
import userLogin from "./modules/login";
import userSignUp from "./modules/signUp";
import updatepassword from "./modules/updatepassword";
import setpassword from "./modules/setpassword";
import profile from "./modules/profile";
import forgotpassword from "./modules/forgotpassword";
import category from "./modules/category";
import productdetails from "./modules/productdetails";
import reviews from "./modules/reviews";
import trackorder from "./modules/trackorder";
import orders from "./modules/orders";
import tracking from "./modules/tracking";
import pagination from "./modules/pagination";
import paymentoptions from "./modules/paymentoptions";
import checkout from "./modules/checkout";
import coupon from "./modules/coupon";
import myaddress from "./modules/myaddress";
import mycases from "./modules/mycases";
import paymentstatus from "./modules/paymentstatus";
import recentlyviewed from "./modules/recentlyviewed";
import storelocator from "./modules/storelocator";
import notifs from "./modules/notifs";
import address from "./modules/address";
import analytics from "./modules/analytics";
import services from "./modules/services";
import cases from "./modules/cases";
import combinedbuy from "./modules/combinedbuy";
import landing from "./modules/landing";
import selectForDemo from "./modules/selectForDemo";
import webtochat from "./modules/webtochat";
import offer from "./modules/offer";
import listingbanners from "./modules/listingbanners";
import feedback from "./modules/feedback";
import homeinterior from "./modules/homeinterior";
import modularwardrobe from "./modules/modularwardrobe";
import designbuild from "./modules/designbuild";
import spaces from "./modules/spaces";
import planyourkitchen from "./modules/planyourkitchen";
import lackpackages from "./modules/lackpackages";

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    app,
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
      offers: homepage,
      footer: homepage,
      recentlyviewed: homepage,
      instafeeds: homepage,
      terms: homepage,
      cancellation: homepage,
      privacy: homepage,
      homepagecmsdata: homepage,
      returnpolicy: homepage,
      dealoftheday: homepage,
      bestsellers: homepage
    }),
    category,
    stores,
    userLogin,
    userSignUp,
    updatepassword,
    setpassword,
    profile,
    forgotpassword,
    productdetails,
    reviews,
    trackorder,
    orders,
    tracking,
    pagination,
    paymentoptions,
    checkout,
    coupon,
    myaddress,
    combinedbuy,
    paymentstatus,
    recentlyviewed,
    storelocator,
    notifs,
    address,
    analytics,
    services,
    cases,
    mycases,
    landing,
    selectForDemo,
    webtochat,
    offer,
    feedback,
    listingbanners,
    homeinterior,
    modularwardrobe,
    designbuild,
    modularkitchen,
    spaces,
    // planyourkitchen,
    planyourkitchen,
    lackpackages,
    ...asyncReducers
  };
}
