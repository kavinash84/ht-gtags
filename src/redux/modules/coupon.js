import { COUPON as COUPON_API } from 'helpers/apiUrls';

const LOAD_COUPONS = 'coupon/LOAD_COUPONS';
const LOAD_COUPONS_SUCCESS = 'coupon/LOAD_COUPONS_SUCCESS';
const LOAD_COUPONS_FAIL = 'coupon/LOAD_COUPONS_FAIL';

const APPLY_COUPON = 'coupon/APPLY_COUPON';
const APPLY_COUPON_SUCCESS = 'coupon/APPLY_COUPON_SUCCESS';
const APPLY_COUPON_FAIL = 'coupon/APPLY_COUPON_FAIL';

const REMOVE_COUPON = 'coupon/REMOVE_COUPON';
const REMOVE_COUPON_SUCCESS = 'coupon/REMOVE_COUPON_SUCCESS';
const REMOVE_COUPON_FAIL = 'coupon/REMOVE_COUPON_FAIL';

const initialState = {
  loaded: false,
  loading: false,
  data: {},
  error: false,
  errorMessage: {},
  applied: false,
  appliedCoupon: '',
  summary: {},
  coupons: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_COUPONS:
      return {
        ...state,
        loading: true,
        error: false
      };
    case LOAD_COUPONS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        coupons: action.result
      };
    case LOAD_COUPONS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        errorMessage: action.error
      };
    case APPLY_COUPON:
      return {
        ...state,
        loading: true,
        error: false,
        applied: false,
        appliedCoupon: ''
      };
    case APPLY_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        data: action.result,
        summary: [...state.summary, action.result.summary],
        applied: true,
        appliedCoupon: action.result.summary.coupon
      };
    case APPLY_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        applied: false,
        errorMessage: action.error
      };
    case REMOVE_COUPON:
      return {
        ...state,
        loading: true,
        error: false
      };
    case REMOVE_COUPON_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        data: action.result,
        summary: [...state.summary, action.result.summary],
        applied: false,
        appliedCoupon: ''
      };
    case REMOVE_COUPON_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        applied: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

export const applyCoupon = (coupon, sessionId, pincode) => ({
  types: [APPLY_COUPON, APPLY_COUPON_SUCCESS, APPLY_COUPON_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = { coupon, session_id: sessionId, pincode };
      return await client.post(COUPON_API, postData);
    } catch (error) {
      throw error;
    }
  }
});

export const removeCoupon = (coupon, sessionId, pincode) => ({
  types: [REMOVE_COUPON, REMOVE_COUPON_SUCCESS, REMOVE_COUPON_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = { coupon, session_id: sessionId, pincode };
      return await client.delete(COUPON_API, { data: postData });
    } catch (error) {
      throw error;
    }
  }
});

// export const loadCoupons = (sku, pincode = '110004') => ({
//   types: [LOAD_COLOR_PRODUCTS, LOAD_COLOR_PRODUCTS_SUCCESS, LOAD_COLOR_PRODUCTS_FAIL],
//   promise: ({ client }) => client.get(`tesla/product/color-products/${sku}/${pincode}`)
// });