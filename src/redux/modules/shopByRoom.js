const LOAD = 'shopByRoom/LOAD';
const LOAD_SUCCESS = 'shopByRoom/LOAD_SUCCESS';
const LOAD_FAIL = 'shopByRoom/LOAD_FAIL';

const initialState = {
  data: []
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
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.shopByRoom && globalState.shopByRoom.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: ({ client }) => client.get('tesla/rooms/')
  };
}