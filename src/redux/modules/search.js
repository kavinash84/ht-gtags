const LOAD = 'search/LOAD';
const LOAD_SUCCESS = 'search/LOAD_SUCCESS';
const LOAD_FAIL = 'search/LOAD_FAIL';
const SHOW_RESULTS_ON_FOCUS = 'search/SHOW_RESULTS_ON_FOCUS';
const HIDE_RESULTS_ON_BLUR = 'search/HIDE_RESULTS_ON_BLUR';
const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';
const CLEAR_SEARCH_QUERY = 'search/CLEAR_SEARCH_QUERY';

const initialState = {
  loading: false,
  loaded: false,
  results: [],
  searchQuery: '',
  showResults: false
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
    case SHOW_RESULTS_ON_FOCUS:
      return {
        ...state,
        showResults: true
      };
    case HIDE_RESULTS_ON_BLUR:
      return {
        ...state,
        showResults: false
      };
    case CLEAR_SEARCH_QUERY:
      return {
        ...state,
        loading: false,
        loaded: true,
        results: [],
        searchQuery: ''
      };
    default:
      return state;
  }
}

export function load(query) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get(`tesla/search/suggestions/${query}`)
  };
}

export const setSearchQuery = query => ({
  type: SET_SEARCH_QUERY,
  query
});

export const clearSearchQuery = () => ({
  type: CLEAR_SEARCH_QUERY
});

export const showResultsonFocus = () => ({
  type: SHOW_RESULTS_ON_FOCUS
});

export const hideResultsonBlur = () => ({
  type: HIDE_RESULTS_ON_BLUR
});
