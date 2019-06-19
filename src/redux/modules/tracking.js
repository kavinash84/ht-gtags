import { ORDERS_TRACKING_API } from 'helpers/apiUrls';

const LOAD = 'tracking/LOAD';
const LOAD_SUCCESS = 'tracking/LOAD_SUCCESS';
const LOAD_FAIL = 'tracking/LOAD_FAIL';
const CLOSE_MODAL = 'tracking/CLOSE_MODAL';

const initialState = {
  loading: false,
  loaded: false,
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
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
        error: action.error
      };
    case CLOSE_MODAL:
      return {
        loaded: false,
        data: {}
      };
    default:
      return state;
  }
}

export const loadOrdersTracking = orderNumber => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${ORDERS_TRACKING_API}?order=${orderNumber}`)
});
export const closeModal = () => ({
  type: CLOSE_MODAL,
  loaded: false
});
