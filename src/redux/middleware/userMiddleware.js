import { PINCODE } from 'helpers/Constants';
import { clearUserProfile, loadUserProfile } from '../modules/profile';
import { clearWishList, syncWishList } from '../modules/wishlist';
import { clearLoginState, loginUserAfterSignUp } from '../modules/login';
import { generateSession } from '../modules/app';
import { clearCart, synCart } from '../modules/cart';
import { notifSend } from '../modules/notifs';

export default function userMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const { type } = action;
    const { pincode: { selectedPincode }, app: { sessionId }, wishlist: { waitlist } } = getState();
    const pincode = selectedPincode === '' ? PINCODE : selectedPincode;
    if (__CLIENT__) {
      if (action.error && action.error.error === 'invalid_token') {
        dispatch(clearLoginState());
        dispatch(clearUserProfile());
        dispatch(clearWishList());
        dispatch(clearCart());
      }
      if (type === 'signUp/SIGNUP_SUCCESS') {
        const { result: { token, token_error: tokenError } } = action;
        if (!tokenError) {
          dispatch(loginUserAfterSignUp(token));
          dispatch(synCart(sessionId, pincode));
          dispatch(loadUserProfile());
          if (waitlist !== '') dispatch(syncWishList());
        } else {
          dispatch(notifSend({
            type: 'warning',
            msg: 'Unable to singUp at the moment. Please try later !',
            dismissAfter: 4000
          }));
        }
      }
      if (type === 'login/LOGIN_SUCCESS') {
        dispatch(synCart(sessionId, pincode));
        dispatch(loadUserProfile());
        if (waitlist !== '') dispatch(syncWishList());
      }
      if (type === 'login/LOGOUT_SUCCESS') {
        dispatch(generateSession());
        dispatch(clearLoginState());
        dispatch(clearUserProfile());
        dispatch(clearWishList());
        dispatch(clearCart());
      }
    }
    return next(action);
  };
}
