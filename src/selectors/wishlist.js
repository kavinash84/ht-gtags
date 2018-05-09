import { createSelector } from 'reselect';

export const wishList = state => state.wishlist.data;

export const getWishList = createSelector([wishList], items => items);
