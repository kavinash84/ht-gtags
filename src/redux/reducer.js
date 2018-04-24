// import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import info from './modules/info';
import shopByStles from './modules/shopByStyles';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    online: (v = true) => v,
    info,
    shopByStles,
    ...asyncReducers
  };
}
