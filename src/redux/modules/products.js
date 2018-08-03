import { PINCODE } from 'helpers/Constants';
import { getParamsDetailFromLink } from 'utils/helper';

const LOAD = 'products/LOAD';
const LOAD_SUCCESS = 'products/LOAD_SUCCESS';
const LOAD_FAIL = 'products/LOAD_FAIL';

const SET_FILTER_IN_STATE = 'products/SET_FILTER_IN_STATE';

const LOAD_FILTER = 'products/LOAD_FILTER';
const LOAD_FILTER_SUCCESS = 'products/LOAD_FILTER_SUCCESS';
const LOAD_FILTER_FAIL = 'products/LOAD_FILTER_FAIL';

const LOAD_CLEAR_FILTERS = 'products/LOAD_CLEAR_FILTERS';
const LOAD_CLEAR_FILTERS_SUCCESS = 'products/LOAD_CLEAR_FILTERS_SUCCESS';
const LOAD_CLEAR_FILTERS_FAIL = 'products/LOAD_CLEAR_FILTERS_FAIL';

const SET_QUERY = 'products/SET_QUERY';
const SET_CATEGORY = 'products/SET_CATEGORY';

const CLEAR_PREVIOUS_LIST = 'products/CLEAR_PREVIOUS_LIST';
const CLEAR_PREVIOUS_SORT = 'products/CLEAR_PREVIOUS_SORT';

const initialState = {
  loaded: false,
  data: {},
  list: [],
  query: '',
  shimmer: false,
  sortBy: 'Popularity',
  category: '',
  filters: {
    sortBy: 'Popularity'
  }
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
    case SET_FILTER_IN_STATE:
      return {
        ...state,
        filters: action.payLoad
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
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payLoad
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
  promise: ({ client }) => client.get(`tesla/products/${category}/?pincode=${pincode}&city=${city}`)
});

export const setFiltersInState = payLoad => ({
  type: SET_FILTER_IN_STATE,
  payLoad
});
/* eslint-disable max-len */

export const applyFilter = ({
  query, pincode, city = 'delhi', filters
}) => dispatch =>
  dispatch({
    types: [LOAD_FILTER, LOAD_FILTER_SUCCESS, LOAD_FILTER_FAIL],
    promise: ({ client }) => {
      const params = getParamsDetailFromLink(query, filters);
      const {
        price, discount, material, modifiedQuery, sortby, pageno
      } = params;
      dispatch(setFiltersInState(params));
      return client.get(`tesla/products/${modifiedQuery}/?&maxitems=32&pincode=${pincode}&city=${city}${price}${discount}${material}${sortby}${pageno}&category=Furniture`);
    }
  });

export const load = (category, page, sort, pincode, city = 'delhi') => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`tesla/products/${category}/?${sort}&page=${page}&maxitems=32&pincode=${pincode}&city=${city}`)
});

export const loadSearchQuery = (searchText, page, pincode) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`tesla/search/find/?page=${page}&q=${searchText}&pincode=${
      pincode.length ? pincode : defaultPincode
    }&sort=popularity&dir=desc&maxitems=32`)
});

export const loadUrlQuery = (category, query, pincode, city = 'delhi') => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`tesla/products/${category}/?${query}&maxitems=32&pincode=${pincode}&city=${city}`)
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

export const setCategory = payLoad => ({
  type: SET_CATEGORY,
  payLoad
});
