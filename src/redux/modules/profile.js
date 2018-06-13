// import { UPDATE_PROFILE as UPDATE_PROFILE_API } from 'helpers/apiUrls';
// import { clientId, clientSecret } from 'helpers/Constants';

const UPDATE_PROFILE = 'profile/UPDATE_PROFILE';
const UPDATE_PROFILE_SUCCESS = 'profile/UPDATE_PROFILE_SUCCESS';
const UPDATE_PROFILE_FAIL = 'profile/UPDATE_PROFILE_FAIL';

const initialState = {
  name: 'John Doe',
  email: 'john@hometown.in',
  phone: '1234567890',
  updatingProfile: false,
  updateError: true,
  updateMessage: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
        updateMessage: action.result.message //
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        updatingProfile: false,
        updateError: action.error //
      };
    default:
      return state;
  }
}

export const updateProfile = data => ({
  types: [UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL],
  promise: async () => {
    try {
      console.log('Logged In  Profile Reducer', data);
      // Will Do POST With DATA
    } catch (error) {
      console.log('Logged In Profile Reducer catch', error);
      throw error;
    }
  }
});
