import { PAYMENT_OPTIONS } from 'helpers/apiUrls';

const LOAD = 'paymentOptions/LOAD';
const LOAD_SUCCESS = 'paymentOptions/LOAD_SUCCESS';
const LOAD_FAIL = 'paymentOptions/LOAD_FAIL';
const SELECTED_PAYMENT_METHOD = 'paymentOptions/SELECTED_PAYMENT_METHOD';
const SELECTED_PAYMENT_METHOD_DETAILS = 'paymentOptions/SELECTED_PAYMENT_METHOD_DETAILS';

const sampleData = require('../../data/PaymentOptions');

const initialState = {
  loaded: false,
  data: sampleData,
  selectedGateway: 'CreditCard',
  paymentMethodDetails: {
    CreditCard: {
      nameOnCard: '',
      cardNumber: '',
      cvv: '',
      expMonth: '',
      expYear: ''
    }
  }
};

const appendData = (gateway, state, data) => ({
  [gateway]: {
    ...state.paymentMethodDetails[gateway],
    ...data
  }
});

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
    case SELECTED_PAYMENT_METHOD:
      return {
        ...state,
        selectedGateway: action.gateway,
        paymentMethodDetails: appendData(action.gateway, state, action.initial)
      };
    case SELECTED_PAYMENT_METHOD_DETAILS:
      return {
        ...state,
        paymentMethodDetails: appendData(action.payLoad.gateway, state, action.payLoad.data)
      };
    default:
      return state;
  }
}

export const load = session => ({
  types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
  promise: ({ client }) => client.get(`${PAYMENT_OPTIONS}/${session}`)
});

export const setSelectedGateway = (gateway, initial) => ({
  type: SELECTED_PAYMENT_METHOD,
  gateway,
  initial
});

export const setSelectedPaymentDetails = payLoad => ({
  type: SELECTED_PAYMENT_METHOD_DETAILS,
  payLoad
});
