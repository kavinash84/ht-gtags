import {
  ADDTOCARTCOMBINED as ADDTOCARTCOMBINED_API,
  ADDTOCART as ADDTOCART_API,
  SYNCCART as SYNCCART_API,
  CHECKCART as CHECKCART_API,
  ADD_GIFT_WRAP as ADD_GIFT_WRAP_API,
  GET_CONTACT
} from "helpers/apiUrls";
import { formatToArray, formatCartSummary } from "helpers/cartFormateres";
import { PINCODE } from "../../helpers/Constants";

const LOAD_CART = "cart/LOAD_CART";
const LOAD_CART_SUCCESS = "cart/LOAD_CART_SUCCESS";
const LOAD_CART_FAIL = "cart/LOAD_CART_FAIL";
const ADD_TO_CART = "cart/ADD_TO_CART";
const ADD_TO_CART_SUCCESS = "cart/ADD_TO_CART_SUCCESS";
const ADD_TO_CART_FAIL = "cart/ADD_TO_CART_FAIL";
const ADD_TO_CART_COMBINED = "cart/ADD_TO_CART_COMBINED";
const ADD_TO_CART_COMBINED_SUCCESS = "cart/ADD_TO_CART_COMBINED_SUCCESS";
const ADD_TO_CART_COMBINED_FAIL = "cart/ADD_TO_CART_COMBINED_FAIL";
const UPDATE_CART_AFTERCOUPON = "cart/UPDATE_CART_AFTERCOUPON";
const UPDATE_CART = "cart/UPDATE_CART";
const UPDATE_CART_SUCCESS = "cart/UPDATE_CART_SUCCESS";
const UPDATE_CART_FAIL = "cart/UPDATE_CART_FAIL";
const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
const REMOVE_FROM_CART_SUCCESS = "cart/REMOVE_FROM_CART_SUCCESS";
const REMOVE_FROM_CART_FAIL = "cart/REMOVE_FROM_CART_FAIL";
const SYNCING_CART = "cart/SYNCING_CART";
const SYNCING_CART_SUCCESS = "cart/SYNCING_CART_SUCCESS";
const SYNCING_CART_FAIL = "cart/SYNCING_CART_FAIL";
const CHECKCART = "cart/CHECKCART";
const CHECKCART_SUCCESS = "cart/CHECKCART_SUCCESS";
const CHECKCART_FAIL = "cart/CHECKCART_FAIL";
const RESET_CART_CHECK = "cart/RESET_CART_CHECK";
const SET_CURRENT_KEY = "cart/SET_CURRENT_KEY";
const SET_QUANTITY_FLAG = "cart/SET_QUANTITY_FLAG";
const CHECK_GIFTWRAP = "cart/CHECK_GIFTWRAP";
const CHECK_GIFTWRAP_SUCCESS = "cart/CHECK_GIFTWRAP_SUCCESS";
const CHECK_GIFTWRAP_FAIL = "cart/CHECK_GIFTWRAP_FAIL";

const LOAD_CART_GIFTWRAP = "cart/LOAD_CART_GIFTWRAP";
const LOAD_CART_GIFTWRAP_SUCCESS = "cart/LOAD_CART_GIFTWRAP_SUCCESS";
const LOAD_CART_GIFTWRAP_FAIL = "cart/LOAD_CART_GIFTWRAP_FAIL";

const UPDATE_CART_SUMMARY_AFTER_COUPON =
  "cart/UPDATE_CART_SUMMARY_AFTER_COUPON";

const LOAD_CART_CONTACT = "cart/LOAD_CART_CONTACT";
const LOAD_CART_CONTACT_SUCCESS = "cart/LOAD_CART_CONTACT_SUCCESS";
const LOAD_CART_CONTACT_FAIL = "cart/LOAD_CART_CONTACT_FAIL";

const CLEAR_CART = "cart/CLEAR_CART";

