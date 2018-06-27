import { createSelector } from 'reselect';

export const cartList = cart => cart.data || [];

export const cartSummary = cart => cart.summary;

export const getCartList = createSelector([cartList], data => data);

export const getCartCount = createSelector([cartList], items => items.length);

export const getCartSummary = createSelector([cartSummary], summary => summary);

export const getCartListSKU = createSelector([cartList], data => data.map(item => item.configurable_sku));
