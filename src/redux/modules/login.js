import cookie from 'js-cookie';
import { LOGIN as LOGIN_API } from 'helpers/apiUrls';
import { clientId, clientSecret } from 'helpers/Constants';

const LOGIN = 'login/LOGIN';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAIL = 'login/LOGIN_FAIL';
const LOGIN_AFTER_SIGNUP = 'login/LOGIN_AFTER_SIGNUP';
const LOGOUT = 'login/LOGOUT';
const LOGOUT_SUCCESS = 'login/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'login/LOGOUT_FAIL';

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
        accessToken: null,
        refreshToken: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

const setToken = ({ client }) => response => {
  /* setting cookie for server call */
  cookie.set('Authorization', `Bearer ${response.access_token}`);
  client.setJwtToken(response.access_token);
};

export function isLoaded(globalState) {
  return globalState.login && globalState.login.loaded;
}

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

export const loginUserAfterSignUp = data => ({
  type: LOGIN_AFTER_SIGNUP,
  data
});

// export function logout() {
//   return {
//     types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
//     promise: async ({ client, app, restApp }) => {
//       await app.logout();
//       setToken({ client, app, restApp })({ accessToken: null });
//     }
//   };
// }
