import { createSelector } from 'reselect';

export const wishList = wishlist => wishlist.data;

export const getWishList = createSelector(
  [wishList],
  items => items.filter(item => Object.keys(item.product_info).length > 1)
);

export const getSKUList = createSelector(
  [wishList],
  products => products.map(product => product.wishlist_info && product.wishlist_info.configurable_sku) || []
);

export const getWishListCount = createSelector(
  [getWishList],
  items => items.length
);
