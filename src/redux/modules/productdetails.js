const LOAD_PRODUCT_DESCRIPTION = 'productdetails/LOAD_PRODUCT_DESCRIPTION';
const LOAD_PRODUCT_DESCRIPTION_SUCCESS = 'productdetails/LOAD_PRODUCT_DESCRIPTION_SUCCESS';
const LOAD_PRODUCT_DESCRIPTION_FAIL = 'productdetails/LOAD_PRODUCT_DESCRIPTION_FAIL';

const initialState = {
  productDescription: {},
  currentsku: ''
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
        productDescription: action.result
      };
    case LOAD_PRODUCT_DESCRIPTION_FAIL:
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

export const loadProductDescription = (sku, pincode) => ({
  types: [LOAD_PRODUCT_DESCRIPTION, LOAD_PRODUCT_DESCRIPTION_SUCCESS, LOAD_PRODUCT_DESCRIPTION_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`tesla/product/${sku}/${pincode}`);
      response.sku = sku;
      return response;
    } catch (error) {
      return error;
    }
  }
});
