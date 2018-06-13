import { USERPROFILE as USERPROFILE_API, UPDATEPROFILE as UPDATEPROFILE_API } from 'helpers/apiUrls';

const LOAD = 'profile/LOAD';
const LOAD_SUCCESS = 'profile/LOAD_SUCCESS';
const LOAD_FAIL = 'profile/LOAD_FAIL';
const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';
const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAIL = 'profile/UPDATE_PROFILE_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  data: {},
  profileUpdated: false
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
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        loading: true
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        profileUpdated: true
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        profileUpdated: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.profile && globalState.profile.loaded;
}

export const updateUserProfile = data => ({
  types: [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = {
        email: data.email,
        mobile: data.phone,
        full_name: data.fullName
      };
      const response = await client.put(UPDATEPROFILE_API, postData);
      return response;
    } catch (error) {
      console.log('Logged In Profile Reducer catch', error);
      throw error;
    }
  }
});

export const loadUserProfile = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(USERPROFILE_API)
});
