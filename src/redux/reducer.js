import { routerReducer } from 'react-router-redux';
import info from './modules/info';
import banners from './modules/banners';
import shopByOccasion from './modules/shopByOccasion';
import shopByRoom from './modules/shopByRoom';
import shopByStyle from './modules/shopByStyle';
import cart from './modules/cart';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    info,
    banners,
    shopByStyle,
    shopByOccasion,
    shopByRoom,
    cart,
    ...asyncReducers
  };
}
