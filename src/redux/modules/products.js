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
  data: [],
  list: [],
  query: '',
  sort: 'sort=popularity&dir=desc'
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
    case LOAD_CLEAR_FILTERS:
      return {
        ...state,
        loading: true
      };
    case LOAD_CLEAR_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        list: action.result.metadata.results
      };
    case LOAD_CLEAR_FILTERS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.error
      };
    case LOAD_SORTBY:
      return {
        ...state,
        loading: true
      };
    case LOAD_SORTBY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        sort: action.result.sort,
        list: action.result.metadata.results
      };
    case LOAD_SORTBY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_FILTER:
      return {
        ...state,
        loading: true,
        filterLoading: true,
        filterLoaded: false
      };
    case LOAD_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        filterLoading: false,
        filterLoaded: true,
        data: action.result,
        list: action.result.metadata.results
      };
    case LOAD_FILTER_FAIL:
      return {
        ...state,
        loading: false,
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
export const clearAllFilters = category => ({
  types: [LOAD_CLEAR_FILTERS, LOAD_CLEAR_FILTERS_SUCCESS, LOAD_CLEAR_FILTERS_FAIL],
  promise: ({ client }) => client.get(`tesla/products/${category}&city=delhi`)
});

export const loadSortBy = (category, sort) => ({
  types: [LOAD_SORTBY, LOAD_SORTBY_SUCCESS, LOAD_SORTBY_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`tesla/products/${category}/?${sort}&city=delhi`);
      response.sort = sort;
      return response;
    } catch (error) {
      return error;
    }
  }
});
export const applyFilter = (category, key) => ({
  types: [LOAD_FILTER, LOAD_FILTER_SUCCESS, LOAD_FILTER_FAIL],
  promise: ({ client }) => client.get(`tesla/products/${category}/${key}&city=delhi`)
});

export const load = (category, page, sort) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`tesla/products/${category}/?${sort}&page=${page}&maxitems=30&city=delhi`)
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
export const clearPreviousSort = () => ({
  type: CLEAR_PREVIOUS_SORT
});
