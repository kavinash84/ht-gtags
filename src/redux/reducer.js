// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import info from './modules/info';
import shopByStles from './modules/homepageCategories';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    info,
    shopByStles,
    // homepage: multireducer({
    //   shopByStles,
    // }),
    ...asyncReducers
  };
}
