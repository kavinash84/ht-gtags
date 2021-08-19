import cookie from 'js-cookie';
import {
  LOGIN as LOGIN_API,
  GOOGLE_LOGIN as GOOGLE_LOGIN_API,
  LOGOUT as LOGOUT_API,
  OTP as OTP_API,
  RESEND_OTP as RESEND_OTP_API,
  SIGNUP_OTP as SIGNUP_OTP_API,
  RESEND_SIGNUP_OTP as RESEND_SIGNUP_OTP_API
} from 'helpers/apiUrls';
import { clientId, clientSecret } from 'helpers/Constants';

const LOGIN = 'login/LOGIN';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAIL = 'login/LOGIN_FAIL';
const LOGIN_AFTER_SIGNUP = 'login/LOGIN_AFTER_SIGNUP';
const LOGOUT = 'login/LOGOUT';
const LOGOUT_SUCCESS = 'login/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'login/LOGOUT_FAIL';
const CLEAR_LOGIN_STATE = 'login/CLEAR_LOGIN_STATE';

const GET_OTP = 'login/GET_OTP';
const GET_OTP_SUCCESS = 'login/GET_OTP_SUCCESS';
const GET_OTP_FAIL = 'login/GET_OTP_FAIL';

const GET_OTP_SIGNUP = 'signUp/GET_OTP_SIGNUP';
const GET_OTP_SUCCESS_SIGNUP = 'signUp/GET_OTP_SUCCESS_SIGNUP';
const GET_OTP_FAIL_SIGNUP = 'signUp/GET_OTP_FAIL_SIGNUP';

const BIRTH_DATE_CHECK = 'login/BIRTH_DATE_CHECK';

const initialState = {
  loaded: false,
  isLoggedIn: false,
  loggingOut: false,
  isLoggedOut: false,
  askContact: false,
  askBirthDate: false,
  askName: false,
  otp: '',
  error: false,
  errorMessage: '',
  loginType: '',
  tokenData: {},
  askEmail: false,
  skipBirthdateCheck: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedOut: false,
        loggingOut: false,
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
        askContact: false,
        askName: false,
        askEmail: false,
        loginError: '',
        tokenData: {}
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error,
        askContact: action.error.askContact || false,
        askName: action.error.askName || false,
        askEmail: action.error.askEmail || false,
        askBirthDate: action.error.askBirthDate || false,
        loginType: action.error.loginType || '',
        tokenData:
          (action.error.askContact || action.error.askName || action.error.askBirthDate) && action.error.tokenData
            ? action.error.tokenData
            : {}
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
        loginError: '',
        askContact: false,
        askName: false,
        tokenData: {}
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
        refreshToken: null,
        isLoggedOut: action.result.success,
        askContact: false,
        askName: false,
        tokenData: {}
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    case GET_OTP:
      return {
        ...state,
        loading: true,
        loaded: false,
        otpSent: false,
        loginViaOtp: false
      };
    case GET_OTP_SUCCESS:
      return {
        ...state,
        otpSent: true,
        loading: false,
        loaded: true,
        loginViaOtp: true
      };
    case GET_OTP_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        otpError: true,
        otpSent: false,
        loginViaOtp: false,
        errorMessage: action.error.error_message
      };
    case GET_OTP_SIGNUP:
      return {
        ...state,
        loading: true,
        loaded: false,
        otpSent: false
      };
    case GET_OTP_SUCCESS_SIGNUP:
      return {
        ...state,
        otpSent: true,
        loading: false,
        loaded: true
      };
    case GET_OTP_FAIL_SIGNUP:
      return {
        ...state,
        loading: false,
        loaded: true,
        otpError: true,
        otpSent: false,
        errorMessage: action.error.error_message
      };
    case CLEAR_LOGIN_STATE:
      return {
        ...initialState
      };
    case BIRTH_DATE_CHECK:
      return {
        ...state,
        skipBirthdateCheck: action.status
      };
    default:
      return state;
  }
}

const setToken = ({ client }) => response => {
  if (response.access_token === null) {
    cookie.remove('Authorization');
    client.setJwtToken(null);
    client.setSessionId(null);
    client.setCSRFToken(null);
    return;
  }
  /* setting cookie for server call */
  cookie.set('Authorization', `Bearer ${response.access_token}`, {
    expires: 8 / 24
  });
  client.setJwtToken(response.access_token);
};

export const isLoaded = globalState => globalState.login && globalState.login.loaded;

