const LOAD = 'products/LOAD';
const LOAD_SUCCESS = 'products/LOAD_SUCCESS';
const LOAD_FAIL = 'products/LOAD_FAIL';

const ProductItems = require('../../data/RecentlyViewedProducts.js');

const initialState = {
  data: ProductItems
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: ({ client }) => client.get('tesla/rooms/')
//   };
// }
