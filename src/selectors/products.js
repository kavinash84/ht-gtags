import { createSelector } from 'reselect';
import filterName from '../data/Filter.js';

export const products = state => state.products;
export const relatedproducts = state => state.relatedproducts;

export const productsData = createSelector([products], list => list.data);

export const productMeta = createSelector(
  [products],
  meta =>
    'metadata' in meta.data
      ? meta.data.metadata
      : {
        searchterm: '',
        product_catname: '',
        product_count: '0',
        results: [],
        filter: [],
        seo: {}
      }
);

export const getProducts = createSelector([products], items => items.list || []);

export const productsList = createSelector([productMeta], productList => productList.results);

export const getProductCount = createSelector([productMeta], category => category.product_count || '');

export const getCategoryName = createSelector(
  [productMeta],
  category =>
    'searchterm' in category && category.searchterm !== ''
      ? `Search results for "${category.searchterm}"`
      : category.product_catname
);

export const filtersList = createSelector([productMeta], productList => productList.filter || []);

export const getFilters = createSelector([filtersList], filters =>
  filters.filter(item => filterName.includes(item.name)));

export const getAppliedFilters = createSelector([getFilters], filters =>
  filters.map(item => item.attributes.filter(x => x.isSelected)));

export const relatedProductsList = createSelector([relatedproducts], items => items.data || []);

export const getSEOInfo = createSelector(
  [productMeta],
  seoInfo => (Object.keys(seoInfo.seo).length > 0 ? seoInfo.seo.items : null)
);
