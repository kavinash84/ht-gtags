import { CATEGORY_PAGE } from "helpers/apiUrls";

const LOAD = "categoryPage/LOAD";
const LOAD_SUCCESS = "categoryPage/LOAD_SUCCESS";
const LOAD_FAIL = "categoryPage/LOAD_FAIL";
const SET_CURRENT_CATEGORY = "categoryPage/SET_CURRENT_CATEGORY";

const initialState = {
  loaded: false,
  currentCategory: "",
  data: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        data: []
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
    case SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payLoad,
        data: []
      };
    default:
      return state;
  }
}

export const isLoaded = (globalState, category) =>
  globalState.category &&
  globalState.category.loaded &&
  globalState.category.currentCategory === category;

export const setCategory = payLoad => ({
  type: SET_CURRENT_CATEGORY,
  payLoad
});

export const loadCategory = id => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${CATEGORY_PAGE}/${id}?newui=true`),
  id
});
