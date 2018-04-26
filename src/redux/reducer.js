import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import info from './modules/info';
import banners from './modules/banners';
import shopByOccasion from './modules/shopByOccasion';
import shopByRoom from './modules/shopByRoom';
import shopByStyle from './modules/shopByStyle';
import counter from './modules/quantityCounter';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    info,
    banners,
    shopByStyle,
    shopByOccasion,
    shopByRoom,
    counters: multireducer({
      listing: counter,
      detail: counter,
      cart: counter
    }),
    ...asyncReducers
  };
}
