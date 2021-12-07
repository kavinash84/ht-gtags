import { PAYMENT_OPTIONS } from 'helpers/apiUrls';
import { getCardType, validateFuturePay } from '../../utils/validation';

const LOAD = 'paymentOptions/LOAD';
const LOAD_SUCCESS = 'paymentOptions/LOAD_SUCCESS';
const LOAD_FAIL = 'paymentOptions/LOAD_FAIL';
const SELECTED_PAYMENT_METHOD = 'paymentOptions/SELECTED_PAYMENT_METHOD';
const SELECTED_PAYMENT_METHOD_DETAILS = 'paymentOptions/SELECTED_PAYMENT_METHOD_DETAILS';
const CHECK_PAYMENT_DETAILS = 'paymentOptions/CHECK_PAYMENT_DETAILS';

const SET_PAYMENT_METHOD = 'paymentOptions/SET_PAYMENT_METHOD';
const SET_PAYMENT_METHOD_SUCCESS = 'paymentOptions/SET_PAYMENT_METHOD_SUCCESS';
const SET_PAYMENT_METHOD_FAIL = 'paymentOptions/SET_PAYMENT_METHOD_FAIL';

const SUBMIT_EASY_EMI_PAYMENT_VERIFY = 'paymentOptions/SUBMIT_EASY_EMI_PAYMENT_VERIFY';
const SUBMIT_EASY_EMI_PAYMENT_VERIFY_SUCCESS = 'paymentOptions/SUBMIT_EASY_EMI_PAYMENT_VERIFY_SUCCESS';
const SUBMIT_EASY_EMI_PAYMENT_VERIFY_FAIL = 'paymentOptions/SUBMIT_EASY_EMI_PAYMENT_VERIFY_FAIL';

const SUBMIT_EASY_EMI_PAYMENT_PROCESS = 'paymentOptions/SUBMIT_EASY_EMI_PAYMENT_PROCESS';
const SUBMIT_EASY_EMI_PAYMENT_PROCESS_SUCCESS = 'paymentOptions/SUBMIT_EASY_EMI_PAYMENT_PROCESS_SUCCESS';
const SUBMIT_EASY_EMI_PAYMENT_PROCESS_FAIL = 'paymentOptions/SUBMIT_EASY_EMI_PAYMENT_PROCESS_FAIL';

const SUBMIT_PAYMENT_DETAILS = 'paymentOptions/SUBMIT_PAYMENT_DETAILS';
const SUBMIT_PAYMENT_DETAILS_SUCCESS = 'paymentOptions/SUBMIT_PAYMENT_DETAILS_SUCCESS';
const SUBMIT_PAYMENT_DETAILS_FAIL = 'paymentOptions/SUBMIT_PAYMENT_DETAILS_FAIL';
const SET_VALIDATION_ERROR = 'paymentOptions/SET_VALIDATION_ERROR';

const SET_CARD_TYPE = 'paymentOptions/SET_CARD_TYPE';
const SET_CARD_TYPE_SUCCESS = 'paymentOptions/SET_CARD_TYPE_SUCCESS';
const SET_CARD_TYPE_FAIL = 'paymentOptions/SET_CARD_TYPE_FAIL';

const SET_CARD_COMPANY = 'paymentOption/SET_CARD_COMPANY';

const RESET_EASY_EMI = 'paymentOption/RESET_EASY_EMI';

const SUBMIT_PAYMENT_DETAILS_EASY_EMI = 'paymentOptions/SUBMIT_PAYMENT_DETAILS_EASY_EMI';

const SET_HTWALLET_CHECKBOX = 'paymentOption/SET_HTWALLET_CHECKBOX';

const FUTURE_PAY_AMOUNT = 'paymentOption/FUTURE_PAY_AMOUNT';
// future pay full payment
const SUBMIT_PAYMENT_DETAILS_FUTURE_PAY = 'paymentOptions/SUBMIT_PAYMENT_DETAILS_FUTURE_PAY';
const SUBMIT_PAYMENT_DETAILS_FUTURE_PAY_SUCCESS = 'paymentOptions/SUBMIT_PAYMENT_DETAILS_FUTURE_PAY_SUCCESS';
const SUBMIT_PAYMENT_DETAILS_FUTURE_PAY_FAIL = 'paymentOptions/SUBMIT_PAYMENT_DETAILS_FUTURE_PAY_FAIL';

