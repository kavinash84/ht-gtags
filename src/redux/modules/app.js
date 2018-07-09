import { SESSION as SESSION_API } from 'helpers/apiUrls';

const LOAD = 'app/LOAD';
const LOAD_SUCCESS = 'app/LOAD_SUCCESS';
const LOAD_FAIL = 'app/LOAD_FAIL';

const initialState = {
  loaded: false,
  sessionId: '',
  city: ''
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
        sessionId: action.result.session,
        csrfToken: action.result.csrfToken,
        city: action.result.pincode_details && action.result.pincode_details[0].city
      };
    case LOAD_FAIL:
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

export const isLoaded = globalState => globalState.app && globalState.app.loaded;

export const generateSession = pincode => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${SESSION_API}/${pincode}`);
      return response;
    } catch (error) {
      console.log('Unable to generate session');
      return error;
    }
  }
});
