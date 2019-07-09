import { MY_CASES as MY_CASES_API } from 'helpers/apiUrls';

const LOAD = 'mycases/LOAD';
const LOAD_SUCCESS = 'mycases/LOAD_SUCCESS';
const LOAD_FAIL = 'mycases/LOAD_FAIL';

const initialState = {
  loading: false,
  loaded: false,
  data: [],
  toggleForm: false,
  updated: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false
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
    default:
      return state;
  }
}

export const loadMyCases = (sfid, fromDate = '', toDate = '', status = '', mobile = '') => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) =>
    client.get(`${MY_CASES_API}?sfid=${sfid}&fromDate=${fromDate}&toDate=${toDate}&status=${status}&mobile=${mobile}`)
});