const paymentJSON = {
  session_id: '',
  future_pay_redeem_amount: '',
  isPayFromHTWallet: '',
  payment_method_type: '',
  payment_method: '',
  cc_number: '',
  cc_card_type: '',
  cc_holder: '',
  cc_exp_month: '',
  cc_exp_year: '',
  cc_security_code: '',
  pg_cc: '',
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
  partpay_netbanking_pg: '',
  wallet: '',
  easyemi_otp_code: '',
  easyemi_emi_code: '',
  easyemi_order_number: '',
  easyemi_tenure: '',
  easyemi_processingFees: '',
  easyemi_auth_response: '[{}]',
  easyemi_downpayment: 0
};

const getURL = gateway => {
  if (gateway === 'CreditCard' || gateway === 'DebitCard' || gateway === 'NetBanking' || gateway === 'Upi') {
    return `Payu/${gateway}`;
  }
  if (
    gateway === 'Emi' ||
    gateway === 'EasyEmi' ||
    gateway === 'Wallet' ||
    gateway === 'CashOnDelivery' ||
    gateway === 'FuturePay'
  ) {
    return `${gateway}/${gateway}`;
  }
};

const paymentObject = (
  sessionId,
  selectedGateway,
  paymentData,
  cardType = 'visa',
  futurePayRedeemAmount,
  isPayFromHtWallet,
  totalCartAmount
) => {
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
      cc_card_type: cardType,
      cc_holder: nameOnCard,
      cc_exp_month: expMonth,
      cc_exp_year: expYear,
      cc_security_code: cvv,
      pg_cc: 'CC',
      future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
      isPayFromHTWallet: isPayFromHtWallet,
      totalCartAmount
    };
  } else if (selectedGateway === 'DebitCard') {
    const {
 cardNumber, cvv, expMonth, expYear, nameOnCard
} = paymentData;
    return {
      ...paymentJSON,
      session_id: sessionId,
      payment_method_type: selectedGateway,
      payment_method: 'Payu',
      dc_number: cardNumber,
      dc_card_type: cardType,
      dc_holder: nameOnCard,
      dc_exp_month: expMonth,
      dc_exp_year: expYear,
      dc_security_code: cvv,
      pg_dc: 'DC',
      future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
      isPayFromHTWallet: isPayFromHtWallet,
      totalCartAmount
    };
  } else if (selectedGateway === 'NetBanking') {
    const { bankCode } = paymentData;
    return {
      ...paymentJSON,
      session_id: sessionId,
      payment_method_type: selectedGateway,
      payment_method: 'Payu',
      netbanking_bankname: bankCode,
      pg_nb: 'NB',
      future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
      isPayFromHTWallet: isPayFromHtWallet,
      totalCartAmount
    };
  } else if (selectedGateway === 'Wallet') {
    const { walletName } = paymentData;
    return {
      ...paymentJSON,
      session_id: sessionId,
      payment_method_type: selectedGateway,
      payment_method: walletName,
      wallet: walletName,
      future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
      isPayFromHTWallet: isPayFromHtWallet,
      totalCartAmount
    };
  } else if (selectedGateway === 'Emi') {
    const {
 emiBank, emiCode, nameOnCard, cardNumber, cvv, expMonth, expYear
} = paymentData;
    return {
      ...paymentJSON,
      session_id: sessionId,
      payment_method_type: selectedGateway,
      payment_method: 'Payu',
      emi_bank_name: emiBank,
      emi_months: emiCode.match(/\d+/)[0].replace(/^0/, ''),
      emi_cc_number: cardNumber,
      emi_cc_card_type: cardType,
      emi_cc_holder: nameOnCard,
      emi_cc_exp_month: expMonth,
      emi_cc_exp_year: expYear,
      emi_cc_security_code: cvv,
      future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
      isPayFromHTWallet: isPayFromHtWallet,
      totalCartAmount
    };
  } else if (selectedGateway === 'EmiZero') {
    // For Bajaj Finance EMI
    if (!paymentData) {
      return {
        ...paymentJSON,
        session_id: sessionId,
        payment_method_type: 'Emi',
        payment_method: 'BFL',
        future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
        isPayFromHTWallet: isPayFromHtWallet,
        totalCartAmount
      };
    }
    const {
 emiBank, emiCode, nameOnCard, cardNumber, cvv, expMonth, expYear, cardType: type
} = paymentData;
    return {
      ...paymentJSON,
      session_id: sessionId,
      payment_method_type: 'Emi',
      payment_method: 'Payu',
      card_type: type,
      emi_bank_name: emiBank,
      emi_months: emiCode.match(/\d+/)[0].replace(/^0/, ''),
      emi_cc_number: cardNumber,
      emi_cc_card_type: cardType,
      emi_cc_holder: nameOnCard,
      emi_cc_exp_month: expMonth,
      emi_cc_exp_year: expYear,
      emi_cc_security_code: cvv,
      future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
      isPayFromHTWallet: isPayFromHtWallet,
      totalCartAmount
    };
  } else if (selectedGateway === 'EasyEmi') {
    const {
      is_seamless: isSeamless,
      easyemi_otp_code: otp,
      easyemi_emi_code: emiCode,
      easyemi_order_number: orderNumber,
      easyemi_tenure: emiTenure,
      easyemi_processingFees: processingFees,
      easyemi_auth_response: easyEmiAuthResponse,
      easyemi_downpayment: easyEmiDownPayment
    } = paymentData;
    return {
      ...paymentJSON,
      session_id: sessionId,
      payment_method_type: selectedGateway,
      payment_method: 'EasyEmi',
      is_seamless: isSeamless,
      easyemi_otp_code: otp,
      easyemi_emi_code: emiCode,
      easyemi_order_number: orderNumber,
      easyemi_tenure: emiTenure,
      easyemi_processingFees: processingFees,
      easyemi_auth_response: easyEmiAuthResponse,
      easyemi_downpayment: easyEmiDownPayment,
      future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
      isPayFromHTWallet: isPayFromHtWallet,
      totalCartAmount
    };
  } else if (selectedGateway === 'Upi') {
    return {
      ...paymentJSON,
      session_id: sessionId,
      payment_method_type: selectedGateway,
      payment_method: 'Upi',
      future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
      isPayFromHTWallet: isPayFromHtWallet,
      totalCartAmount,
      ...paymentData
    };
  } else if (selectedGateway === 'FuturePay') {
    return {
      ...paymentJSON,
      session_id: sessionId,
      payment_method_type: 'Wallet',
      payment_method: 'FuturePay',
      future_pay_redeem_amount: isPayFromHtWallet ? futurePayRedeemAmount : 0,
      isPayFromHTWallet: isPayFromHtWallet,
      wallet: 'Wallet',
      card_type: 'CC',
      totalCartAmount
    };
  }
};

