import { PAYMENT_OPTIONS } from 'helpers/apiUrls';

const LOAD = 'paymentOptions/LOAD';
const LOAD_SUCCESS = 'paymentOptions/LOAD_SUCCESS';
const LOAD_FAIL = 'paymentOptions/LOAD_FAIL';
const SELECTED_PAYMENT_METHOD = 'paymentOptions/SELECTED_PAYMENT_METHOD';
const SELECTED_PAYMENT_METHOD_DETAILS = 'paymentOptions/SELECTED_PAYMENT_METHOD_DETAILS';
const CHECK_PAYMENT_DETAILS = 'paymentOptions/CHECK_PAYMENT_DETAILS';

const SUBMIT_PAYMENT_DETAILS = 'paymentOptions/SUBMIT_PAYMENT_DETAILS';
const SUBMIT_PAYMENT_DETAILS_SUCCESS = 'paymentOptions/SUBMIT_PAYMENT_DETAILS_SUCCESS';
const SUBMIT_PAYMENT_DETAILS_FAIL = 'paymentOptions/SUBMIT_PAYMENT_DETAILS_FAIL';
const SET_VALIDATION_ERROR = 'paymentOptions/SET_VALIDATION_ERROR';

// const sampleData = require('../../data/PaymentOptions');

const initialState = {
  loaded: false,
  data: null,
  selectedGateway: 'CreditCard',
  validationerror: false,
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

const verifyForm = state => {
  const paymentMethodDetails = Object.values(state.paymentMethodDetails);
  const e = paymentMethodDetails.filter(item => item.length === 0);
  return !e.length > 0;
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
    case SELECTED_PAYMENT_METHOD:
      return {
        ...state,
        selectedGateway: action.gateway,
        validationerror: false,
        paymentMethodDetails: appendData(action.gateway, state, action.initial)
      };
    case SELECTED_PAYMENT_METHOD_DETAILS:
      return {
        ...state,
        validationerror: false,
        paymentMethodDetails: appendData(action.payLoad.gateway, state, action.payLoad.data)
      };
    case CHECK_PAYMENT_DETAILS:
      return {
        ...state,
        validationerror: verifyForm(state)
      };
    case SET_VALIDATION_ERROR:
      return {
        ...state,
        validationerror: false
      };
    case SUBMIT_PAYMENT_DETAILS:
      return {
        ...state
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

export const checkPaymentDetails = () => ({
  type: CHECK_PAYMENT_DETAILS
});
export const setValidationError = () => ({
  type: SET_VALIDATION_ERROR
});

export const submitPaymentDetails = data => ({
  types: [SUBMIT_PAYMENT_DETAILS, SUBMIT_PAYMENT_DETAILS_SUCCESS, SUBMIT_PAYMENT_DETAILS_FAIL],
  promise: async ({ client }) => {
    console.log(data);
    try {
      const postData = {
        session_id: '4l5qdn6e3tr4jn3mnmehbq2dg5',
        payment_method_type: 'CreditCard',
        payment_method: 'Payu',
        cc_number: '1234',
        cc_card_type: 'visa',
        cc_holder: 'chirag',
        cc_exp_month: '08',
        cc_exp_year: '21',
        cc_security_code: '123',
        pg_cc: 'CC',
        dc_number: '',
        dc_card_type: '',
        dc_holder: '',
        dc_exp_month: '',
        dc_exp_year: '',
        dc_security_code: '',
        pg_dc: '',
        netbanking_bankname: '',
        pg_nb: '',
        emi_bank_name: '',
        emi_months: '',
        emi_cc_number: '',
        emi_cc_card_type: '',
        emi_cc_holder: '',
        emi_cc_exp_month: '',
        emi_cc_exp_year: '',
        emi_cc_security_code: '',
        partpay_cc_number: '',
        partpay_cc_card_type: '',
        partpay_cc_holder: '',
        partpay_cc_exp_month: '',
        partpay_cc_exp_year: '',
        partpay_cc_security_code: '',
        partpay_cc_pg: '',
        partpay_dc_number: '',
        partpay_dc_card_type: '',
        partpay_dc_holder: '',
        partpay_dc_exp_month: '',
        partpay_dc_exp_year: '',
        partpay_dc_security_code: '',
        partpay_dc_pg: '',
        partpay_netbanking_bankname: '',
        partpay_netbanking_pg: ''
      };
      const response = await client.put('/api/tesla/orders', postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
