import { STATIC_BLOCK } from 'helpers/apiUrls';

const LOAD = 'loadStores/LOAD';
const LOAD_SUCCESS = 'loadStores/LOAD_SUCCESS';
const LOAD_FAIL = 'loadStores/LOAD_FAIL';
const SET_SELECTED_CITY = 'loadStores/SET_SELECTED_CITY';

const initialState = {
  loaded: false,
  data: null,
  selectedCity: 'AHMEDABAD'
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
        data: action.result.items.text
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_SELECTED_CITY:
      return {
        ...state,
        selectedCity: action.city
      };
    default:
      return state;
  }
}

export const isLoaded = globalState => globalState.stores && globalState.stores.loaded;

export const loadStores = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${STATIC_BLOCK}/store_react`)
});

export const setCity = city => ({
  type: SET_SELECTED_CITY,
  city
});
