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
      case 'cart/ADD_TO_CART_COMBINED_SUCCESS':
        dispatch(notifSend({
            type: 'success',
            msg: 'All items added to your cart !',
            dismissAfter: 2000
          }));
        break;
      case 'cart/ADD_TO_CART_COMBINED_FAIL':
        dispatch(notifSend({
            type: 'warning',
            msg: action.error || 'Items not added in cart, please try after some time',
            dismissAfter: 2000
          }));
        break;
      case 'cart/UPDATE_CART_SUCCESS':
        dispatch(notifSend({
            type: 'success',
            msg: 'cart updated!',
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
      /* eslint-disable no-case-declarations */
      case 'paymentOptions/SUBMIT_PAYMENT_DETAILS_FAIL':
        const errorResponse = action.error && action.error.error_message;
        dispatch(notifSend({
            type: 'warning',
            msg:
              (errorResponse &&
                errorResponse.constructor !== String &&
                titleCase(errorResponse[errorResponse.length - 1])) ||
              (errorResponse && titleCase(errorResponse)) ||
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
            msg:
              (action.error.error_message === 'invalid_grant' && 'Incorrect Email or Password') ||
              action.error.error_message ||
              'User Credentials Are Invalid',
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

      // OTP
      case 'login/GET_OTP_FAIL':
        dispatch(notifSend({
            type: 'warning',
            msg: (action.error && titleCase(action.error.error_message)) || SOME_ERROR,
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
            msg: msg || (action.error && action.error.error_message) || SOME_ERROR,
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

      // MY-address
      case 'myaddress/UPDATE_ADDRESS_FAIL':
        dispatch(notifSend({
            type: 'warning',
            msg: (action.error && action.error.error_message) || SOME_ERROR,
            dismissAfter: 4000
          }));
        break;
      case 'myaddress/UPDATE_ADDRESS_SUCCESS':
        dispatch(notifSend({
            type: 'success',
            msg: 'Address Updated Succesfully',
            dismissAfter: 4000
          }));
        break;
      case 'myaddress/ADD_ADDRESS_FAIL':
        dispatch(notifSend({
            type: 'warning',
            msg: (action.error && action.error.error_message) || SOME_ERROR,
            dismissAfter: 4000
          }));
        break;
      case 'myaddress/ADD_ADDRESS_SUCCESS':
        dispatch(notifSend({
            type: 'success',
            msg: 'Address Added Succesfully',
            dismissAfter: 4000
          }));
        break;

      // Services
      case 'services/LOAD_FAIL': {
        let msg;
        if (action.error.error_message && action.error.error_message.indexOf('fullname') !== -1) {
          msg = 'Name Should Not Consists of Special Characters.';
        }
        if (action.error.error_message && action.error.error_message.indexOf('pincode') !== -1) {
          msg = 'Pincode is Not Valid !';
        }
        dispatch(notifSend({
            type: 'warning',
            msg: msg || (action.error && titleCase(action.error.error_message)) || SOME_ERROR,
            dismissAfter: 4000
          }));
        break;
      }
      // Forgot-password
      case 'forgotPassword/FORGOT_PASSWORD_FAIL':
        dispatch(notifSend({
            type: 'warning',
            msg: (action.error && action.error.error_message) || SOME_ERROR,
            dismissAfter: 4000
          }));
        break;

      // Profile
      case 'profile/UPDATE_PROFILE_SUCCESS':
        dispatch(notifSend({
            type: 'success',
            msg: 'Profile Updated Succesfully !',
            dismissAfter: 4000
          }));
        break;
      case 'profile/UPDATE_PROFILE_FAIL':
        dispatch(notifSend({
            type: 'warning',
            msg: (action.error && titleCase(action.error.error_message)) || SOME_ERROR,
            dismissAfter: 4000
          }));
        break;
      // Password
      case 'updatePassword/UPDATE_PASSWORD_SUCCESS':
        dispatch(notifSend({
            type: 'success',
            msg: 'Password Updated Succesfully !',
            dismissAfter: 4000
          }));
        break;
      case 'updatePassword/UPDATE_PASSWORD_FAIL':
        dispatch(notifSend({
            type: 'warning',
            msg:
              (action.error && action.error.new_password && titleCase(action.error.new_password)) ||
              (action.error && action.error.current_password && titleCase(action.error.current_password)) ||
              SOME_ERROR,
            dismissAfter: 4000
          }));
        break;
      case 'cases/LOAD_SUCCESS':
        // console.log(action);
        const {
          result: { success, errors }
        } = action;
        if (success === true) {
          dispatch(notifSend({
              type: 'success',
              msg: 'Case Registered Successfully !',
              dismissAfter: 4000
            }));
        } else {
          dispatch(notifSend({
              type: 'warning',
              msg: `${errors}`,
              dismissAfter: 4000
            }));
        }
        break;
      // Landing page
      case 'landing/LANDING_SUBMIT_SUCCESS':
        const landingPageResult = action.result;
        // console.log(action);
        if (landingPageResult.error === '') {
          dispatch(notifSend({
              type: 'success',
              msg: 'Thank you. Our sales team will connect with you.',
              dismissAfter: 4000
            }));
        } else {
          dispatch(notifSend({
              type: 'warning',
              msg: (action.result && action.result.error) || SOME_ERROR,
              dismissAfter: 4000
            }));
        }
        break;
        case 'feedback/SET_FEEDBACK_FORM_FAILURE':
          dispatch(notifSend({
            type: 'warning',
            msg: action.error && action.error.error ? action.error.error : SOME_ERROR,
            dismissAfter: 4000
          }));
          break;
      default:
        break;
    }
    return next(action);
  };
}
