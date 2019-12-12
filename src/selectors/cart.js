import { createSelector } from 'reselect';

export const cartList = cart => cart.data || [];

export const cartSummary = cart =>
  cart.summary || {
    items_count: 0
  };

export const getCartList = createSelector(
  [cartList],
  data => data.filter(item => item.product_info.product_id !== '') || []
);

export const getCartCount = createSelector([cartSummary], items => items.items_count || 0);

export const getCartSummary = createSelector([cartSummary], summary => summary);

export const getCartListSKU = createSelector([getCartList], data => data.map(item => item.configurable_sku));
export const getStockOutProducts = createSelector([getCartList], products =>
  products.filter(product => product.product_info.stock < product.qty).map(sku => sku.configurable_sku));

export const cartListFromResult = cart => cart.cart || [];
export const getCartListFromResult = createSelector(
  [cartListFromResult],
  data => data.filter(item => item.product_info.product_id !== '') || []
);
export const getCartListSKUFromResult = createSelector([getCartListFromResult], data =>
  data.map(item => item.configurable_sku));

export const getNotDelivered = createSelector([getCartList], products =>
  products.filter(product => product.product_info.is_deliverable === false));
