import { SIGNUP as SIGNUP_API } from 'helpers/apiUrls';

const SIGNUP = 'signUp/SIGNUP';
const SIGNUP_SUCCESS = 'signUp/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'signUp/SIGNUP_FAIL';

const initialState = {
  loaded: false,
  isLoggedIn: false,
  response: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        loggingIn: true
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        isLoggedIn: true,
        loaded: true,
        response: action.result,
        accessToken: action.result.token.access_token,
        refreshToken: action.result.token.refresh_token,
        loginError: ''
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        loggingIn: false,
        loginError: action.error
      };
    default:
      return state;
  }
}

const setToken = ({ client }) => response => {
  client.setJwtToken(response.token.access_token);
};

export function isLoaded(globalState) {
  return globalState.signup && globalState.signup.loaded;
}

export const signUp = data => ({
  types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        email: data.email,
        mobile: data.phone,
        password: data.password
      };
      const response = await client.post(SIGNUP_API, postData);
      setToken({ client })(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
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
