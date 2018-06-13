import { createSelector } from 'reselect';

export const wishList = wishlist => wishlist.data;

export const getWishList = createSelector([wishList], items => items);

export const getSKUList = createSelector(
  [wishList],
  products => products.map(product => product.wishlist_info.configurable_sku) || []
);
