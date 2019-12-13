import {
  FORGOT_PASSWORD as FORGOT_PASSWORD_API,
  CHECK_HASH as CHECK_HASH_API,
  RESET_PASSWORD as RESET_PASSWORD_API
} from 'helpers/apiUrls';

const FORGOT_PASSWORD = 'forgotPassword/FORGOT_PASSWORD';
const FORGOT_PASSWORD_SUCCESS = 'forgotPassword/FORGOT_PASSWORD_SUCCESS';
const FORGOT_PASSWORD_FAIL = 'forgotPassword/FORGOT_PASSWORD_FAIL';

const CHECK_HASH = 'forgotPassword/CHECK_HASH';
const CHECK_HASH_SUCCESS = 'forgotPassword/CHECK_HASH_SUCCESS';
const CHECK_HASH_FAIL = 'forgotPassword/CHECK_HASH_FAIL';

const RESET_PASSWORD = 'forgotPassword/RESET_PASSWORD';
const RESET_PASSWORD_SUCCESS = 'forgotPassword/RESET_PASSWORD_SUCCESS';
const RESET_PASSWORD_FAIL = 'forgotPassword/RESET_PASSWORD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  hashChecked: false,
  error: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET_PASSWORD:
      return {
        ...state,
        loading: true,
        loaded: false,
        passwordUpdated: false
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        passwordUpdated: true,
        error: '',
        errorMessage: ''
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loaded: true,
        loading: false,
        passwordUpdated: false,
        error: true,
        errorMessage: action.error
      };
    case CHECK_HASH:
      return {
        ...state,
        loading: true,
        loaded: false
      };
    case CHECK_HASH_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        hashChecked: true,
        checkHash: action.result
      };
    case CHECK_HASH_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        checkHash: action.result
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: false
      };
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: true
      };
    default:
      return state;
  }
}

export const isHashChecked = globalState => globalState.forgotpassword && globalState.forgotpassword.hashChecked;

export const forgotPassword = email => ({
  types: [FORGOT_PASSWORD, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const postData = {
        email
      };
      const response = await client.post(FORGOT_PASSWORD_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const checkHashValidity = hash => ({
  types: [CHECK_HASH, CHECK_HASH_SUCCESS, CHECK_HASH_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(`${CHECK_HASH_API}/${hash}`);
      response.hash = hash;
      return response;
    } catch (error) {
      return error;
    }
  }
});

export const resetPassword = (data, hash) => ({
  types: [RESET_PASSWORD, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const postData = {
        new_password: data.newPwd,
        confirm_password: data.newPwd,
        link: hash
      };
      const response = await client.post(RESET_PASSWORD_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
