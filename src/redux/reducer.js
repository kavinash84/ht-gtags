import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import info from './modules/info';
import homepageCategories from './modules/homepageCategories';

export default function createReducers(asyncReducers) {
  return {
    router: routerReducer,
    info,
    homepage: multireducer({
      shopByStles: homepageCategories,
      shopByOccasion: homepageCategories
    }),
    ...asyncReducers
  };
}
