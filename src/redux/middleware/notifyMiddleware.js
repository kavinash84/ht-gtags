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
          msg:
              (action.error.mobile && titleCase(action.error.mobile)) ||
              (action.error.password && ` Passowrd : ${titleCase(action.error.password)}`) ||
              (action.error.error_message && titleCase(action.error.error_message)) ||
              SOME_ERROR,

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

      // Add Review

      case 'reviews/ADD_REVIEW_FAIL':
        dispatch(notifSend({
          type: 'warning',
          msg: (action.error.error_message && titleCase(action.error.error_message)) || SOME_ERROR,
          dismissAfter: 4000
        }));
        break;

      case 'reviews/ADD_REVIEW_SUCCESS':
        dispatch(notifSend({
          type: 'success',
          msg: 'Review Added Succesfully !',
          dismissAfter: 4000
        }));
        break;
      // Login
      case 'login/LOGIN_FAIL':
        dispatch(notifSend({
          type: 'warning',
          msg: (action.error.error === 'invalid_grant' && 'Incorrect Email or Password') || SOME_ERROR,
          dismissAfter: 4000
        }));
        break;

      case 'login/LOGIN_SUCCESS':
        dispatch(notifSend({
          type: 'success',
          msg: 'Logged In Succesfully !',
          dismissAfter: 4000
        }));
        break;
      // Delivery
      case 'checkout/SEND_DELIVERY_ADDRESS_FAIL': {
        let msg;
        if (action.error.error_message && action.error.error_message.indexOf('fullname') !== -1) {
          msg = 'Name Should Not Consists of Special Characters.';
        }
        if (action.error.error_message && action.error.error_message.indexOf('pincode') !== -1) {
          msg = 'Pincode is Not Valid !';
        }
        dispatch(notifSend({
          type: 'warning',
          msg: msg || SOME_ERROR,
          dismissAfter: 4000
        }));
        break;
      }
      // Contact US
      case 'contactus/FEEDBACK_FAIL':
        dispatch(notifSend({
          type: 'warning',
          msg: SOME_ERROR,
          dismissAfter: 4000
        }));
        break;
      default:
        break;
    }
    return next(action);
  };
}
