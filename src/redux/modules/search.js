const LOAD = 'search/LOAD';
const LOAD_SUCCESS = 'search/LOAD_SUCCESS';
const LOAD_FAIL = 'search/LOAD_FAIL';
const SHOW_RESULTS_ON_FOCUS = 'search/SHOW_RESULTS_ON_FOCUS';
const HIDE_RESULTS_ON_BLUR = 'search/HIDE_RESULTS_ON_BLUR';
const HIDE_RESULTS_ON_SUBMIT = 'search/HIDE_RESULTS_ON_SUBMIT';
const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';
const CLEAR_SEARCH_QUERY = 'search/CLEAR_SEARCH_QUERY';
const STOP_LOADING = 'search/STOP_LOADING';

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
        loading: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: false,
        results: []
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
        loading: action.query.length >= 4,
        loaded: false,
        searchQuery: action.query
      };
    case SHOW_RESULTS_ON_FOCUS:
      return {
        ...state,
        showResults: false
      };
    case HIDE_RESULTS_ON_BLUR:
      return {
        ...state,
        showResults: false
      };
    case HIDE_RESULTS_ON_SUBMIT:
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
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    default:
      return state;
  }
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
export const hideResultsOnSubmit = () => ({
  type: HIDE_RESULTS_ON_SUBMIT
});
