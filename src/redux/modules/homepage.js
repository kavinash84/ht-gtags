import {
  BANNERS,
  HOMEPAGE_CATEGORIES,
  HOMEPAGE_TOP_SELLING,
  CATEGORY_MENU,
  HASHTAGS,
  STATIC_BLOCK,
  RECENTLY_VEIWED
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

export const loadMainMenu = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(CATEGORY_MENU)
});

export const loadCategories = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(HOMEPAGE_CATEGORIES)
});

export const loadBanners = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(BANNERS)
});

export const loadHashTags = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(HASHTAGS)
});

export const loadTopSelling = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(HOMEPAGE_TOP_SELLING)
});

export const loadOffers = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${STATIC_BLOCK}/home_page_offerstrip_react`)
});

export const loadFooter = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${STATIC_BLOCK}/footer_react`)
});

export const loadRecentlyViewed = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${RECENTLY_VEIWED}`)
});
