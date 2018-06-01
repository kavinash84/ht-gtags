// API URL
const CATEGORY_MENU = 'tesla/categories/';

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

export const isLoaded = globalState => globalState.menu && globalState.menu.loaded;

export const load = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(CATEGORY_MENU)
});
