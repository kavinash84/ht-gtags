import { PINCODE } from 'helpers/Constants';
import cookie from 'js-cookie';
import { clearUserProfile, loadUserProfile, checkFuturePay, setFuturePayStatus } from '../modules/profile';
import { clearWishList, syncWishList } from '../modules/wishlist';
import { clearLoginState, loginUserAfterSignUp, logout } from '../modules/login';
import { generateSession } from '../modules/app';
import { clearCart, synCart } from '../modules/cart';
import { notifSend } from '../modules/notifs';
import { clearAddresses } from '../modules/address';

export default function userMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const { type } = action;
    const {
      pincode: { selectedPincode },
      app: { sessionId },
      wishlist: { waitlist }
    } = getState();
    const pincode = selectedPincode === '' ? PINCODE : selectedPincode;
    if (
      (action.error && action.error.error === 'invalid_token') ||
      (action.error && action.error.error === 'invalid_request') ||
      type === 'profile/LOAD_FAIL'
    ) {
      dispatch(logout());
      dispatch(generateSession());
      dispatch(clearLoginState());
      dispatch(clearUserProfile());
      dispatch(clearWishList());
      dispatch(clearCart());
    }
    if (type === 'signUp/SIGNUP_SUCCESS') {
      const {
        result: { token, token_error: tokenError }
      } = action;
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
      dispatch(checkFuturePay());
      cookie.set('PROMO_SIGNUP', 'AVOID', { expires: 7 });
      if (waitlist !== '') dispatch(syncWishList());
    }
    if (type === 'profile/FUTUREPAY_STATUS_SUCCESS') {
      const {
        result: { walletLinkStatus }
      } = action;
      if (!walletLinkStatus) {
        dispatch(setFuturePayStatus(true));
      }
    }
    if (type === 'profile/LINK_FUTURE_PAY_SUCCESS') {
      dispatch(loadUserProfile());
    }
    if (type === 'login/LOGOUT_SUCCESS') {
      dispatch(generateSession());
      dispatch(clearUserProfile());
      dispatch(clearWishList());
      dispatch(clearCart());
      dispatch(clearAddresses());
      cookie.set('PROMO_SIGNUP', '', { expires: 7 });
    }
    return next(action);
  };
}
