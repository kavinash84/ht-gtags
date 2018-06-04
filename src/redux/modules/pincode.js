const LOAD = 'pincode/LOAD';
const LOAD_SUCCESS = 'pincode/LOAD_SUCCESS';
const LOAD_FAIL = 'pincode/LOAD_FAIL';
const SET_PINCODE_QUERY = 'pincode/SET_PINCODE_QUERY';
const SET_SELECTED_PINCODE = 'pincode/SET_SELECTED_PINCODE';

const initialState = {
  loading: false,
  loaded: false,
  results: [],
  pincodeQuery: '',
  showResults: false,
  selectedPincode: ''
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
        showResults: true,
        results: 'metadata' in action.result ? action.result.metadata.suggestions : []
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case SET_PINCODE_QUERY:
      return {
        ...state,
        loading: action.query.length >= 2,
        loaded: false,
        pincodeQuery: action.query
      };
    case SET_SELECTED_PINCODE:
      return {
        ...state,
        selectedPincode: action.pincode,
        pincodeQuery: action.pincode,
        results: [],
        showResults: false
      };
    default:
      return state;
  }
}

export const load = query => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`tesla/locations/pincode/${query}`)
});

export const setPincodeQuery = query => ({
  type: SET_PINCODE_QUERY,
  query
});

export const setPincode = pincode => ({
  type: SET_SELECTED_PINCODE,
  pincode
});
