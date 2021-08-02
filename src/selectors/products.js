import { createSelector } from 'reselect';
import filterName from '../data/Filter.js';

export const products = state => state.products;
export const relatedproducts = state => state.relatedproducts;

export const productsData = createSelector([products], list => list.data);

export const productMeta = createSelector([products], meta =>
  'metadata' in meta.data
    ? meta.data.metadata
    : {
        searchterm: '',
        product_catname: '',
        product_count: '0',
        results: [],
        filter: [],
        seo: {}
      });

export const getProducts = createSelector([products], items => items.list || []);

export const productsList = createSelector([productMeta], productList => productList.results);

export const getProductCount = createSelector([productMeta], category => category.product_count || '');

export const getCategoryName = createSelector([productMeta], category =>
  'searchterm' in category && category.searchterm !== ''
    ? `Search results for "${category.searchterm}"`
    : category.product_catname);

export const filtersArr = createSelector([productMeta], productList => productList.filter || []);

export const getColorFilter = createSelector([filtersArr], filters =>
  filters.filter(filter => filter.name === 'Color'));

export const colorArr = createSelector([getColorFilter], list =>
  list.length > 0
    ? list.map(attr =>
        attr.attributes.constructor === Array
          ? attr
          : {
              ...attr,
              attributes: [...Object.values(attr.attributes)]
            })
    : []);

export const filtersList = createSelector(
  [filtersArr, colorArr],
  (list, colorFilter) => [...list.filter(x => x.attributes && x.attributes.constructor === Array), ...colorFilter] || []
);

export const getFilters = createSelector([filtersList], filters =>
  filters.filter(item => filterName.includes(item.name)));

export const getAppliedFilters = createSelector([getFilters], filters =>
  filters.constructor === Array
    ? filters.map(item =>
        item.attributes && item.attributes.constructor === Array ? item.attributes.filter(x => x.isSelected) : [])
    : []);

export const relatedProductsList = createSelector([relatedproducts], items => items.data || []);

export const getSEOInfo = createSelector([productMeta], seoInfo =>
  seoInfo && seoInfo.seo && Object.keys(seoInfo.seo).length > 0 ? seoInfo.seo.items : null);

export const getCMSJson = createSelector(
  [productMeta],
  seoInfo => (seoInfo && seoInfo.seo && Object.keys(seoInfo.seo).length > 0 && seoInfo.seo.items ? seoInfo.seo.items.cms_json : null)
)

export const getCategoryDetails = createSelector([productMeta], item => item.category_details || []);

export const getl4 = state => {
  const catData = getCategoryDetails(state);
  const l4 = [];
  const getChildren = node => {
    if (node && node.children && node.children.length) {
      node.children.map(item => {
        l4.push(item);
        return 0;
      });
    }
  };
  if (catData.length > 0) {
    if (catData[catData.length - 1].children) {
      getChildren(catData[catData.length - 1]);
    } else {
      getChildren(catData[catData.length - 2]);
    }
  }
  return l4;
};
