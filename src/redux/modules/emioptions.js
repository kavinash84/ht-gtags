import { EMI_OPTIONS } from "helpers/apiUrls";

const LOAD = "emioptions/LOAD";
const LOAD_SUCCESS = "emioptions/LOAD_SUCCESS";
const LOAD_FAIL = "emioptions/LOAD_FAIL";

const initialState = {
  loaded: false,
  data: { emi: [], noCostEmi: [] }
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        data: { emi: [], noCostEmi: [] }
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

export const loadEmiOptions = (sku, pincode = "400042") => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${EMI_OPTIONS}/${sku}/${pincode}`)
});
