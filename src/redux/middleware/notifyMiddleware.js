import { titleCase } from 'utils/helper';
import { notifSend } from '../modules/notifs';

const SOME_ERROR = 'Some Error Occured !';

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

      case 'cart/ADD_TO_CART_FAIL':
        dispatch(notifSend({
          type: 'warning',
          msg: 'Item already added to cart',
          dismissAfter: 2000
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

      default:
        break;
    }
    return next(action);
  };
}
