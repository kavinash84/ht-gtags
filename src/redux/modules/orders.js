import { MY_ORDERS as MY_ORDERS_API } from 'helpers/apiUrls';

const LOAD = 'orders/LOAD';
const LOAD_SUCCESS = 'orders/LOAD_SUCCESS';
const LOAD_FAIL = 'orders/LOAD_FAIL';

const initialState = {
  loading: false,
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
        error: action.error
      };
    default:
      return state;
  }
}

export const loadMyOrders = (contactNumber = '', fromDate = '', toDate = '') => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${MY_ORDERS_API}?mobile=${contactNumber}&fromDate=${fromDate}&toDate=${toDate}`)
});
