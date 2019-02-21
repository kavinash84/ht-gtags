import { COMBINED_BUY as COMBINED_BUY_API } from 'helpers/apiUrls';

const GET_COMBINED_BUY = 'combinedbuy/GET_COMBINED_BUY';
const GET_COMBINED_BUY_SUCCESS = 'combinedbuy/GET_COMBINED_BUY_SUCCESS';
const GET_COMBINED_BUY_FAIL = 'combinedbuy/GET_COMBINED_BUY_FAIL';

const initialState = {
  results: [],
  loading: false,
  loaded: false,
  error: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_COMBINED_BUY:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    case GET_COMBINED_BUY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        results: action.result
      };
    case GET_COMBINED_BUY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        results: [],
        error: action.error
      };
    default:
      return state;
  }
}

export const getCombinedBuy = (simpleSku, pincode) => ({
  types: [GET_COMBINED_BUY, GET_COMBINED_BUY_SUCCESS, GET_COMBINED_BUY_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${COMBINED_BUY_API}/${simpleSku}/${pincode}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
