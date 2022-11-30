import axios from 'axios';
import { PINCODE as PINCODE_API } from 'helpers/apiUrls';
import { PINCODE } from 'helpers/Constants';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { setCity } from './app';
import { loadCart } from './cart';

const { CancelToken } = axios;

const LOAD = 'pincode/LOAD';
const LOAD_SUCCESS = 'pincode/LOAD_SUCCESS';
const LOAD_FAIL = 'pincode/LOAD_FAIL';
const SET_PINCODE_QUERY = 'pincode/SET_PINCODE_QUERY';
const SET_PINCODE_OR_CITY_QUERY = 'pincode/SET_PINCODE_OR_CITY_QUERY';

const LOAD_PINCODE_DETAILS = 'pincode/LOAD_PINCODE_DETAILS';
const LOAD_PINCODE_DETAILS_SUCCESS = 'pincode/LOAD_PINCODE_DETAILS_SUCCESS';
const LOAD_PINCODE_DETAILS_FAIL = 'pincode/LOAD_PINCODE_DETAILS_FAIL';

const LOAD_PINCODE_DATA = 'pincode/LOAD_PINCODE_DATA';
const LOAD_PINCODE_DATA_SUCCESS = 'pincode/LOAD_PINCODE_DATA_SUCCESS';
const LOAD_PINCODE_DATA_FAIL = 'pincode/LOAD_PINCODE_DATA_FAIL';
const STOP_LOADING = 'pincode/STOP_LOADING';
const SET_PINCODE_FILTER = 'pincode/SET_PINCODE_FILTER';
const SET_PINCODE_DETAILS = 'pincode/SET_PINCODE_DETAILS';

const LOGOUT_SUCCESS = "login/LOGOUT_SUCCESS";

const initialState = {
  loading: false,
  loaded: false,
  results: [],
  pincodeQuery: '',
  showResults: false,
  selectedPincode: PINCODE,
  isPincodeFilter: false,
  pincodeDetails: [],
  city: null
};

let cancel;
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
      if ((!allowNChar(action.query, 6) || !allowTypeOf(action.query, 'number')) && action.query.length > 0) {
        return state;
      }
      return {
        ...state,
        loaded: false,
        pincodeQuery: action.query
      };
    case SET_PINCODE_OR_CITY_QUERY:
      if (!allowNChar(action.query, 6) && action.query.length > 0) {
        return state;
      }
      return {
        ...state,
        loaded: false,
        pincodeQuery: action.query
      };
    case LOAD_PINCODE_DATA:
      return {
        ...state,
        loading: true
      };
    case LOAD_PINCODE_DATA_SUCCESS:
      return {
        ...state,
        selectedPincode: (action.result.pincode && String(action.result.pincode)) || action.pincode,
        pincodeQuery: action.pincode,
        city: action.result.city,
        results: [],
        showResults: false,
        loading: false,
        loaded: true
      };
    case LOAD_PINCODE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case SET_PINCODE_FILTER:
      return {
        ...state,
        isPincodeFilter: action.isPincodeFilter
      };
    case SET_PINCODE_DETAILS:
      return {
        ...state,
        selectedPincode: (action.response.pincode && String(action.response.pincode)) || action.pincode,
        pincodeQuery: action.pincode,
        city: action.response.city,
        loading: false,
        loaded: true
      };
      case LOGOUT_SUCCESS:
              return {
                ...state,
                selectedPincode: "110005",
                pincodeQuery: "",
                city: null,
                loading: false,
                loaded: true
              };
    default:
      return state;
  }
}

export const stopLoading = () => ({
  type: STOP_LOADING
});

export const load = query => (dispatch, getState) => {
  const {
    pincode: { loading }
  } = getState();
  if (loading) {
    dispatch(stopLoading());
    cancel('user cancelled request');
  }
  return dispatch({
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: async ({ client }) => {
      try {
        const response = await client.get(`${PINCODE_API}/${query}`, {
          cancelToken: new CancelToken(c => {
            cancel = c;
          })
        });
        return response;
      } catch (error) {
        throw error;
      }
    }
  });
};

export const loadPincodeDetails = pincode => ({
  types: [LOAD_PINCODE_DETAILS, LOAD_PINCODE_DETAILS_SUCCESS, LOAD_PINCODE_DETAILS_FAIL],
  promise: ({ client }) => client.get(`tesla/session/${pincode}`)
});

export const setPincodeQuery = query => ({
  type: SET_PINCODE_QUERY,
  query
});
export const setPincodeFilter = isPincodeFilter => ({
  type: SET_PINCODE_FILTER,
  isPincodeFilter
});

export const setPincodeOrCityQuery = query => ({
  type: SET_PINCODE_OR_CITY_QUERY,
  query
});
export const setPincode = pincode => (dispatch, getState) =>
  dispatch({
    types: [LOAD_PINCODE_DATA, LOAD_PINCODE_DATA_SUCCESS, LOAD_PINCODE_DATA_FAIL],
    promise: async ({ client }) => {
      const response = await client.get(`${PINCODE_API}/details/${pincode}`);
      dispatch(setCity(response));
      dispatch(loadCart(getState().app.sessionId, pincode));
      return response;
    },
    pincode
  });

export const setPincodeDetails = (response, pincode) => ({
  type: SET_PINCODE_DETAILS,
  response,
  pincode
});
