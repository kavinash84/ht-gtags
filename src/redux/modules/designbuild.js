import { DESIGN_BUILD, WARRANTY, EXCHANGE_OFFER } from "helpers/apiUrls";

const LOAD = "designbuild/LOAD";
const LOAD_SUCCESS = "designbuild/LOAD_SUCCESS";
const LOAD_FAIL = "designbuild/LOAD_FAIL";

const LOAD_WARRANTY = "staticPage/LOAD_WARRANTY";
const LOAD_WARRANTY_SUCCESS = "staticPage/LOAD_WARRANTY_SUCCESS";
const LOAD_WARRANTY_FAIL = "staticPage/LOAD_WARRANTY_FAIL";

const LOAD_WARRANTY_CAT = "staticPage/LOAD_WARRANTY_CAT";
const LOAD_WARRANTY_CAT_SUCCESS = "staticPage/LOAD_WARRANTY_CAT_SUCCESS";
const LOAD_WARRANTY_CAT_FAIL = "staticPage/LOAD_WARRANTY_CAT_FAIL";

const LOAD_EXCHANGE_OFFER = "staticPage/LOAD_EXCHANGE_OFFER";
const LOAD_EXCHANGE_OFFER_SUCCESS = "staticPage/LOAD_EXCHANGE_OFFER_SUCCESS";
const LOAD_EXCHANGE_OFFER_FAIL = "staticPage/LOAD_EXCHANGE_OFFER_FAIL";

const initialState = {
  loaded: false,
  data: [],
  warranty: "",
  exchangeOffer: "",
  warrantyCat: ""
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
    case LOAD_WARRANTY:
      return {
        ...state,
        loading: true
      };
    case LOAD_WARRANTY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        warranty: action.result
      };
    case LOAD_WARRANTY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_WARRANTY_CAT:
      return {
        ...state,
        loading: true
      };
    case LOAD_WARRANTY_CAT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        warrantyCat: action.result
      };
    case LOAD_WARRANTY_CAT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_EXCHANGE_OFFER:
      return {
        ...state,
        loading: true
      };
    case LOAD_EXCHANGE_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        exchangeOffer: action.result
      };
    case LOAD_EXCHANGE_OFFER_FAIL:
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

export const loadDesignBuildData = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(DESIGN_BUILD)
});

export const loadWarranty = () => ({
  types: [LOAD_WARRANTY, LOAD_WARRANTY_SUCCESS, LOAD_WARRANTY_FAIL],
  promise: ({ client }) => client.get(WARRANTY)
});

export const loadWarrantyCat = key => ({
  types: [LOAD_WARRANTY_CAT, LOAD_WARRANTY_CAT_SUCCESS, LOAD_WARRANTY_CAT_FAIL],
  promise: ({ client }) => client.get(`tesla/static/landingpage/${key}`)
});

export const loadExchangeOffer = () => ({
  types: [
    LOAD_EXCHANGE_OFFER,
    LOAD_EXCHANGE_OFFER_SUCCESS,
    LOAD_EXCHANGE_OFFER_FAIL
  ],
  promise: ({ client }) => client.get(EXCHANGE_OFFER)
});
