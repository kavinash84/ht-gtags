import { createSelector } from 'reselect';

export const product = state => state;

export const productDescription = createSelector([product], details => details.productDescription);

export const groupedAttributes = createSelector([productDescription], attributes => attributes.groupedattributes);

export const meta = createSelector([productDescription], attributes => attributes.meta);

export const simples = createSelector([productDescription], attributes => attributes.simples);

export const categoryDetails = createSelector([meta], list => list.category_data || null);

export const category = createSelector([meta], list => list.category_details.slice(-1)[0] || []);

export const getBreadCrumbs = state => {
  let catData = categoryDetails(state);
  const breadcrumbs = [];
  if (catData) {
    while (catData) {
      breadcrumbs.push({ name: catData[0].name, urlkey: catData[0].url_key });
      catData = catData[0].children;
    }
    return breadcrumbs;
  }
};

export const getSimpleSku = createSelector([simples], x => Object.keys(x)[0]);
