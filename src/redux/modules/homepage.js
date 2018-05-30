import {
  CATEGORY_MENU,
  BANNERS,
  SHOP_BY_ROOM,
  SHOP_BY_STYLE,
  SHOP_BY_OCCASION,
  TOP_SELLING,
  RECOMMENDED_FOR_YOU
} from 'helpers/apiUrls';

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

export const isLoaded = (globalState, key) => globalState.homepage[key] && globalState.homepage[key].loaded;

export const loadCategoryMenu = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(CATEGORY_MENU)
});

export const loadBanners = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(BANNERS)
});

export const loadShopByOccasions = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(SHOP_BY_OCCASION)
});

export const loadShopByStyle = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(SHOP_BY_STYLE)
});

export const loadShopByRoom = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(SHOP_BY_ROOM)
});

export const loadTopSelling = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(TOP_SELLING)
});

export const loadRecommendations = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(RECOMMENDED_FOR_YOU)
});
