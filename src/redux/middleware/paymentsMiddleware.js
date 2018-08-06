import { setSelectedGatewayInSession, setWalletType, setEmiOption } from '../modules/paymentoptions';

export default function paymentsMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const { app: { sessionId } } = getState();
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
          const { paymentoptions: { paymentMethodDetails: { Emi: { emiBank } } } } = getState();
          const months = emiCode.match(/\d+/)[0].replace(/^0/, '');
          dispatch(setEmiOption(emiBank, months, sessionId));
        }
      }
    }
    return next(action);
  };
}
