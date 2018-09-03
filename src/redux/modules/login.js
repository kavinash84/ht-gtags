import cookie from 'js-cookie';
import { LOGIN as LOGIN_API, GOOGLE_LOGIN as GOOGLE_LOGIN_API, LOGOUT as LOGOUT_API } from 'helpers/apiUrls';
import { clientId, clientSecret } from 'helpers/Constants';

const LOGIN = 'login/LOGIN';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAIL = 'login/LOGIN_FAIL';
const LOGIN_AFTER_SIGNUP = 'login/LOGIN_AFTER_SIGNUP';
const LOGOUT = 'login/LOGOUT';
const LOGOUT_SUCCESS = 'login/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'login/LOGOUT_FAIL';
const CLEAR_LOGIN_STATE = 'login/CLEAR_LOGIN_STATE';

const initialState = {
  loaded: false,
  isLoggedIn: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        isLoggedIn: true,
        loaded: true,
        accessToken: action.result.access_token,
        refreshToken: action.result.refresh_token,
        meta: action.result.meta,
        loginError: ''
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    case LOGIN_AFTER_SIGNUP:
      return {
        ...state,
        loggingIn: false,
        isLoggedIn: true,
        loaded: true,
        accessToken: action.data.access_token,
        refreshToken: action.data.refresh_token,
        meta: action.data.meta,
        loginError: ''
      };
    case LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        isLoggedIn: false,
        accessToken: null,
        refreshToken: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case CLEAR_LOGIN_STATE:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

const setToken = ({ client }) => response => {
  if (response.access_token === null) {
    cookie.remove('Authorization');
    client.setJwtToken(null);
    return;
  }
  /* setting cookie for server call */
  cookie.set('Authorization', `Bearer ${response.access_token}`);
  client.setJwtToken(response.access_token);
  if (response && response.meta) {
    const [xId] = Object.keys(response.meta).filter(key => key !== 'customerId');
    console.log(xId);
    client.setCustomerInfo('customerId', response.meta.customerId);
    client.setXId(xId, response.meta[xId]);
  }
};

export const isLoaded = globalState => globalState.login && globalState.login.loaded;

export const login = data => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const postData = `username=${data.email}&password=${
        data.password
      }&grant_type=password&client_id=${clientId}&client_secret=${clientSecret}`;
      const response = await client.post(LOGIN_API, postData);
      setToken({ client })(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const googleLogin = (token, session) => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        token,
        client_secret: clientSecret,
        client_id: clientId,
        grant_type: 'password',
        session_id: session
      };
      const response = await client.post(GOOGLE_LOGIN_API, postData);
      setToken({ client })(response);
      return response;
    } catch (error) {
      return error;
    }
  }
});

export const loginUserAfterSignUp = data => ({
  type: LOGIN_AFTER_SIGNUP,
  data
});

export const logout = () => ({
  types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
  promise: async ({ client }) => {
    try {
      await client.put(LOGOUT_API);
      await setToken({ client })({ access_token: null });
    } catch (err) {
      throw err;
    }
  }
});

export const clearLoginState = () => ({
  type: CLEAR_LOGIN_STATE
});
