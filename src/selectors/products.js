import { createSelector } from 'reselect';

export const products = state => state.products;

export const productsData = createSelector([products], list => list.data);

export const productMeta = createSelector(
  [products],
  meta =>
    'metadata' in meta.data
      ? meta.data.metadata
      : {
        searchterm: '',
        product_catname: '',
        product_count: '',
        results: []
      }
);

export const getProducts = createSelector([products], items => items.list || []);

export const productsList = createSelector([productMeta], productList => productList.results);

export const getProductCount = createSelector([productMeta], category => category.product_count);

export const getCategoryName = createSelector(
  [productMeta],
  category =>
    'searchterm' in category && category.searchterm !== ''
      ? `Search results for "${category.searchterm}"`
      : category.product_catname
);
