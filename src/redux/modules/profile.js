import { UPDATE_PROFILE as UPDATE_PROFILE_API } from 'helpers/apiUrls';
// import { clientId, clientSecret } from 'helpers/Constants';

const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';
const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAIL = 'profile/UPDATE_PROFILE_FAIL';

const LOAD_PROFILE = 'profile/LOAD_PROFILE';
const LOAD_PROFILE_SUCCESS = 'profile/LOAD_PROFILE_SUCCESS';
const LOAD_PROFILE_FAIL = 'profile/LOAD_PROFILE_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        loading: true
      };
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        updatingProfile: true
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updatingProfile: false,
        updateError: false,
        user: action.result
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        updatingProfile: false,
        updateError: action.error
      };
    default:
      return state;
  }
}

export const isLoaded = globalState => globalState.profile && globalState.wishlist.loaded;

export const updateProfile = data => ({
  types: [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL],
  promise: async ({ client }) => {
    try {
      const { email, fullName, phone } = data;
      const postData = {
        email,
        mobile: phone,
        full_name: fullName
      };
      const response = await client.put(UPDATE_PROFILE_API, postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const loadProfile = () => ({
  types: [LOAD_PROFILE, LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAIL],
  promise: ({ client }) => client.get('tesla/users/details')
});