const getSelectedGateway = data => {
  console.log('getSelectedGateway function', data);
  const {
    cart: {
      summary: { total }
    }
  } = data;

  return total < 20000 ? 'Emi' : 'EmiZero';
};

const emiZero = result => {
  console.log('Adding zero emi', result);
  let {
    paymentData: { paymentOSCConfig, methodPaymentGateways },
    cart: {
      // eslint-disable-next-line prefer-const
      summary: { total }
    }
  } = result;
  if (total < 20000) return result;

  methodPaymentGateways = {
    ...methodPaymentGateways,
    EmiZero: { gateway: 'Payu', count: '0' }
  };
  paymentOSCConfig = {
    ...paymentOSCConfig,
    EmiZero: {
      paymentType: 'EmiZero',
      isEnable: true
    }
  };

  result.paymentData = {
    ...result.paymentData,
    methodPaymentGateways,
    paymentOSCConfig
  };
  return result;
};

const initialState = {
  loaded: false,
  data: null,
  selectedGateway: 'CreditCard',
  isFormValid: false,
  cardType: 'other',
  cardTypeError: null,
  paymentMethodDetails: {
    CreditCard: {
      nameOnCard: '',
      cardNumber: '',
      cvv: '',
      expMonth: '',
      expYear: ''
    }
  },
  futurePayRedeemAmount: 0,
  isPayFromHtWallet: 0,
  bflMinAmount: 25000,
  submitting: false,
  submitted: false,
  futurePay: {}
};

