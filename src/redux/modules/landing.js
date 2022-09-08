import {
  LANDING_INFO as LANDING_INFO_API,
  LANDING_CATEGORY as LANDING_CATEGORY_API
} from 'helpers/apiUrls';

const LANDING_INFO = 'landing/LANDING_INFO';
const LANDING_INFO_SUCCESS = 'landing/LANDING_INFO_SUCCESS';
const LANDING_INFO_FAIL = 'landing/LANDING_INFO_FAIL';

const LANDING_CATEGORY = 'landing/LANDING_CATEGORY';
const LANDING_CATEGORY_SUCCESS = 'landing/LANDING_CATEGORY_SUCCESS';
const LANDING_CATEGORY_FAIL = 'landing/LANDING_CATEGORY_FAIL';

const LANDING_SUBMIT = 'landing/LANDING_SUBMIT';
const LANDING_SUBMIT_SUCCESS = 'landing/LANDING_SUBMIT_SUCCESS';
const LANDING_SUBMIT_FAIL = 'landing/LANDING_SUBMIT_FAIL';

const initialState = {
  infoLoading: false,
  infoLoaded: false,
  infoOfferChecked: false,
  infoError: false,
  cateLoading: false,
  cateLoaded: false,
  cateChecked: false,
  submitErrorMessage: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LANDING_INFO:
      return {
        ...state,
        infoloading: true,
        infoloaded: false
      };
    case LANDING_INFO_SUCCESS:
      return {
        ...state,
        infoLoading: false,
        infoLoaded: true,
        infoOfferChecked: true,
        data: action.result
      };
    case LANDING_INFO_FAIL:
      return {
        ...state,
        infoLoading: false,
        infoLoaded: true,
        data: action.result
      };
    case LANDING_CATEGORY:
      return {
        ...state,
        cateLoading: true,
        cateLoaded: false
      };
    case LANDING_CATEGORY_SUCCESS:
      return {
        ...state,
        cateLoading: false,
        cateLoaded: true,
        cateChecked: true,
        cateData: action.result
      };
    case LANDING_CATEGORY_FAIL:
      return {
        ...state,
        cateLoading: false,
        cateLoaded: true,
        cateData: action.result
      };
    case LANDING_SUBMIT:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
        submitErrorMessage: null
      };
    case LANDING_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        submitErrorMessage: action.result.error || ''
      };
    case LANDING_SUBMIT_FAIL:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: true,
        submitErrorMessage: action.result.error || ''
      };
    default:
      return state;
  }
}

export const getLandingData = dash => ({
  types: [LANDING_INFO, LANDING_INFO_SUCCESS, LANDING_INFO_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${LANDING_INFO_API}/${dash}`);
      return response;
    } catch (error) {
      return error;
    }
  }
});

export const getLandingCategoryData = () => ({
  types: [LANDING_CATEGORY, LANDING_CATEGORY_SUCCESS, LANDING_CATEGORY_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${LANDING_CATEGORY_API}`);
      return response;
    } catch (error) {
      return error;
    }
  }
});

export const submitOffer = (url, postData) => ({
  types: [LANDING_SUBMIT, LANDING_SUBMIT_SUCCESS, LANDING_SUBMIT_FAIL],
  promise: async ({ client }) => {
    const header = { 'Content-Type': 'multipart/form-data' };
    try {
      const response = await client.post(url, postData, { header });
      return response;
    } catch (error) {
      return error;
    }
  }
});
