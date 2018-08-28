import { generateSession } from '../modules/app';
import { clearUserProfile } from '../modules/profile';
import { clearWishList } from '../modules/wishlist';
import { clearLoginState } from '../modules/login';

export default function userMiddleware() {
  return ({ dispatch }) => next => action => {
    if (__CLIENT__) {
      const { type } = action;
      if (type === 'login/LOGOUT' || (action.error && action.error.error === 'invalid_token')) {
        dispatch(clearLoginState());
        dispatch(clearUserProfile());
        dispatch(clearWishList());
        dispatch(generateSession());
      }
    }
    return next(action);
  };
}
