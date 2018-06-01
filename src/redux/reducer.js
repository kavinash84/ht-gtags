import { routerReducer } from 'react-router-redux';
import info from './modules/info';
import banners from './modules/banners';
import shopByOccasion from './modules/shopByOccasion';
import shopByRoom from './modules/shopByRoom';
import shopByStyle from './modules/shopByStyle';
import cart from './modules/cart';
import products from './modules/products';
import wishlist from './modules/wishlist';
import search from './modules/search';
import loadmore from './modules/loadmore';
import menu from './modules/menu';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    info,
    banners,
    shopByStyle,
    shopByOccasion,
    shopByRoom,
    cart,
    products,
    wishlist,
    search,
    loadmore,
    menu,
    ...asyncReducers
  };
}
