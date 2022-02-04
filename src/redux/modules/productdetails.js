import { PRODUCT_DETAIL, PRODUCT_DELIVERY_DETAILS, BOUGHT_TOGETHER } from 'helpers/apiUrls';

const LOAD_PRODUCT_DESCRIPTION = 'productdetails/LOAD_PRODUCT_DESCRIPTION';
const LOAD_PRODUCT_DESCRIPTION_SUCCESS = 'productdetails/LOAD_PRODUCT_DESCRIPTION_SUCCESS';
const LOAD_PRODUCT_DESCRIPTION_FAIL = 'productdetails/LOAD_PRODUCT_DESCRIPTION_FAIL';

const GET_DELIVERY_DETAILS = 'productdetails/GET_DELIVERY_DETAILS';
const GET_DELIVERY_DETAILS_SUCCESS = 'productdetails/GET_DELIVERY_DETAILS_SUCCESS';
const GET_DELIVERY_DETAILS_FAIL = 'productdetails/GET_DELIVERY_DETAILS_FAIL';

const LOAD_BOUGHT_TOGETHER = 'productdetails/LOAD_BOUGHT_TOGETHER';
const LOAD_BOUGHT_TOGETHER_SUCCESS = 'productdetails/LOAD_BOUGHT_TOGETHER_FAIL';
const LOAD_BOUGHT_TOGETHER_FAIL = 'productdetails/LOAD_BOUGHT_TOGETHER_FAIL';
const SET_PROUDUCT_POSITION = 'products/SET_PROUDUCT_POSITION';

const PRODUCT_DETAILS_TRACK = 'productdetails/PRODUCT_DETAILS_TRACK';

const initialState = {
  productDescription: {},
  currentsku: '',
  position: null,
  simpleSku: '',
  loaded: false,
  deliveryDateLoaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PRODUCT_DESCRIPTION:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case LOAD_PRODUCT_DESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        currentsku: action.result.sku,
        productDescription: action.result,
        simpleSku: !action.result.error_message && Object.keys(action.result.simples)[0],
        deliveryDetails: null
      };
    case LOAD_PRODUCT_DESCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_BOUGHT_TOGETHER:
      return {
        ...state,
        loading: true,
        loaded: false
      }
    case LOAD_BOUGHT_TOGETHER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        boughtTogether: action.result
      }
    case LOAD_BOUGHT_TOGETHER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      }
    case GET_DELIVERY_DETAILS:
      return {
        ...state,
        deliveryDateLoading: true
      };
    case GET_DELIVERY_DETAILS_SUCCESS:
      return {
        ...state,
        deliveryDateLoading: false,
        deliveryDateLoaded: true,
        deliveryDetails: action.result
      };
    case GET_DELIVERY_DETAILS_FAIL:
      return {
        ...state,
        deliveryDateLoading: false,
        deliveryDateLoaded: false,
        error: action.error
      };
    case SET_PROUDUCT_POSITION:
      return {
        ...state,
        position: action.payLoad
      };
    default:
      return state;
  }
}

/* need to dispatch an action to set recently veiwed products */
export const loadProductDescription = (sku, pincode) => ({
  types: [LOAD_PRODUCT_DESCRIPTION, LOAD_PRODUCT_DESCRIPTION_SUCCESS, LOAD_PRODUCT_DESCRIPTION_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${PRODUCT_DETAIL}/${sku}/${pincode}`);
      response.sku = sku;
      return response;
    } catch (error) {
      throw error;
    }
  },
  sku
});

export const getDelieveryInfo = (simpleSku, pincode) => ({
  types: [GET_DELIVERY_DETAILS, GET_DELIVERY_DETAILS_SUCCESS, GET_DELIVERY_DETAILS_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${PRODUCT_DELIVERY_DETAILS}/${simpleSku}/${pincode}`);
      return response;
    } catch (error) {
      return error;
    }
  }
});
export const loadBoughtTogether = (sku) => ({
  types: [LOAD_BOUGHT_TOGETHER, LOAD_BOUGHT_TOGETHER_SUCCESS, LOAD_BOUGHT_TOGETHER_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        sku: sku
      };
      const response = await client.post(BOUGHT_TOGETHER, postData);
      return response;
    } catch (error) {
      return error;
    }
  },
  sku
});
export const setProductPosition = payLoad => ({
  type: SET_PROUDUCT_POSITION,
  payLoad
});

export const gaTrack = () => ({
  type: PRODUCT_DETAILS_TRACK
});
