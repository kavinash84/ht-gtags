import { ADDTOCART as ADDTOCART_API } from 'helpers/apiUrls';

const LOAD_CART = 'cart/LOAD_CART';
const LOAD_CART_SUCCESS = 'cart/LOAD_CART_SUCCESS';
const LOAD_CART_FAIL = 'cart/LOAD_CART_FAIL';
const ADD_TO_CART = 'cart/ADD_TO_CART';
const ADD_TO_CART_SUCCESS = 'cart/ADD_TO_CART_SUCCESS';
const ADD_TO_CART_FAIL = 'cart/ADD_TO_CART_FAIL';

const initialState = {
  data: [],
  loaded: false,
  cartLoaded: false
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
        loading: true
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: [...state.data, action.result]
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        loaded: false
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

export const addToCart = (sku, simpleSku, session) => ({
  types: [ADD_TO_CART, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        configurable_sku: sku,
        simple_sku: simpleSku,
        session_id: session,
        qty: 1
      };
      const response = await client.post(ADDTOCART_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
