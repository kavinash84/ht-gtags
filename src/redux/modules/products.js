const LOAD = 'products/LOAD';
const LOAD_SUCCESS = 'products/LOAD_SUCCESS';
const LOAD_FAIL = 'products/LOAD_FAIL';
const SET_QUERY = 'products/SET_QUERY';
const CLEAR_PREVIOUS_LIST = 'products/CLEAR_PREVIOUS_LIST';

const initialState = {
  loaded: false,
  data: [],
  list: [],
  query: ''
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
        data: action.result,
        list: [...state.list, ...action.result.metadata.results]
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_QUERY:
      return {
        ...state,
        query: action.payLoad
      };
    case CLEAR_PREVIOUS_LIST:
      return {
        ...state,
        loaded: false,
        list: []
      };
    default:
      return state;
  }
}

export function isLoaded(globalState, query) {
  if (globalState.products) {
    return globalState.products.loaded && globalState.products.query === query;
  }
  return false;
}

export const load = (category, page) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`tesla/products/${category}/?sort=popularity&dir=desc&page=${page}`)
});

export const loadSearchQuery = (searchText, page) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`tesla/search/find/?page=${page}&q=${searchText}&sort=popularity&dir=desc`)
});

export const setCategoryQuery = payLoad => ({
  type: SET_QUERY,
  payLoad
});

export const clearPreviousList = () => ({
  type: CLEAR_PREVIOUS_LIST
});
