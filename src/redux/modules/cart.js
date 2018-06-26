import { ADDTOCART as ADDTOCART_API } from 'helpers/apiUrls';

const LOAD_CART = 'cart/LOAD_CART';
const LOAD_CART_SUCCESS = 'cart/LOAD_CART_SUCCESS';
const LOAD_CART_FAIL = 'cart/LOAD_CART_FAIL';
const ADD_TO_CART = 'cart/ADD_TO_CART';
const ADD_TO_CART_SUCCESS = 'cart/ADD_TO_CART_SUCCESS';
const ADD_TO_CART_FAIL = 'cart/ADD_TO_CART_FAIL';
const UPDATE_CART = 'cart/UPDATE_CART';
const UPDATE_CART_SUCCESS = 'cart/UPDATE_CART_SUCCESS';
const UPDATE_CART_FAIL = 'cart/UPDATE_CART_FAIL';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const REMOVE_FROM_CART_SUCCESS = 'cart/REMOVE_FROM_CART_SUCCESS';
const REMOVE_FROM_CART_FAIL = 'cart/REMOVE_FROM_CART_FAIL';

const initialState = {
  data: [],
  summary: {},
  loaded: false,
  cartLoaded: false,
  cartUpdated: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CART:
      return {
        cartLoading: true
      };
    case LOAD_CART_SUCCESS:
      return {
        data: action.result && 'cart' in action.result ? action.result.cart : [],
        summary: action.result && 'summary' in action.result ? action.result.summary : {},
        cartLoading: false,
        cartLoaded: true
      };
    case LOAD_CART_FAIL:
      return {
        cartLoading: false,
        cartLoaded: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartLoading: true
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.result && 'cart' in action.result ? action.result.cart.cart : [],
        summary: action.result && 'cart' in action.result ? action.result.cart.summary : {}
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        loaded: false
      };
    case UPDATE_CART:
      return {
        ...state,
        cartUpdating: true
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: true,
        data: action.result && 'cart' in action.result ? action.result.cart.cart : [],
        summary: action.result && 'cart' in action.result ? action.result.cart.summary : {}
      };
    case UPDATE_CART_FAIL:
      return {
        ...state,
        cartUpdating: false,
        loaded: false
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartLoading: true
      };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cartLoading: false,
        cartLoaded: true,
        data: action.result && 'cart' in action.result ? action.result.cart.cart : [],
        summary: action.result && 'cart' in action.result ? action.result.cart.summary : {}
      };
    case REMOVE_FROM_CART_FAIL:
      return {
        ...state,
        cartLoaded: false
      };
    default:
      return state;
  }
}

export const isLoaded = globalState => globalState.category && globalState.cart.cartLoaded;

export const loadCart = (session, pincode) => ({
  types: [LOAD_CART, LOAD_CART_SUCCESS, LOAD_CART_FAIL],
  promise: ({ client }) => client.get(`${ADDTOCART_API}/${session}/${pincode}`)
});

export const addToCart = (sku, simpleSku, session, pincode) => ({
  types: [ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        configurable_sku: sku,
        simple_sku: simpleSku,
        session_id: session,
        pincode,
        qty: 1
      };
      const response = await client.post(ADDTOCART_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const updateCart = (sku, simpleSku, session, pincode, qty) => ({
  types: [UPDATE_CART, UPDATE_CART_SUCCESS, UPDATE_CART_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        configurable_sku: sku,
        simple_sku: simpleSku,
        session_id: session,
        pincode,
        qty
      };
      const response = await client.post(ADDTOCART_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const removeFromCart = (cartId, session, pincode) => ({
  types: [REMOVE_FROM_CART, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.delete(`${ADDTOCART_API}/${cartId}/${session}/${pincode}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
