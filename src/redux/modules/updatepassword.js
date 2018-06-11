import { UPDATE_PASSWORD as UPDATE_PASSWORD_API } from 'helpers/apiUrls';
// import { clientId, clientSecret } from 'helpers/Constants';

const UPDATE_PASSWORD = 'updatePassword/UPDATE_PASSWORD';
const UPDATE_PASSWORD_SUCCESS = 'updatePassword/UPDATE_PASSWORD_SUCCESS';
const UPDATE_PASSWORD_FAIL = 'updatePassword/UPDATE_PASSWORD_FAIL';

const initialState = {
  updatingPassword: false,
  updateError: true,
  updateMessage: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_PASSWORD:
      return {
        ...state,
        updatingPassword: true
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatingPassword: false,
        updateError: false,
        updateMessage: action.result.message
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        updatingPassword: false,
        updateError: action.error
      };
    default:
      return state;
  }
}

export const updatePassword = data => ({
  types: [UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL],
  promise: async ({ client }) => {
    try {
      console.log('Logged In Reducer', data);
      /* eslint-disable max-len */
      const postData = {
        current_spassword: data.oldPwd,
        new_password: data.newPwd,
        repeat_password: data.newPwd
      };
      console.log(postData);
      const response = await client.post(UPDATE_PASSWORD_API, postData);
      // console.log(response);
      return response;
    } catch (error) {
      console.log('Logged In Reducer catch', error);
      throw error;
    }
  }
});
