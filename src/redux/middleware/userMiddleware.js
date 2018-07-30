import { clearUserProfile } from '../modules/profile';
import { clearWishList } from '../modules/wishlist';
import { logout } from '../modules/login';

export default function userMiddleware() {
  return ({ dispatch }) => next => action => {
    if (__CLIENT__) {
      const { type } = action;
      if (type === 'login/LOGOUT') {
        dispatch(clearUserProfile());
        dispatch(clearWishList());
      }
      if (type === 'profile/LOAD_FAIL') {
        if (action.error.error === 'invalid_token') {
          dispatch(logout());
        }
      }
    }
    return next(action);
  };
}