const WE_VIEW_CART = "cart/WE_VIEW_CART";

const TOGGLE_COUPON_LIST = "cart/TOGGLE_COUPON_LIST";
const HIDE_COUPON_LIST = "cart/HIDE_COUPON_LIST";

const initialState = {
  loading: false,
  initialLoading: false,
  data: [],
  summary: {},
  contact: {},
  packageItems: [],
  currentPackage: "",
  demo_landing_page_url: "",
  loaded: false,
  addedToCart: false,
  cartUpdated: false,
  cartSynced: false,
  checkingCart: false,
  cartChecked: false,
  key: "",
  couponlistToggle: false,
  quantityChange: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CART:
      return {
        ...state,
        loading: true,
        initialLoading: true
      };
    case LOAD_CART_SUCCESS:
      return {
        ...state,
        data:
          action.result && "cartItems" in action.result
            ? formatToArray({
                ...action.result.cartItems,
                ...action.result.packages
              })
            : [],
        summary:
          action.result && "summary" in action.result
            ? formatCartSummary({
                ...action.result.summary,
                cartEmiDetail: action.result.cartEmiDetail
              })
            : {},
        demo_landing_page_url:
          action.result && "demo_landing_page_url" in action.result
            ? action.result.demo_landing_page_url
            : "",
        loading: false,
        loaded: true,
        initialLoading: false,
        couponlistToggle: false
      };
    case LOAD_CART_FAIL:
      return {
        ...state,
        loading: false,
        initialLoading: false,
        loaded: false
      };
    case LOAD_CART_CONTACT:
      return {
        ...state,
        loading: true
      };
    case LOAD_CART_CONTACT_SUCCESS:
      return {
        ...state,
        contact: action.result,
        loading: false,
        loaded: true
      };
    case LOAD_CART_CONTACT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        addingToCart: true,
        addedToCart: false
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addingToCart: false,
        addedToCart: true,
        quantityChange: false,
        couponlistToggle: false,
        data:
          action.result && "cartItems" in action.result
            ? formatToArray({
                ...action.result.cartItems,
                ...action.result.packages
              })
            : [],
        summary:
          action.result && "summary" in action.result
            ? formatCartSummary({
                ...action.result.summary,
                cartEmiDetail: action.result.cartEmiDetail
              })
            : {}
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        addingToCart: false,
        addedToCart: false,
        error: action.error
      };
    case ADD_TO_CART_COMBINED:
      return {
        ...state,
        addingToCart: true,
        addedToCart: false
      };
    case ADD_TO_CART_COMBINED_SUCCESS:
      return {
        ...state,
        addingToCart: false,
        addedToCart: true,
        couponlistToggle: false,
        data:
          action.result && "cartItems" in action.result
            ? formatToArray({
                ...action.result.cartItems,
                ...action.result.packages
              })
            : [],
        summary:
          action.result && "summary" in action.result
            ? formatCartSummary({
                ...action.result.summary,
                cartEmiDetail: action.result.cartEmiDetail
              })
            : {}
      };
    case ADD_TO_CART_COMBINED_FAIL:
      return {
        ...state,
        addingToCart: false,
        addedToCart: false,
        error: action.error
      };
    case UPDATE_CART:
      return {
        ...state,
        cartUpdating: true,
        error: null
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: true,
        quantityChange: false,
        data:
          action.result && "cartItems" in action.result
            ? formatToArray({
                ...action.result.cartItems,
                ...action.result.packages
              })
            : [],
        summary:
          action.result && "summary" in action.result
            ? formatCartSummary({
                ...action.result.summary,
                cartEmiDetail: action.result.cartEmiDetail
              })
            : {},
        couponlistToggle: false
      };
    case UPDATE_CART_FAIL:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: false,
        error: action.error
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartUpdating: true,
        cartUpdated: false,
        error: null
      };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: true,
        data:
          action.result && "cartItems" in action.result
            ? formatToArray({
                ...action.result.cartItems,
                ...action.result.packages
              })
            : [],
        summary:
          action.result && "summary" in action.result
            ? formatCartSummary({
                ...action.result.summary,
                cartEmiDetail: action.result.cartEmiDetail
              })
            : {},
        couponlistToggle: false
      };
    case REMOVE_FROM_CART_FAIL:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: false,
        error: action.error
      };
    case SYNCING_CART:
      return {
        ...state,
        cartSyncing: true
      };
    case SYNCING_CART_SUCCESS:
      return {
        ...state,
        cartSyncing: false,
        cartSynced: true,
        data:
          action.result && "cartItems" in action.result
            ? formatToArray({
                ...action.result.cartItems,
                ...action.result.packages
              })
            : [],
        summary:
          action.result && "summary" in action.result
            ? formatCartSummary({
                ...action.result.summary,
                cartEmiDetail: action.result.cartEmiDetail
              })
            : {}
      };
    case SYNCING_CART_FAIL:
      return {
        ...state,
        cartSyncing: false,
        cartSynced: false,
        error: action.error
      };
    case CHECKCART:
      return {
        ...state,
        checkingCart: true
      };
    case CHECKCART_SUCCESS:
      return {
        ...state,
        checkingCart: false,
        cartCheckData: action.result,
        checkCart: false,
        cartChecked: action.result.success
      };
    case CHECKCART_FAIL:
      return {
        ...state,
        checkingCart: false,
        cartChecked: false
      };
    case CHECK_GIFTWRAP:
      return {
        ...state,
        // loading: true
      };
    case CHECK_GIFTWRAP_SUCCESS:
      return {
        ...state,
        data:
          action.result && "cartItems" in action.result
            ? formatToArray({
                ...action.result.cartItems,
                ...action.result.packages
              })
            : [],
        summary:
          action.result && "summary" in action.result
            ? formatCartSummary({
                ...action.result.summary,
                cartEmiDetail: action.result.cartEmiDetail
              })
            : {}
      };
    case CHECK_GIFTWRAP_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true
      };
    case RESET_CART_CHECK:
      return {
        ...state,
        cartChecked: false
      };
    case UPDATE_CART_SUMMARY_AFTER_COUPON:
      return {
        ...state,
        summary: formatCartSummary({
          ...action.summary,
          cartEmiDetail: action.cartEmiDetail
        })
      };
    case UPDATE_CART_AFTERCOUPON:
      return {
        ...state,
        data:
          action.result && "cart" in action.result
            ? checkForPackages(action.result.cart)
            : [],
        loading: false,
        loaded: true
      };
    case SET_CURRENT_KEY:
      return {
        ...state,
        key: action.payLoad
      };
    case TOGGLE_COUPON_LIST:
      return {
        ...state,
        couponlistToggle: !state.couponlistToggle
      };
    case HIDE_COUPON_LIST:
      return {
        ...state,
        couponlistToggle: false
      };
    case SET_QUANTITY_FLAG:
      return {
        ...state,
        quantityChange: action.value
      };
    case CLEAR_CART:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export const isLoaded = globalState =>
  globalState.cart && globalState.cart.loaded;

