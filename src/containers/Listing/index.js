import HomeTownLoader from 'containers/Loader';
import { provideHooks } from 'redial';
import { encodeCategory } from 'utils/helper';
import { setCurrentPage, resetPagination } from 'redux/modules/pagination';
import {
  isLoaded as isInitialListLoaded,
  setCategoryQuery,
  clearPreviousList,
  clearPreviousSort,
  loadUrlQuery,
  setCategory,
  applyFilter,
  setFilter
} from 'redux/modules/products';
import { PINCODE } from 'helpers/Constants';

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params, location }) => {
    const {
      pincode: { selectedPincode },
      pagination: { page },
      app: { city },
      products: { list, filter: prevFilter },
      router: { location: prevLocation }
    } = getState();
    let prevSearch;
    if (prevLocation) {
      prevSearch = prevLocation.search;
    }
    let query;
    let filters;
    let loadResults;
    const pincode = selectedPincode === '' ? PINCODE : selectedPincode;
    const { search } = location;
    const getPage = search.split('page=')[1];
    const currentPage = getPage || 1;
    if (location.pathname === '/catalog/all-products') {
      const hashQuery = location.search.split('?').join('');
      query = encodeCategory(params);
      loadResults = loadUrlQuery(encodeCategory(params), hashQuery, pincode);
    } else if (location.pathname === '/search/') {
      /* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
      let searchquery;
      [, searchquery] = location.search.split('q=');
      if (searchquery) {
        [searchquery] = searchquery.split('filters=');
        [searchquery] = searchquery.split('&');
      }
      query = encodeCategory({ category: 'search' });
      [, filters] = location.search.split('filters=');
      loadResults = applyFilter({
        searchquery,
        query,
        pincode,
        filters,
        city
      });
    } else {
      query = encodeCategory(params);
      [, filters] = location.search.split('filters=');
      loadResults = applyFilter({
        query,
        pincode,
        filters,
        city
      });
    }
    if (currentPage === 1) await dispatch(resetPagination());
    if (!isInitialListLoaded(getState(), query) || currentPage !== page) {
      await dispatch(clearPreviousList());
      await dispatch(setCurrentPage(currentPage));
      await dispatch(clearPreviousSort());
    }
    if (
      location.search.split('redirect').length > 1 ||
      (prevSearch === search && list.length > 0 && filters === prevFilter)
    ) {
      return;
    }
    await dispatch(loadResults).catch(() => null);
    await dispatch(setCategoryQuery(query, pincode));
    await dispatch(setCategory(query));
    await dispatch(setFilter(filters));
  }
};

const Listing = HomeTownLoader({
  loader: () => import('./Listing' /* webpackChunkName: 'Listing' */)
});

export default provideHooks(hooks)(Listing);
