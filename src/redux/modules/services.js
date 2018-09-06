const LOAD = 'services/LOAD';
const LOAD_SUCCESS = 'services/LOAD_SUCCESS';
const LOAD_FAIL = 'services/LOAD_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.formType]: {
          loading: true
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.formType]: {
          loading: false,
          loaded: true,
          results: action.result
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        [action.formType]: {
          loading: false,
          loaded: false,
          error: action.error
        }
      };
    default:
      return state;
  }
}

export const sendData = (API, data, formType) => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.post(API, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  formType
});
