import { LISTING_BANNER as API } from 'helpers/apiUrls';

const LOAD = 'listingbanner/LOAD';
const LOAD_SUCCESS = 'listingbanner/LOAD_SUCCESS';
const LOAD_FAIL = 'listingbanner/LOAD_FAIL';

const initialState = {
  loaded: false,
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export const isLoaded = globalState => globalState.listingbanner && globalState.listingbanner.loaded;

export const load = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(API)
});