const setCurrentKey = key => ({
  type: SET_CURRENT_KEY,
  payLoad: key
});

export const loadCart = (session, pincode) => ({
  types: [LOAD_CART, LOAD_CART_SUCCESS, LOAD_CART_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${ADDTOCART_API}?pincode=${pincode}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const addToCart = (
  key,
  sku,
  simpleSku,
  session,
  pincode,
  configId,
  quantity = 1
) => dispatch => {
  dispatch(setCurrentKey(key));
  return dispatch({
    types: [ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL],
    promise: async ({ client }) => {
      try {
        const postData = {
          configurable_sku: sku,
          simple_sku: simpleSku,
          pincode,
          qty: quantity
        };
        const response = await client.post(ADDTOCART_API, postData);
        return response;
      } catch (error) {
        throw error;
      }
    },
    configId,
    key,
    sku,
    simpleSku,
    pincode
  });
};

export const addToCartCombined = (
  setId,
  skus,
  sessionId,
  pincode,
  configId,
  uniqueSetName
) => dispatch => {
  dispatch(setCurrentKey(setId));
  return dispatch({
    types: [
      ADD_TO_CART_COMBINED,
      ADD_TO_CART_COMBINED_SUCCESS,
      ADD_TO_CART_COMBINED_FAIL
    ],
    promise: async ({ client }) => {
      try {
        const postData = {
          set_id: setId,
          skus,
          session_id: sessionId,
          pincode
        };
        const response = await client.post(ADDTOCARTCOMBINED_API, postData);
        response.uniqueSetName = uniqueSetName;
        return response;
      } catch (error) {
        throw error;
      }
    },
    configId
  });
};

export const updateCart = (
  cartId,
  sku,
  simpleSku,
  session,
  pincode,
  configId,
  qty
) => dispatch => {
  dispatch(setCurrentKey(cartId));
  return dispatch({
    types: [UPDATE_CART, UPDATE_CART_SUCCESS, UPDATE_CART_FAIL],
    promise: async ({ client }) => {
      try {
        const postData = {
          configurable_sku: sku,
          simple_sku: simpleSku,
          pincode,
          qty
        };
        const response = await client.put(ADDTOCART_API, postData);
        response.updateType = qty === 1 ? "add" : "remove";
        return response;
      } catch (error) {
        throw error;
      }
    },
    configId,
    qty
  });
};

export const removeFromCart = (
  cartId,
  session,
  pincode = PINCODE,
  qty = "",
  configId = ""
) => dispatch => {
  dispatch(setCurrentKey(configId));
  return dispatch({
    types: [REMOVE_FROM_CART, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL],
    promise: async ({ client }) => {
      try {
        const response = cartId.hasOwnProperty("packageId")
          ? await client.delete(`${ADDTOCART_API}/delete-package`, {
              data: cartId
            })
          : await client.delete(ADDTOCART_API, {
              data: cartId
            });

        return response;
      } catch (error) {
        throw error;
      }
    },
    qty,
    configId
  });
};

export const synCart = (sessionId, pincode = PINCODE) => ({
  types: [SYNCING_CART, SYNCING_CART_SUCCESS, SYNCING_CART_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.put(SYNCCART_API, {
        pincode: pincode
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const checkCart = sessionId => ({
  types: [CHECKCART, CHECKCART_SUCCESS, CHECKCART_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.post(`${CHECKCART_API}`, {
        session_id: sessionId
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const checkGiftWrap = value => ({
  types: [CHECK_GIFTWRAP, CHECK_GIFTWRAP_SUCCESS, CHECK_GIFTWRAP_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.post(`${ADD_GIFT_WRAP_API}`, {
        isGiftWrapRequired: value
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const updateCartSummary = summary => ({
  type: UPDATE_CART_SUMMARY_AFTER_COUPON,
  summary
});

export const loadCartAfterCouponApplied = result => ({
  type: UPDATE_CART_AFTERCOUPON,
  result
});

export const resetCheck = () => ({
  type: RESET_CART_CHECK
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const WEViewCart = () => ({
  type: WE_VIEW_CART
});

export const toggleCouponList = () => ({
  type: TOGGLE_COUPON_LIST
});
export const hideCouponList = () => ({
  type: HIDE_COUPON_LIST
});
export const setQuantityFlag = value => ({
  type: SET_QUANTITY_FLAG,
  value
});

export const getCartContactDetails = () => ({
  types: [LOAD_CART_CONTACT, LOAD_CART_CONTACT_SUCCESS, LOAD_CART_CONTACT_FAIL],
  promise: ({ client }) => client.get(GET_CONTACT)
});
