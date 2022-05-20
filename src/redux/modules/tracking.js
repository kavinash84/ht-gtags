import { ORDERS_TRACKING_API } from "helpers/apiUrls";

const LOAD = "tracking/LOAD";
const LOAD_SUCCESS = "tracking/LOAD_SUCCESS";
const LOAD_FAIL = "tracking/LOAD_FAIL";
const CLOSE_MODAL = "tracking/CLOSE_MODAL";
const SET_CURRENT_ORDER = "tracking/SET_CURRENT_ORDER";

const initialState = {
  trackingLoading: false,
  trackingLoaded: false,
  currentOrder: "",
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        trackingLoading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        trackingLoading: false,
        trackingLoaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        error: action.error
      };
    case CLOSE_MODAL:
      return {
        ...state,
        trackingLoaded: false,
        trackingLoading: false,
        data: {}
      };
    case SET_CURRENT_ORDER:
      return {
        ...state,
        trackingLoading: true,
        currentOrder: action.orderNumber
      };
    default:
      return state;
  }
}

export const loadOrdersTracking = orderNumber => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const response = await client.get(
        `${ORDERS_TRACKING_API}?order=${orderNumber}`
      );
      return { ...response, orderrNumber: orderNumber };
    } catch (error) {
      throw error;
    }
  }
});
export const closeModal = () => ({
  type: CLOSE_MODAL,
  loaded: false
});
export const setCurrentOrder = orderNumber => ({
  type: SET_CURRENT_ORDER,
  orderNumber
});
