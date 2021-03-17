const LOAD_COLOR_PRODUCTS = 'colorproducts/LOAD_COLOR_PRODUCTS';
const LOAD_COLOR_PRODUCTS_SUCCESS = 'colorproducts/LOAD_COLOR_PRODUCTS_SUCCESS';
const LOAD_COLOR_PRODUCTS_FAIL = 'colorproducts/LOAD_COLOR_PRODUCTS_FAIL';

const initialState = {
  list: [],
  error: false,
  errorMessage: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_COLOR_PRODUCTS:
      return {
        ...state,
        list: [],
        loading: true,
        error: false
      };
    case LOAD_COLOR_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false,
        list: action.result
      };
    case LOAD_COLOR_PRODUCTS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: true,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

export const loadColorProducts = (sku, pincode) => ({
  types: [LOAD_COLOR_PRODUCTS, LOAD_COLOR_PRODUCTS_SUCCESS, LOAD_COLOR_PRODUCTS_FAIL],
  promise: ({ client }) => client.get(`tesla/product/color-products/${sku}/${pincode}`)
});