const appendData = (gateway, state, data) => {
  if (data.cvv) {
    if (data.cvv.length > 4) {
      // || !Number(data.cvv) removed
      return {
        [gateway]: {
          ...state.paymentMethodDetails[gateway]
        }
      };
    }
  }
  if (data.cardNumber) {
    if (data.cardNumber.length > 19) {
      // || !Number(data.cardNumber) removed
      return {
        [gateway]: {
          ...state.paymentMethodDetails[gateway]
        }
      };
    }
  }
  if (data.Upi) {
    // if (data.cardNumber.length > 19) {
    // || !Number(data.cardNumber) removed
    return {
      [gateway]: {
        ...state.paymentMethodDetails[gateway]
      }
    };
    // }
  }
  return {
    [gateway]: {
      ...state.paymentMethodDetails[gateway],
      ...data
    }
  };
};

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
        data: emiZero(action.result, action.cart),
        // selectedGateway: getSelectedGateway(action.result),
        // futurePay: {}
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error && action.error.error_message
      };

    case SET_CARD_TYPE:
      return {
        ...state
      };
    case SET_CARD_TYPE_SUCCESS:
      return {
        ...state,
        cardType: action.result && action.result.cardType
      };
    case SET_CARD_TYPE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        cardTypeError: action.error
      };

    case SET_CARD_COMPANY:
      return {
        ...state,
        cardType: action.cardType
      };
    case SET_PAYMENT_METHOD:
      return {
        ...state
      };
    case SET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        paymentOption: action.result
      };
    case SET_PAYMENT_METHOD_FAIL:
      return {
        ...state,
        loading: false,
        paymentOptionError: action.error
      };

    case SELECTED_PAYMENT_METHOD:
      return {
        ...state,
        selectedGateway: action.gateway,
        isFormValid: true,
        paymentMethodDetails: appendData(action.gateway, state, action.initial),
        error: []
      };
    case SELECTED_PAYMENT_METHOD_DETAILS:
      return {
        ...state,
        isFormValid: true,
        paymentMethodDetails: appendData(action.payLoad.gateway, state, action.payLoad.data),
        error: []
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
        error: null
      };
    case SUBMIT_PAYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitted: true,
        formData: action.result,
        error: null
      };
    case SUBMIT_PAYMENT_DETAILS_FAIL:
      return {
        ...state,
        submitting: false,
        submitted: false,
        error: action.error && action.error.error_message
      };
    case SUBMIT_PAYMENT_DETAILS_FUTURE_PAY:
      return {
        ...state,
        submitting: true,
        submitted: false,
        error: null
      };
    case SUBMIT_PAYMENT_DETAILS_FUTURE_PAY_SUCCESS:
      return {
        ...state,
        submitting: false,
        submitted: true,
        futurePay: action.result,
        error: null
      };
    case SUBMIT_PAYMENT_DETAILS_FUTURE_PAY_FAIL:
      return {
        ...state,
        submitting: false,
        submitted: false,
        error: action.error && action.error.error_message
      };
    case SUBMIT_EASY_EMI_PAYMENT_VERIFY:
      return {
        ...state,
        easyEmiVerifying: true,
        easyEmiVerified: false,
        easyEmiVerifyError: null
      };
    case SUBMIT_EASY_EMI_PAYMENT_VERIFY_SUCCESS:
      return {
        ...state,
        easyEmiVerifying: false,
        easyEmiVerified: true,
        easyEmiVerifyError: null,
        easyEmiVerifyResponse: action.result
      };
    case SUBMIT_EASY_EMI_PAYMENT_VERIFY_FAIL:
      return {
        ...state,
        easyEmiVerifying: false,
        easyEmiVerified: false,
        easyEmiVerifyError: action.error
      };
    case SUBMIT_EASY_EMI_PAYMENT_PROCESS:
      return {
        ...state,
        easyEmiProcessing: true,
        easyEmiProcessed: false,
        easyEmiProcessError: null
      };
    case SUBMIT_EASY_EMI_PAYMENT_PROCESS_SUCCESS:
      return {
        ...state,
        easyEmiProcessing: false,
        easyEmiProcessed: true,
        easyEmiProcessError: null,
        easyEmiProcessResponse: action.result
      };
    case SUBMIT_EASY_EMI_PAYMENT_PROCESS_FAIL:
      return {
        ...state,
        easyEmiProcessing: false,
        easyEmiProcessed: false,
        easyEmiProcessError: action.error
      };
    case RESET_EASY_EMI:
      return {
        ...state,
        easyEmiVerifying: false,
        easyEmiVerified: false,
        easyEmiVerifyError: null,
        easyEmiVerifyResponse: null,
        easyEmiProcessing: false,
        easyEmiProcessed: false,
        easyEmiProcessError: null,
        easyEmiProcessResponse: null,
        paymentMethodDetails: {
          ...state.paymentMethodDetails,
          EasyEmi: {
            ...state.paymentMethodDetails.EasyEmi,
            easyemi_otp_code: ''
          }
        }
      };
    case SET_HTWALLET_CHECKBOX:
      return {
        ...state,
        isPayFromHtWallet: action.data
      };
    case FUTURE_PAY_AMOUNT:
      return {
        ...state,
        futurePayRedeemAmount: action.amount,
        futurePayRedeemAmountError: validateFuturePay(action.amount, action.cartValue).error,
        futurePayRedeemAmountErrorMessage: validateFuturePay(action.amount, action.cartValue).msg
      };
    default:
      return state;
  }
}

