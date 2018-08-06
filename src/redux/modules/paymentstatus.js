import { PAYMENT_STATUS as PAYMENT_STATUS_API } from 'helpers/apiUrls';

const LOAD = 'profile/LOAD';
const LOAD_SUCCESS = 'profile/LOAD_SUCCESS';
const LOAD_FAIL = 'profile/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  data: {},
  profileUpdated: false
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
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.paymentstatus && globalState.paymentstatus.loaded;
}

export const load = () => (dispatch, store) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      const { app: { sessionId } } = store.getState();
      const response = await client.get(`${PAYMENT_STATUS_API}/${sessionId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
