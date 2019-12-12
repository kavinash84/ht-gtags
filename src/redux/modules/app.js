import { SESSION as SESSION_API } from 'helpers/apiUrls';
import { PINCODE } from 'helpers/Constants';

const LOAD = 'app/LOAD';
const LOAD_SUCCESS = 'app/LOAD_SUCCESS';
const LOAD_FAIL = 'app/LOAD_FAIL';

const SET_CITY = 'app/SET_CITY';
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
    case SET_CITY:
      return {
        ...state,
        city: action.query.city
      };
    default:
      return state;
  }
}

const setAppAuth = ({ client }) => async response => {
  const { csrfToken, session } = response;
  await client.setCSRFToken(csrfToken);
  await client.setSessionId(session);
};

export const isLoaded = globalState => globalState.app && globalState.app.loaded;

export const generateSession = (pincode = PINCODE) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${SESSION_API}/${pincode}`);
      await setAppAuth({ client })(response);
      return response;
    } catch (error) {
      console.log(error);
      console.log('Unable to generate session');
      return error;
    }
  }
});

export const setCity = query => ({
  type: SET_CITY,
  query
});
