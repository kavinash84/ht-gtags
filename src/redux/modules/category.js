import { CATEGORY_PAGE } from 'helpers/apiUrls';

const LOAD = 'categoryPage/LOAD';
const LOAD_SUCCESS = 'categoryPage/LOAD_SUCCESS';
const LOAD_FAIL = 'categoryPage/LOAD_FAIL';

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

export const isLoaded = globalState => globalState.category && globalState.category.loaded;

export const loadCategory = id => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${CATEGORY_PAGE}/${id}`)
});
