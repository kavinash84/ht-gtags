import { PINCODE } from 'helpers/Constants';

const LOAD = 'products/LOAD';
const LOAD_SUCCESS = 'products/LOAD_SUCCESS';
const LOAD_FAIL = 'products/LOAD_FAIL';

const LOAD_SORTBY = 'products/LOAD_SORTBY';
const LOAD_SORTBY_SUCCESS = 'products/LOAD_SORTBY_SUCCESS';
const LOAD_SORTBY_FAIL = 'products/LOAD_SORTBY_FAIL';

const LOAD_FILTER = 'products/LOAD_FILTER';
const LOAD_FILTER_SUCCESS = 'products/LOAD_FILTER_SUCCESS';
const LOAD_FILTER_FAIL = 'products/LOAD_FILTER_FAIL';

const LOAD_CLEAR_FILTERS = 'products/LOAD_CLEAR_FILTERS';
const LOAD_CLEAR_FILTERS_SUCCESS = 'products/LOAD_CLEAR_FILTERS_SUCCESS';
const LOAD_CLEAR_FILTERS_FAIL = 'products/LOAD_CLEAR_FILTERS_FAIL';

const SET_QUERY = 'products/SET_QUERY';
const CLEAR_PREVIOUS_LIST = 'products/CLEAR_PREVIOUS_LIST';
const CLEAR_PREVIOUS_SORT = 'products/CLEAR_PREVIOUS_SORT';

const initialState = {
  loaded: false,
  data: {},
  list: [],
  query: '',
  shimmer: false,
  sort: 'sort=popularity&dir=desc'
};

const defaultPincode = PINCODE;

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
    case LOAD_CLEAR_FILTERS:
      return {
        ...state,
        loading: true,
        shimmer: true
      };
    case LOAD_CLEAR_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shimmer: false,
        data: action.result,
        list: action.result.metadata.results
      };
    case LOAD_CLEAR_FILTERS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        shimmer: false,
        error: action.error
      };
    case LOAD_SORTBY:
      return {
        ...state,
        loading: true,
        shimmer: true
      };
    case LOAD_SORTBY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shimmer: false,
        data: action.result,
        sort: action.result.sort,
        list: action.result.metadata.results
      };
    case LOAD_SORTBY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        shimmer: false,
        error: action.error
      };
    case LOAD_FILTER:
      return {
        ...state,
        loading: true,
        shimmer: true,
        filterLoading: true,
        filterLoaded: false
      };
    case LOAD_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        shimmer: false,
        filterLoading: false,
        filterLoaded: true,
        data: action.result,
        list: action.result.metadata.results
      };
    case LOAD_FILTER_FAIL:
      return {
        ...state,
        loading: false,
        shimmer: false,
        filterLoading: false,
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
    case CLEAR_PREVIOUS_SORT:
      return {
        ...state,
        loaded: false,
        sort: 'sort=popularity&dir=desc'
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
export const clearAllFilters = (category, pincode, city = 'delhi') => ({
  types: [LOAD_CLEAR_FILTERS, LOAD_CLEAR_FILTERS_SUCCESS, LOAD_CLEAR_FILTERS_FAIL],
  promise: ({ client }) => client.get(`tesla/products/${category}&pincode=${pincode}&city=${city}`)
});

export const loadSortBy = (category, sort, pincode, city = 'delhi') => ({
  types: [LOAD_SORTBY, LOAD_SORTBY_SUCCESS, LOAD_SORTBY_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`tesla/products/${category}/?${sort}&pincode=${pincode}&city=${city}`);
      response.sort = sort;
      return response;
    } catch (error) {
      return error;
    }
  }
});
/* eslint-disable max-len */

export const applyFilter = (category, key, pincode, city = 'delhi') => ({
  types: [LOAD_FILTER, LOAD_FILTER_SUCCESS, LOAD_FILTER_FAIL],
  promise: ({ client }) => client.get(`tesla/products/${category}/${key}&pincode=${pincode}&city=${city}`)
});

export const load = (category, page, sort, pincode, city = 'delhi') => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`tesla/products/${category}/?${sort}&page=${page}&maxitems=30&pincode=${pincode}&city=${city}`)
});

export const loadSearchQuery = (searchText, page, pincode) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`tesla/search/find/?page=${page}&q=${searchText}&pincode=${
      pincode.length ? pincode : defaultPincode
    }&sort=popularity&dir=desc&maxitems=30`)
});

export const loadUrlQuery = (category, query, pincode, city = 'delhi') => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`tesla/products/${category}/?${query}&maxitems=30&pincode=${pincode}&city=${city}`)
});

export const setCategoryQuery = payLoad => ({
  type: SET_QUERY,
  payLoad
});

export const clearPreviousList = () => ({
  type: CLEAR_PREVIOUS_LIST
});
export const clearPreviousSort = () => ({
  type: CLEAR_PREVIOUS_SORT
});