// export const load = session => ({
//   types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//   promise: ({ client }) => client.get(`${PAYMENT_OPTIONS}/${session}`)
// });
export const load = (result, cart) => ({
  type: LOAD_SUCCESS,
  result,
  cart
});

export const setSelectedGateway = (gateway, initial, session) => ({
  type: SELECTED_PAYMENT_METHOD,
  gateway,
  initial,
  session
});

export const setSelectedGatewayInSession = (gateway, session) => ({
  types: [SET_PAYMENT_METHOD, SET_PAYMENT_METHOD_SUCCESS, SET_PAYMENT_METHOD_FAIL],
  promise: ({ client }) => client.get(`${PAYMENT_OPTIONS}/${getURL(gateway)}/${session}`)
});

export const setWalletType = (walletName, session) => ({
  types: [SET_PAYMENT_METHOD, SET_PAYMENT_METHOD_SUCCESS, SET_PAYMENT_METHOD_FAIL],
  promise: ({ client }) => client.get(`${PAYMENT_OPTIONS}/${walletName}/Wallet/${session}`)
});

export const setEmiOption = (emiBank, months, session) => ({
  types: [SET_PAYMENT_METHOD, SET_PAYMENT_METHOD_SUCCESS, SET_PAYMENT_METHOD_FAIL],
  promise: ({ client }) => client.get(`${PAYMENT_OPTIONS}/Emi/Payu/${emiBank}/${months}/${session}`)
});

export const setSelectedPaymentDetails = payLoad => ({
  type: SELECTED_PAYMENT_METHOD_DETAILS,
  payLoad
});

/* since api not working falling back on regex */

// export const setCardType = (cardno, session, gateway) => ({
//   types: [SET_CARD_TYPE, SET_CARD_TYPE_SUCCESS, SET_CARD_TYPE_FAIL],
//   promise: ({ client }) => {
//     const response = client.get(`tesla/payments/card-type-info/${cardno}/${session}`);
//     response.gateway = gateway;
//     return response;
//   }
// });

export const setCardType = cardno => ({
  type: SET_CARD_COMPANY,
  cardType: getCardType(cardno)
});

export const checkPaymentDetails = () => ({
  type: CHECK_PAYMENT_DETAILS
});
export const setValidationError = () => ({
  type: SET_VALIDATION_ERROR
});

const submitPaymentDetailsEasyEmi = (sessionId, data, cardType) => ({
  type: SUBMIT_PAYMENT_DETAILS_EASY_EMI,
  sessionId,
  data,
  cardType
});

