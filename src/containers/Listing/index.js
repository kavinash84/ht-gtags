import HomeTownLoader from "containers/Loader";
import { provideHooks } from "redial";
import { encodeCategory } from "utils/helper";
import { setCurrentPage, resetPagination } from "redux/modules/pagination";
import {
  // isLoaded as isInitialListLoaded,
  setCategoryQuery,
  clearPreviousList,
  clearPreviousSort,
  setCategory,
  applyFilter,
  setFilter,
  gaTrack as listingLoadTrack,
  setReloadListing
} from "redux/modules/products";
import { getOfferStrip } from "redux/modules/offer";
import {
  load as loadListingBanners,
  isLoaded as isStoresLoaded
} from "redux/modules/listingbanners";
import { PINCODE } from "helpers/Constants";

const hooks = {
  fetch: async ({ store: { dispatch, getState }, params, location }) => {
    const {
      pincode: { selectedPincode },
      // pagination: { page },
      app: { city }
      // products: { filter: prevFilter, reloadListing }
    } = getState();
    let query;
    let filters;
    let loadResults;
    const pincode = selectedPincode === "" ? PINCODE : selectedPincode;
    const { search } = location;
    const urlCategoryArr = location.pathname.split("/");
    const urlCategory = urlCategoryArr[`${urlCategoryArr.length - 1}`]
      ? urlCategoryArr[`${urlCategoryArr.length - 1}`]
      : urlCategoryArr[`${urlCategoryArr.length - 2}`];
    // console.log(urlCategoryArr, urlCategory, 'url check');
    const getPage = search.split("page=")[1];
    const currentPage = getPage || 1;
    if (location.pathname === "/search") {
      /* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
      let searchquery;
      [, searchquery] = location.search.split("q=");
      if (searchquery) {
        [searchquery] = searchquery.split("filters=");
        [searchquery] = searchquery.split("&");
      }
      query = encodeCategory({ category: "search" });
      [, filters] = location.search.split("filters=");
      loadResults = applyFilter({
        searchquery,
        query,
        pincode,
        filters,
        city
      });
    } else {
      query = encodeCategory(params);
      [, filters] = location.search.split("filters=");
      loadResults = applyFilter({
        query,
        pincode,
        filters,
        city
      });
    }
    if (currentPage === 1) await dispatch(resetPagination());
    // if (
    //   !isInitialListLoaded(getState(), query) ||
    //   Number(currentPage) !== Number(page) ||
    //   (filters && filters !== prevFilter) ||
    //   prevFilter === 'clearAll' ||
    //   reloadListing
    // ) {
    await dispatch(getOfferStrip(urlCategory));
    await dispatch(clearPreviousList());
    await dispatch(setCurrentPage(currentPage));
    await dispatch(clearPreviousSort());
    if (location.pathname !== "/search") {
      await dispatch(loadResults).catch(() => null);
    } else {
      await dispatch(setReloadListing(true));
    }
    // await dispatch(setReloadListing(false));
    await dispatch(setCategoryQuery(query, pincode));
    await dispatch(setCategory(query));
    await dispatch(setFilter(filters));
    // }
    // if (location.pathname !== '/search') {
    //   const query = encodeCategory(params);
    //   await dispatch(getCategoryForUNBXD({ query })).catch(() => null);
    // } else {
    //   await dispatch(setReloadListing(true));
    // }

    if (!isStoresLoaded(getState())) {
      await dispatch(loadListingBanners()).catch(error => console.log(error));
    }
  },
  done: ({ store: { dispatch } }) => dispatch(listingLoadTrack())
};

const Listing = HomeTownLoader({
  loader: () => import("./Listing" /* webpackChunkName: 'Listing' */)
});

export default provideHooks(hooks)(Listing);
