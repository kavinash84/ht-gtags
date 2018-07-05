import { TRACK_ORDER as TRACK_ORDER_API } from 'helpers/apiUrls';

const LOAD = 'trackorder/LOAD';
const LOAD_SUCCESS = 'trackorder/LOAD_SUCCESS';
const LOAD_FAIL = 'trackorder/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  data: {},
  error: false,
  errorMessage: ''
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
        errorMessage: action.result || 'Some Error Occured, Try Again.'
      };
    default:
      return state;
  }
}

export const trackOrder = orderid => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${TRACK_ORDER_API}/${orderid}`)
});
