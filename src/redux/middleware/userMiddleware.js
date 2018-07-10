import { clearUserProfile } from '../modules/profile';
import { clearWishList } from '../modules/wishlist';

export default function userMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    if (__CLIENT__) {
      const { type } = action;
      if (type === 'login/LOGOUT') {
        dispatch(clearUserProfile());
        dispatch(clearWishList());
      }
    }
    return next(action);
  };
}
