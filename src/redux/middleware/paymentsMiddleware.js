import {
  setSelectedGatewayInSession,
  setWalletType,
  setEmiOption,
  setSelectedPaymentDetails
} from '../modules/paymentoptions';
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
    }
    if (type === 'paymentOptions/SELECTED_PAYMENT_METHOD_DETAILS') {
      const { gateway, data } = action.payLoad;
      if (gateway === 'Wallet') {
        const { walletName } = data;
        dispatch(setWalletType(walletName, sessionId));
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
        gateway, data, processingFees, result
      } = action;
      const authResponse = [result];
      const {
        cardNumber, otp, orderNumber, emiCode, emiTenure
      } = data;
      const successStatus =
        authResponse !== undefined && authResponse.length > 0
          ? authResponse[0].RSPCODE && authResponse[0].RSPCODE.toString() === '0'
          : false;
      dispatch(setSelectedPaymentDetails({
        gateway,
        data: {
          cardNumber,
          is_success: !successStatus ? authResponse[0].RSPCODE : '',
          easyemi_otp_code: otp,
          easyemi_emi_code: emiCode,
          easyemi_order_number: orderNumber,
          easyemi_tenure: emiTenure,
          easyemi_processingFees: processingFees,
          easyemi_auth_response: JSON.stringify(authResponse),
          easyemi_downpayment: 0
        }
      }));
    }
    if (type === 'paymentOptions/SUBMIT_PAYMENT_DETAILS_SUCCESS') {
      const { result, data } = action;
      if (data && data.EasyEmi) {
        if (Object.keys(data.EasyEmi).length > 0) {
          if (result && result.success) {
            window.location.href = PAYMENT_SUCCESS;
          } else if (result && result.orderId && result.orderId !== null) {
            window.location.href = `${PAYMENT_FAILURE}/?order=${result.data.order_id}`;
          } else {
            window.location.href = PAYMENT_FAILURE;
          }
        }
      }
    }
    if (type === 'paymentOptions/SUBMIT_PAYMENT_DETAILS_FAIL') {
      const { data, result } = action;
      if (data && data.EasyEmi) {
        if (Object.keys(data.EasyEmi).length > 0) {
          if (result && result.orderId && result.orderId !== null) {
            window.location.href = `${PAYMENT_FAILURE}/?order=${result.data.order_id}`;
          } else {
            window.location.href = PAYMENT_FAILURE;
          }
        }
      }
    }
    return next(action);
  };
}
