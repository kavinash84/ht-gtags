const LOAD = 'search/LOAD';
const LOAD_SUCCESS = 'search/LOAD_SUCCESS';
const LOAD_FAIL = 'search/LOAD_FAIL';
const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';
const CLEAR_SEARCH_QUERY = 'search/CLEAR_SEARCH_QUERY';

const initialState = {
  loading: false,
  loaded: false,
  results: [],
  searchQuery: ''
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
        results: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        loading: action.query.length >= 3,
        loaded: false,
        searchQuery: action.query
      };
    case CLEAR_SEARCH_QUERY:
      return {
        ...state,
        loading: false,
        loaded: true,
        searchQuery: ''
      };
    default:
      return state;
  }
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get('tesla/search/')
  };
}

export const setSearchQuery = query => ({
  type: SET_SEARCH_QUERY,
  query
});

export const clearSearchQuery = () => ({
  type: CLEAR_SEARCH_QUERY
});