export const login = data => ({
  types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const username = data.otp ? `mobile=${data.mobile}` : `email=${data.email}`;
      const type = data.otp ? 'mobile' : 'email';
      const password = data.otp ? data.otp : data.password;
      const method = data.otp ? 'otp' : 'password';
      const mobile = data.otp ? '' : `&mobile=${data.phone}`;
      const name = data.name ? `&full_name=${data.name}` : '';
      // const postData = `${username}&password=${password}&type=${type}&method=${method}&grant_type=password&client_id=${clientId}&client_secret=${clientSecret}${mobile}${name}`;
      const dob = data.dob ? `&dob=${data.dob}` : '';
      const email = data.email && type === 'mobile' ? `&email=${data.email}` : '';
      const skipBirthdateCheck = data.skipBirthdateCheck ? data.skipBirthdateCheck : false;
      const skipOtpValidation = data.skipOtpValidation ? data.skipOtpValidation : false;
      console.log({ skipBirthdateCheck });
      const postData = `${username}&password=${password}${dob}&skipBirthdateCheck=${skipBirthdateCheck}&skipOtpValidation=${skipOtpValidation}&type=${type}&method=${method}&grant_type=password&client_id=${clientId}&client_secret=${clientSecret}${mobile}${name}${email}`;
      const response = await client.post(LOGIN_API, postData);
      setToken({ client })(response);
      return response;
      // throw { askContact: true };
    } catch (err) {
      const error = {
        ...err,
        loginType: 'hometown'
      };
      throw error;
    }
  }
});

export const googleLogin = (
  result,
  session,
  phone = null,
  username = null,
  dob = null,
  skipBirthdateCheck = false,
  otp = null,
  createWallet
) => (dispatch, getState) =>
  dispatch({
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: async ({ client }) => {
      const {
        userLogin: { tokenData }
      } = getState();
      const data = (phone || username || dob || skipBirthdateCheck) && tokenData.tokenId ? tokenData : result;
      try {
        const {
          tokenId,
          profileObj: { name }
        } = data;
        const postData = {
          token: tokenId,
          client_secret: clientSecret,
          client_id: clientId,
          grant_type: 'password',
          session_id: session,
          phone,
          full_name: name,
          username,
          dob,
          CreateWallet: createWallet,
          skipBirthdateCheck,
          otp
        };
        const response = await client.post(GOOGLE_LOGIN_API, postData);
        setToken({ client })(response);
        return response;
      } catch (err) {
        const error = {
          ...err,
          loginType: 'google',
          tokenData: data
        };
        throw error;
      }
    }
  });

export const loginUserAfterSignUp = data => ({
  type: LOGIN_AFTER_SIGNUP,
  data
});

export const clearLoginState = () => ({
  type: CLEAR_LOGIN_STATE
});

export const logout = () => dispatch =>
  dispatch({
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: async ({ client }) => {
      try {
        const response = await client.put(LOGOUT_API);
        if (response.success) {
          await setToken({ client })({ access_token: null });
          await dispatch(clearLoginState());
          return response;
        }
      } catch (err) {
        throw err;
      }
    }
  });

export const getOtp = mobile => ({
  types: [GET_OTP, GET_OTP_SUCCESS, GET_OTP_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        mobile
      };
      await client.post(OTP_API, postData);
    } catch (err) {
      throw err;
    }
  }
});

export const resendOtp = mobile => ({
  types: [GET_OTP, GET_OTP_SUCCESS, GET_OTP_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        mobile
      };
      await client.post(RESEND_OTP_API, postData);
    } catch (err) {
      throw err;
    }
  }
});

export const getOtpfromSignUp = mobile => ({
  types: [GET_OTP_SIGNUP, GET_OTP_SUCCESS_SIGNUP, GET_OTP_FAIL_SIGNUP],
  promise: async ({ client }) => {
    try {
      const postData = {
        mobile
      };
      await client.post(SIGNUP_OTP_API, postData);
    } catch (err) {
      throw err;
    }
  }
});

export const resendOtpfromSignUp = mobile => ({
  types: [GET_OTP_SIGNUP, GET_OTP_SUCCESS_SIGNUP, GET_OTP_FAIL_SIGNUP],
  promise: async ({ client }) => {
    try {
      const postData = {
        mobile
      };
      await client.post(RESEND_SIGNUP_OTP_API, postData);
    } catch (err) {
      throw err;
    }
  }
});

export const birthdateCheck = status => ({
  type: BIRTH_DATE_CHECK,
  status
});
