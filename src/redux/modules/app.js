import { SESSION as SESSION_API } from "helpers/apiUrls";
import { PINCODE } from "helpers/Constants";

const LOAD = "app/LOAD";
const LOAD_SUCCESS = "app/LOAD_SUCCESS";
const LOAD_FAIL = "app/LOAD_FAIL";

const SET_CITY = "app/SET_CITY";
const SET_ORDER_ID = "app/SET_ORDER_ID";
const SET_WALLET_NAME = "app/SET_WALLET";
const PAYMENT_LOADED = "app/PAYMENT_LOADED";
const EMI_PAYMENT_TYPE = "app/EMI_PAYMENT_TYPE";
const initialState = {
  loaded: false,
  sessionId: "",
  city: "",
  orderId: "",
  walletName: "",
  walletType: {},
  paymentLoaded: false,
  emiPaymentType: ""
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
        city:
          action.result.pincode_details && action.result.pincode_details[0].city
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
        customerId: action.customerId,
        walletType: action.walletType
      };
    case PAYMENT_LOADED:
      return {
        ...state,
        paymentLoaded: action.status
      };
    case EMI_PAYMENT_TYPE:
      return {
        ...state,
        emiPaymentType: action.name
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

export const isLoaded = globalState =>
  globalState.app && globalState.app.loaded;

export const generateSession = (pincode = PINCODE) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      const response = { session: await generateSessionId(26) };
      await setAppAuth({ client })(response);
      return response;
    } catch (error) {
      // console.log(error);
      // console.log('Unable to generate session');
      return error;
    }
  }
});

export const generateSessionId = async length => {
  const randomChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
};

export const setCity = query => ({
  type: SET_CITY,
  query
});

export const setWalletName = name => ({
  type: SET_WALLET_NAME,
  name
});

export const setOrderId = (id, customerId, walletType) => ({
  type: SET_ORDER_ID,
  id,
  customerId,
  walletType
});

export const paymentLoaded = status => ({
  type: PAYMENT_LOADED,
  status
});

export const setEmiPaymentType = name => ({
  type: EMI_PAYMENT_TYPE,
  name
});
