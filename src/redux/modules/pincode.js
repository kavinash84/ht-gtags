import { setCity } from './app';

const LOAD = 'pincode/LOAD';
const LOAD_SUCCESS = 'pincode/LOAD_SUCCESS';
const LOAD_FAIL = 'pincode/LOAD_FAIL';
const SET_PINCODE_QUERY = 'pincode/SET_PINCODE_QUERY';
const SET_SELECTED_PINCODE = 'pincode/SET_SELECTED_PINCODE';

const LOAD_PINCODE_DETAILS = 'pincode/LOAD_PINCODE_DETAILS';
const LOAD_PINCODE_DETAILS_SUCCESS = 'pincode/LOAD_PINCODE_DETAILS_SUCCESS';
const LOAD_PINCODE_DETAILS_FAIL = 'pincode/LOAD_PINCODE_DETAILS_FAIL';

const LOAD_PINCODE_DATA = 'pincode/LOAD_PINCODE_DATA';
const LOAD_PINCODE_DATA_SUCCESS = 'pincode/LOAD_PINCODE_DATA_SUCCESS';
const LOAD_PINCODE_DATA_FAIL = 'pincode/LOAD_PINCODE_DATA_FAIL';
const initialState = {
  loading: false,
  loaded: false,
  results: [],
  pincodeQuery: '',
  showResults: false,
  selectedPincode: '',
  pincodeDetails: [],
  city: ''
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
    case LOAD_PINCODE_DETAILS:
      return {
        ...state,
        loading: true
      };
    case LOAD_PINCODE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        pincodeDetails: action.result.pincode_details || []
      };
    case LOAD_PINCODE_DETAILS_FAIL:
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
    case LOAD_PINCODE_DATA:
      return {
        ...state,
        loading: true
      };
    case LOAD_PINCODE_DATA_SUCCESS:
      return {
        ...state,
        selectedPincode: action.result.pincode || action.pincode,
        pincodeQuery: action.pincode,
        city: action.result.city,
        results: [],
        showResults: false
      };
    case LOAD_PINCODE_DATA_FAIL:
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

export const load = query => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`tesla/locations/pincode/${query}`)
});
export const loadPincodeDetails = pincode => ({
  types: [LOAD_PINCODE_DETAILS, LOAD_PINCODE_DETAILS_SUCCESS, LOAD_PINCODE_DETAILS_FAIL],
  promise: ({ client }) => client.get(`tesla/session/${pincode}`)
});
export const setPincodeQuery = query => ({
  type: SET_PINCODE_QUERY,
  query
});
export const setPincode = pincode => dispatch =>
  dispatch({
    types: [LOAD_PINCODE_DATA, LOAD_PINCODE_DATA_SUCCESS, LOAD_PINCODE_DATA_FAIL],
    promise: async ({ client }) => {
      const response = await client.get(`tesla/locations/pincode/details/${pincode}`);
      dispatch(setCity(response));
      return response;
    },
    pincode
  });
