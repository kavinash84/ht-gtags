import { ADDTOCART as ADDTOCART_API, SYNCCART as SYNCCART_API } from 'helpers/apiUrls';

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
const SYNCING_CART = 'cart/SYNCING_CART';
const SYNCING_CART_SUCCESS = 'cart/SYNCING_CART_SUCCESS';
const SYNCING_CART_FAIL = 'cart/SYNCING_CART_FAIL';

const initialState = {
  data: [],
  summary: {},
  loaded: false,
  addedToCart: false,
  cartUpdated: false,
  cartSynced: false,
  key: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CART:
      return {
        loading: true
      };
    case LOAD_CART_SUCCESS:
      return {
        data: action.result && 'cart' in action.result ? action.result.cart : [],
        summary: action.result && 'summary' in action.result ? action.result.summary : {},
        loading: false,
        loaded: true
      };
    case LOAD_CART_FAIL:
      return {
        loading: false,
        loaded: false
      };
    case ADD_TO_CART:
      return {
        ...state,
        key: action.payLoad,
        addingToCart: true,
        addedToCart: false
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addingToCart: false,
        addedToCart: true,
        data: action.result && 'cart' in action.result ? action.result.cart.cart : [],
        summary: action.result && 'cart' in action.result ? action.result.cart.summary : {}
      };
    case ADD_TO_CART_FAIL:
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
        key: action.payLoad,
        error: null
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
        cartUpdated: false,
        error: action.error
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        key: action.payLoad,
        cartUpdating: true,
        cartUpdated: false,
        error: null
      };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        cartUpdating: false,
        cartUpdated: true,
        data: action.result && 'cart' in action.result ? action.result.cart.cart : [],
        summary: action.result && 'cart' in action.result ? action.result.cart.summary : {}
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
        data: action.result && 'cart' in action.result ? action.result.cart : [],
        summary: action.result && 'summary' in action.result ? action.result.summary : {}
      };
    case SYNCING_CART_FAIL:
      return {
        ...state,
        cartSyncing: false,
        cartSynced: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const isLoaded = globalState => globalState.cart && globalState.cart.loaded;

export const loadCart = (session, pincode) => ({
  types: [LOAD_CART, LOAD_CART_SUCCESS, LOAD_CART_FAIL],
  promise: ({ client }) => client.get(`${ADDTOCART_API}/${session}/${pincode}`)
});

export const addToCart = (key, sku, simpleSku, session, pincode) => ({
  type: 'ADD_TO_CART',
  payLoad: key,
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

export const updateCart = (cartId, sku, simpleSku, session, pincode, qty) => ({
  type: 'UPDATE_CART',
  payLoad: cartId,
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
      const response = await client.put(ADDTOCART_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const removeFromCart = (cartId, session, pincode) => ({
  type: 'REMOVE_FROM_CART',
  payLoad: cartId,
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

export const synCart = (sessionId, pincode) => ({
  types: [SYNCING_CART, SYNCING_CART_SUCCESS, SYNCING_CART_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.put(`${SYNCCART_API}/${sessionId}/${pincode}`, {});
      return response;
    } catch (error) {
      throw error;
    }
  }
});