export const submitPaymentDetailsFuturePay = (
  sessionId,
  data,
  cardType,
  selectedGateway,
  walletType,
  futurePayRedeemAmount,
  isPayFromHtWallet,
  totalCartAmount,
  success
) => ({
  types: [
    SUBMIT_PAYMENT_DETAILS_FUTURE_PAY,
    SUBMIT_PAYMENT_DETAILS_FUTURE_PAY_SUCCESS,
    SUBMIT_PAYMENT_DETAILS_FUTURE_PAY_FAIL
  ],
  promise: async ({ client }) => {
    try {
      const postData = paymentObject(
        sessionId,
        Object.keys(data)[0],
        Object.values(data)[0],
        cardType,
        futurePayRedeemAmount,
        isPayFromHtWallet,
        totalCartAmount,
        success
      );
      const response = await client.post('tesla/orders', postData);
      return response;
    } catch (error) {
      throw error;
    }
  },
  walletType,
  data,
  cardType,
  selectedGateway
});

export const submitPaymentDetails = (
  sessionId,
  data,
  cardType,
  selectedGateway,
  walletType,
  futurePayRedeemAmount,
  isPayFromHtWallet,
  totalCartAmount,
  success
) => {
  if (data && 'EasyEmi' in data && (!success || success === undefined)) {
    return submitPaymentDetailsEasyEmi(sessionId, data, cardType);
  }
  if (data && 'FuturePay' in data) {
    return submitPaymentDetailsFuturePay(
      sessionId,
      data,
      cardType,
      selectedGateway,
      walletType,
      futurePayRedeemAmount,
      isPayFromHtWallet,
      totalCartAmount,
      success
    );
  }
  return {
    types: [SUBMIT_PAYMENT_DETAILS, SUBMIT_PAYMENT_DETAILS_SUCCESS, SUBMIT_PAYMENT_DETAILS_FAIL],
    promise: async ({ client }) => {
      try {
        const postData = paymentObject(
          sessionId,
          Object.keys(data)[0],
          Object.values(data)[0],
          cardType,
          futurePayRedeemAmount,
          isPayFromHtWallet,
          totalCartAmount,
          success
        );
        const response = await client.post('tesla/orders', postData);
        return response;
      } catch (error) {
        throw error;
      }
    },
    walletType,
    data,
    cardType,
    selectedGateway
  };
};

export const submitBflPaymentDetails = (sessionId, selectedGateway) => ({
  types: [SUBMIT_PAYMENT_DETAILS, SUBMIT_PAYMENT_DETAILS_SUCCESS, SUBMIT_PAYMENT_DETAILS_FAIL],
  promise: async ({ client }) => {
    try {
      const postData = paymentObject(sessionId, selectedGateway);
      const response = await client.post('tesla/orders', postData);
      return response;
    } catch (error) {
      throw error;
    }
  }
  // walletType,
  // data,
  // cardType,
  // selectedGateway
});

export const verifyEasyEmi = (data, session) => ({
  types: [SUBMIT_EASY_EMI_PAYMENT_VERIFY, SUBMIT_EASY_EMI_PAYMENT_VERIFY_SUCCESS, SUBMIT_EASY_EMI_PAYMENT_VERIFY_FAIL],
  promise: async ({ client }) => {
    try {
      const response = await client.post(`${PAYMENT_OPTIONS}/easy-emi/verify/${session}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }
});

export const processEasyEmi = (data, session, gateway, processingFees, cardType) => ({
  types: [
    SUBMIT_EASY_EMI_PAYMENT_PROCESS,
    SUBMIT_EASY_EMI_PAYMENT_PROCESS_SUCCESS,
    SUBMIT_EASY_EMI_PAYMENT_PROCESS_FAIL
  ],
  promise: async ({ client }) => {
    try {
      const response = await client.post(`${PAYMENT_OPTIONS}/easy-emi/process/${session}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  data,
  gateway,
  processingFees,
  cardType
});

export const resetEasyEmiState = () => ({
  type: RESET_EASY_EMI
});

// export const isPayFromWallet = data => ({
//   type: SET_HTWALLET_CHECKBOX,
//   data
// });

export const setHtWallet = data => ({
  type: SET_HTWALLET_CHECKBOX,
  data
});

// export const futurePayAmount = (amount, cartValue) => ({
//   type: FUTURE_PAY_AMOUNT,
//   amount,
//   cartValue
// });

export const setFuturePayAmount = (amount, cartValue) => ({
  type: FUTURE_PAY_AMOUNT,
  amount,
  cartValue
});
