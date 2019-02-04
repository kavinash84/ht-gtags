import {
  setSelectedGatewayInSession,
  setWalletType,
  setEmiOption,
  setSelectedPaymentDetails,
  submitCheckoutFinishPayment
} from '../modules/paymentoptions';

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
      dispatch(setSelectedPaymentDetails({
        gateway,
        data: {
          cardNumber,
          is_success: true,
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
      const { gateway } = action;
      dispatch(submitCheckoutFinishPayment({
        gateway,
        data: {
          newWebsite: 1
        }
      }));
    }
    return next(action);
  };
}
