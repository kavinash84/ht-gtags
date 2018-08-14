import { titleCase } from 'utils/helper';
import { notifSend } from '../modules/notifs';

const SOME_ERROR = 'Some Error Occured !';

export default function userMiddleware() {
  return ({ dispatch }) => next => action => {
    // CART
    if (action.type === 'cart/ADD_TO_CART_SUCCESS') {
      dispatch(notifSend({
        type: 'success',
        msg: 'Item added to your cart !',
        dismissAfter: 2000
      }));
    }
    if (action.type === 'cart/ADD_TO_CART_FAIL') {
      dispatch(notifSend({
        type: 'warning',
        msg: 'Item already added to cart',
        dismissAfter: 2000
      }));
    }
    // SIGNUP
    if (action.type === 'signUp/SIGNUP_SUCCESS') {
      dispatch(notifSend({
        type: 'success',
        msg: 'Account Succesfully Created ! ',
        dismissAfter: 4000
      }));
    }

    if (action.type === 'signUp/SIGNUP_FAIL') {
      dispatch(notifSend({
        type: 'warning',
        msg: (action.error.error_message && titleCase(action.error.error_message)) || SOME_ERROR,
        dismissAfter: 4000
      }));
    }
    return next(action);
  };
}
