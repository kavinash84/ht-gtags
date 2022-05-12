import { ORDERS_STATUS_API } from "helpers/apiUrls";

const LOAD = "trackorder/LOAD";
const LOAD_SUCCESS = "trackorder/LOAD_SUCCESS";
const LOAD_FAIL = "trackorder/LOAD_FAIL";
const CLOSE_STATUS_MODAL = "tracking/CLOSE_MODAL";

const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false,
  errorMessage: ""
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
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
        error: true,
        errorMessage: action.error.error_message
      };
    case CLOSE_STATUS_MODAL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: {},
        error: false,
        errorMessage: ""
      };
    default:
      return state;
  }
}
export const closeStatusModal = () => ({
  type: CLOSE_STATUS_MODAL,
  loaded: false
});
export const trackOrder = orderid => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const response = await client.get(
        `${ORDERS_STATUS_API}?order=${orderid}`
      );
      return { ...response, orderrNumber: orderid };
    } catch (error) {
      throw error;
    }
  }
});
