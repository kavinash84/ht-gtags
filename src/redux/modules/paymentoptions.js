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

const paymentJSON = {
  session_id: '',
  payment_method_type: '',
  payment_method: '',
  cc_number: '',
  cc_card_type: '',
  cc_holder: '',
  cc_exp_month: '',
  cc_exp_year: '',
  cc_security_code: '',
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

const paymentObject = (sessionId, selectedGateway, paymentData) => {
  if (selectedGateway === 'CreditCard') {
    const {
      cardNumber, cvv, expMonth, expYear, nameOnCard
    } = paymentData;
    return {
      ...paymentJSON,
      session_id: sessionId,
      payment_method_type: selectedGateway,
      payment_method: 'Payu',
      cc_number: cardNumber,
      cc_card_type: 'visa',
      cc_holder: nameOnCard,
      cc_exp_month: expMonth,
      cc_exp_year: expYear,
      cc_security_code: cvv,
      pg_cc: 'CC'
    };
  }
};

const initialState = {
  loaded: false,
  data: null,
  selectedGateway: 'CreditCard',
  isFormValid: false,
  paymentMethodDetails: {
    CreditCard: {
      nameOnCard: '',
      cardNumber: '',
      cvv: '',
      expMonth: '',
      expYear: ''
    }
  },
  submitting: false,
  submitted: false
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
  return e.length > 0;
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
        isFormValid: true,
        paymentMethodDetails: appendData(action.gateway, state, action.initial)
      };
    case SELECTED_PAYMENT_METHOD_DETAILS:
      return {
        ...state,
        isFormValid: true,
        paymentMethodDetails: appendData(action.payLoad.gateway, state, action.payLoad.data)
      };
    case CHECK_PAYMENT_DETAILS:
      return {
        ...state,
        isFormValid: verifyForm(state)
      };
    case SET_VALIDATION_ERROR:
      return {
        ...state,
        isFormValid: false
      };
    case SUBMIT_PAYMENT_DETAILS:
      return {
        ...state,
        submitting: true,
        submitted: false,
        formData: action.result
      };
    case SUBMIT_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitted: true,
        formData: action.result
      };
    case SUBMIT_PAYMENT_DETAILS_FAIL:
      return {
        ...state,
        submitting: false,
        submitted: false,
        error: action.error
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

export const submitPaymentDetails = (sessionId, data) => ({
  types: [SUBMIT_PAYMENT_DETAILS, SUBMIT_PAYMENT_DETAILS_SUCCESS, SUBMIT_PAYMENT_DETAILS_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = paymentObject(sessionId, Object.keys(data)[0], Object.values(data)[0]);
      const response = await client.post('tesla/orders', postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
});
