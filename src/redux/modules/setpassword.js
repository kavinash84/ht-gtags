import { SET_PASSWORD as SET_PASSWORD_API } from 'helpers/apiUrls';

const SET_PASSWORD = 'setPassword/SET_PASSWORD';
const SET_PASSWORD_SUCCESS = 'setPassword/SET_PASSWORD_SUCCESS';
const SET_PASSWORD_FAIL = 'setPassword/SET_PASSWORD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PASSWORD:
      return {
        ...state,
        loading: true
      };
    case SET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        passwordUpdated: true,
        error: '',
        errorMessage: ''
      };
    case SET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        passwordUpdated: false,
        error: true,
        errorMessage: action.error
      };
    default:
      return state;
  }
}

export const setUserPassword = data => ({
  types: [SET_PASSWORD, SET_PASSWORD_SUCCESS, SET_PASSWORD_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const postData = {
        //   current_password: data.oldPwd,
        new_password: data.password,
        confirm_password: data.confirmPassword,
        id_customer: data.customerId
      };
      const response = await client.post(SET_PASSWORD_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
