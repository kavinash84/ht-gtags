import { notifSend } from '../modules/notifs';

export default function userMiddleware() {
  return ({ dispatch }) => next => action => {
    if (action.type === 'cart/ADD_TO_CART_SUCCESS') {
      dispatch(notifSend({
        type: 'success',
        msg: 'Item added to your cart !',
        dismissAfter: 2000
      }));
    }
    if (action.type === 'cart/ADD_TO_CART_FAIL' || action.type === 'cart/UPDATE_CART_FAIL') {
      const errorMessage = action.error && action.error.error_message;
      dispatch(notifSend({
        type: 'warning',
        msg: errorMessage,
        dismissAfter: 2000
      }));
    }
    return next(action);
  };
}
