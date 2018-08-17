import { PAYMENT_STATUS as PAYMENT_STATUS_API } from 'helpers/apiUrls';

const LOAD = 'paymentstatus/LOAD';
const LOAD_SUCCESS = 'paymentstatus/LOAD_SUCCESS';
const LOAD_FAIL = 'paymentstatus/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  data: null
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
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.paymentstatus && globalState.paymentstatus.loaded;
}

export const load = sessionId => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${PAYMENT_STATUS_API}/${sessionId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
