import { titleCase } from 'utils/helper';
import { notifSend } from '../modules/notifs';

const SOME_ERROR = 'Ooops...! Some thing went wrong !';

export default function userMiddleware() {
  return ({ dispatch }) => next => action => {
    switch (action.type) {
      // CART
      case 'cart/ADD_TO_CART_SUCCESS':
        dispatch(notifSend({
          type: 'success',
          msg: 'Item added to your cart !',
          dismissAfter: 2000
        }));
        break;

      case 'cart/ADD_TO_CART_FAIL' || 'cart/UPDATE_CART_FAIL':
        dispatch(notifSend({
          type: 'warning',
          msg: action.error.error_message,
          dismissAfter: 2000
        }));
        break;

      case 'cart/UPDATE_CART_FAIL':
        dispatch(notifSend({
          type: 'warning',
          msg: (action.error.error_message && titleCase(action.error.error_message)) || SOME_ERROR,
          dismissAfter: 4000
        }));
        break;
      case 'cart/REMOVE_FROM_CART_FAIL':
        dispatch(notifSend({
          type: 'warning',
          msg: (action.error.error_message && titleCase(action.error.error_message)) || SOME_ERROR,
          dismissAfter: 4000
        }));
        break;

      // SIGNUP
      case 'signUp/SIGNUP_SUCCESS':
        dispatch(notifSend({
          type: 'success',
          msg: 'Account Succesfully Created ! ',
          dismissAfter: 4000
        }));
        break;

      case 'signUp/SIGNUP_FAIL':
        dispatch(notifSend({
          type: 'warning',
          msg: (action.error.error_message && titleCase(action.error.error_message)) || SOME_ERROR,
          dismissAfter: 4000
        }));
        break;

      // COUPON
      case 'coupon/APPLY_COUPON_FAIL':
        dispatch(notifSend(
          {
            type: 'warning',
            msg: (action.error.error_message && titleCase(action.error.error_message)) || SOME_ERROR,
            dismissAfter: 4000
          },
          'coupon'
        ));
        break;

      // Review orders
      case 'paymentOptions/SUBMIT_PAYMENT_DETAILS_FAIL':
        dispatch(notifSend({
          type: 'warning',
          msg:
              (action.error.error_message &&
                titleCase(action.error.error_message[action.error.error_message.length - 1])) ||
              SOME_ERROR,
          dismissAfter: 4000
        }));
        break;
      default:
        break;
    }
    return next(action);
  };
}
