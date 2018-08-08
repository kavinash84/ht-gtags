import { RECENTLY_VEIWED } from 'helpers/apiUrls';

const LOAD = 'recentlyviewed/LOAD';
const LOAD_SUCCESS = 'recentlyviewed/LOAD_SUCCESS';
const LOAD_FAIL = 'recentlyviewed/LOAD_FAIL';

const initialState = {
  loaded: false,
  data: []
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

export const setRecentlyViewed = sku => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.put(`${RECENTLY_VEIWED}/${sku}`)
});
