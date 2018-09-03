import { clearUserProfile } from '../modules/profile';
import { clearWishList } from '../modules/wishlist';
import { clearLoginState } from '../modules/login';
import { generateSession } from '../modules/app';
import { clearCart } from '../modules/cart';

export default function userMiddleware() {
  return ({ dispatch }) => next => action => {
    if (__CLIENT__) {
      if (action.error && action.error.error === 'invalid_token') {
        dispatch(clearLoginState());
        dispatch(clearUserProfile());
        dispatch(clearWishList());
        dispatch(clearCart());
      }
      if (action.type === 'login/LOGOUT_SUCCESS') {
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
