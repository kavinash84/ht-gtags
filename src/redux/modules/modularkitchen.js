import { MODULARKITCHEN_NEW } from "helpers/apiUrls";

const LOAD = "modularkitchennew/LOAD";
const LOAD_SUCCESS = "modularkitchennew/LOAD_SUCCESS";
const LOAD_FAIL = "modularkitchennew/LOAD_FAIL";

const initialState = {
  loaded: false,
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

export const loadmodularkitchenNewData = () => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(MODULARKITCHEN_NEW)
});
