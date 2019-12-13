import { UPDATE_PASSWORD as UPDATE_PASSWORD_API } from 'helpers/apiUrls';

const UPDATE_PASSWORD = 'updatePassword/UPDATE_PASSWORD';
const UPDATE_PASSWORD_SUCCESS = 'updatePassword/UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAIL = 'updatePassword/UPDATE_PASSWORD_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_PASSWORD:
      return {
        ...state,
        loading: true
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        passwordUpdated: true,
        error: '',
        errorMessage: ''
      };
    case UPDATE_PASSWORD_FAIL:
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

export const updateUserPassword = data => ({
  types: [UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL],
  promise: async ({ client }) => {
    try {
      /* eslint-disable max-len */
      const postData = {
        current_password: data.oldPwd,
        new_password: data.newPwd,
        repeat_password: data.newPwd
      };
      const response = await client.put(UPDATE_PASSWORD_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
