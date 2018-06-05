import { HOMEPAGE_CATEGORIES } from 'helpers/apiUrls';

const LOAD = 'hompageCategories/LOAD';
const LOAD_SUCCESS = 'hompageCategories/LOAD_SUCCESS';
const LOAD_FAIL = 'hompageCategories/LOAD_FAIL';

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

export function isLoaded(globalState) {
  return globalState.homepage && globalState.homepage.loaded;
}

export const load = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(HOMEPAGE_CATEGORIES)
});
