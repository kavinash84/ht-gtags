import { STATIC_BLOCK } from 'helpers/apiUrls';

const LOAD_STORES_DATA = 'storelocator/LOAD_STORES_DATA';
const LOAD_STORES_DATA_SUCCESS = 'storelocator/LOAD_STORES_DATA_SUCCESS';
const LOAD_STORES_DATA_FAIL = 'storelocator/LOAD_STORES_DATA_FAIL';

const initialState = {
  data: []
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_STORES_DATA:
      return {
        ...state,
        loading: true
      };
    case LOAD_STORES_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_STORES_DATA_FAIL:
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

export const loadStoresData = () => ({
  types: [LOAD_STORES_DATA, LOAD_STORES_DATA_SUCCESS, LOAD_STORES_DATA_FAIL],
  promise: ({ client }) => client.get(`${STATIC_BLOCK}/store_react`)
});
