const LOAD = 'services/LOAD';
const LOAD_SUCCESS = 'services/LOAD_SUCCESS';
const LOAD_FAIL = 'services/LOAD_FAIL';
const GET = 'services/GET';
const GET_SUCCESS = 'services/GET_SUCCESS';
const GET_FAIL = 'services/GET_FAIL';

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
    case GET:
      return {
        ...state,
        [action.formType]: {
          getting: true
        }
      };
    case GET_SUCCESS:
      return {
        ...state,
        [action.formType]: {
          getting: false,
          got: true,
          results: action.result
        }
      };
    case GET_FAIL:
      return {
        ...state,
        [action.formType]: {
          getting: false,
          got: false,
          error: action.error
        }
      };
    default:
      return state;
  }
}
export function isLoaded(globalState, formType) {
  return globalState.services[formType] && globalState.services[formType].loaded;
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

export const getData = (API, formType) => ({
  types: [GET, GET_SUCCESS, GET_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.get(API);
      return response;
    } catch (error) {
      throw error;
    }
  },
  formType
});
