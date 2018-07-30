import { setSelectedGatewayInSession } from '../modules/paymentoptions';

export default function paymentsMiddleware() {
  return ({ dispatch }) => next => action => {
    const { type } = action;
    if (type === 'paymentOptions/SELECTED_PAYMENT_METHOD') {
      const { gateway, session } = action;
      dispatch(setSelectedGatewayInSession(gateway, session));
    }
    return next(action);
  };
}
