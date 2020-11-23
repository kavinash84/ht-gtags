import { SESSION as SESSION_API } from 'helpers/apiUrls';
import { PINCODE } from 'helpers/Constants';

const LOAD = 'app/LOAD';
const LOAD_SUCCESS = 'app/LOAD_SUCCESS';
const LOAD_FAIL = 'app/LOAD_FAIL';

const SET_CITY = 'app/SET_CITY';
const SET_ORDER_ID = 'app/SET_ORDER_ID';
const SET_WALLET_NAME = 'app/SET_WALLET';
const initialState = {
  loaded: false,
  sessionId: '',
  city: '',
  orderId: '',
  walletName: ''
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
    case SET_WALLET_NAME:
      return {
        ...state,
        walletName: action.name
      };
    case SET_ORDER_ID:
      return {
        ...state,
        orderId: action.id,
        customerId: action.customerId
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

export const setWalletName = name => ({
  type: SET_WALLET_NAME,
  name
});

export const setOrderId = (id, customerId) => ({
  type: SET_ORDER_ID,
  id,
  customerId
});
