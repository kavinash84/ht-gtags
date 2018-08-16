import { createSelector } from 'reselect';

export const cartList = cart => cart.data || [];

export const cartSummary = cart => cart.summary;

export const getCartList = createSelector([cartList], data => data.filter(item => item.product_info.product_id !== ''));

export const getCartCount = createSelector([cartSummary], items => items.items_count || 0);

export const getCartSummary = createSelector([cartSummary], summary => summary);

export const getCartListSKU = createSelector([cartList], data => data.map(item => item.configurable_sku));
