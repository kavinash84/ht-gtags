import {
  setSelectedGatewayInSession,
  setWalletType,
  setEmiOption,
  setSelectedPaymentDetails,
  processEasyEmi,
  submitPaymentDetails
} from '../modules/paymentoptions';
import { setOrderId, setWalletName } from '../modules/app';
import { PAYMENT_SUCCESS, PAYMENT_FAILURE } from '../../helpers/Constants';

export default function paymentsMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const {
      app: { sessionId }
    } = getState();
    const { type } = action;
    if (type === 'paymentOptions/SELECTED_PAYMENT_METHOD') {
      const { gateway, session } = action;
      dispatch(setSelectedGatewayInSession(gateway, session));
      dispatch(setWalletName(''));
    }
    if (type === 'paymentOptions/SELECTED_PAYMENT_METHOD_DETAILS') {
      const { gateway, data } = action.payLoad;
      if (gateway === 'Wallet') {
        const { walletName } = data;
        dispatch(setWalletType(walletName, sessionId));
        dispatch(setWalletName(walletName));
      }
      if (gateway === 'Emi') {
        const { emiCode } = data;
        if (emiCode) {
          const {
            paymentoptions: {
              paymentMethodDetails: {
                Emi: { emiBank }
              }
            }
          } = getState();
          const months = emiCode.match(/\d+/)[0].replace(/^0/, '');
          dispatch(setEmiOption(emiBank, months, sessionId));
        }
      }
    }
    if (type === 'paymentOptions/SUBMIT_EASY_EMI_PAYMENT_PROCESS_SUCCESS') {
      const {
 gateway, data, processingFees, result, cardType
} = action;
      const authResponse = [result];
      const successStatus =
        authResponse !== undefined && authResponse.length > 0
          ? authResponse[0].RSPCODE !== undefined && authResponse[0].RSPCODE.toString() === '0'
          : false;
      const {
 cardNumber, otp, orderNumber, emiCode, emiTenure
} = data;
      dispatch(setSelectedPaymentDetails({
          gateway,
          data: {
            cardNumber,
            is_success: successStatus ? authResponse[0].RSPCODE : '',
            easyemi_otp_code: otp,
            easyemi_emi_code: emiCode,
            easyemi_order_number: orderNumber,
            easyemi_tenure: emiTenure,
            easyemi_processingFees: processingFees,
            easyemi_auth_response: JSON.stringify(authResponse),
            easyemi_downpayment: 0
          }
        }));
      const {
        paymentoptions: { paymentMethodDetails }
      } = getState();
      if (successStatus) {
        dispatch(submitPaymentDetails(sessionId, paymentMethodDetails, cardType, successStatus));
      }
    }
    if (type === 'paymentOptions/SUBMIT_PAYMENT_DETAILS_EASY_EMI') {
      const { data, cardType } = action;
      if (data && data.EasyEmi) {
        if (Object.keys(data.EasyEmi).length > 0) {
          const {
            paymentoptions: {
              easyEmiVerifyResponse: { ORDERNO: orderNumber }
            }
          } = getState();
          const {
            EasyEmi: {
 cardNumber, easyemi_otp_code: otp, easyEmiConfig, gateway
}
          } = data;
          const easyEmiConfigJson =
            easyEmiConfig && Object.keys(easyEmiConfig).length > 0 ? JSON.parse(easyEmiConfig.emiOptions)[0] : {};
          const { emi_code: emiCode, tenure: emiTenure } = easyEmiConfigJson;
          // calling process easy emi in between
          dispatch(processEasyEmi(
              {
                cardNumber,
                otp,
                orderNumber,
                emiCode,
                emiTenure
              },
              sessionId,
              gateway === undefined || gateway !== '' ? 'EasyEmi' : gateway,
              easyEmiConfig.processingFees,
              cardType
            ));
        }
      }
    }
    if (type === 'paymentOptions/SUBMIT_PAYMENT_DETAILS_SUCCESS') {
      const { result, data, walletType } = action;

      if (result && result.form_data) {
        const {
          form_data: { order_nr: orderNumber, customer_id: customerId }
        } = result;
        if (orderNumber) {
          dispatch(setOrderId(orderNumber, customerId, walletType));
        }
      }
      if (data && data.EasyEmi) {
        if (Object.keys(data.EasyEmi).length > 0) {
          if (result && result.success) {
            next(action);
            window.location.href = PAYMENT_SUCCESS;
          } else if (result && !result.success && result.orderId && result.orderId !== null) {
            next(action);
            window.location.href = `${PAYMENT_FAILURE}/?order=${result.data.order_id}`;
          } else {
            next(action);
            window.location.href = PAYMENT_FAILURE;
          }
        }
      }
    }
    if (type === 'paymentOptions/SUBMIT_PAYMENT_DETAILS_FAIL') {
      const { data, result } = action;
      if (data && data.EasyEmi) {
        if (Object.keys(data.EasyEmi).length > 0) {
          if (result && !result.success && result.orderId && result.orderId !== null) {
            next(action);
            window.location.href = `${PAYMENT_FAILURE}/?order=${result.data.order_id}`;
          }
          next(action);
          window.location.href = PAYMENT_FAILURE;
        }
      }
    }
    return next(action);
  };
}
