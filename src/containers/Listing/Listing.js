import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import ListingContainer from 'components/Listing';
import ListingShimmer from 'components/Listing/ListingShimmer';
import { connect } from 'react-redux';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import { getSKUList } from 'selectors/wishlist';
import {
  // load as loadListing,
  loadSearchQuery,
  isLoaded as isInitialListLoaded,
  setCategoryQuery,
  clearPreviousList,
  clearPreviousSort,
  loadUrlQuery,
  clearAllFilters as loadAfterPincodeChange,
  setCategory,
  applyFilter
} from 'redux/modules/products';
import Pagination from 'components/Pagination';
import { getProducts, getCategoryName, getProductCount, getFilters, getAppliedFilters } from 'selectors/products';
import { encodeCategory } from 'utils/helper';
import { setCurrentPage, resetPagination } from 'redux/modules/pagination';
import { PINCODE, SITE_URL } from 'helpers/Constants';

const SearchEmptyIcon = require('../../../static/search-empty.jpg');

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, params, location }) => {
    const {
      // products: { sort },
      pincode: { selectedPincode },
      pagination: { page }
    } = getState();
    let query;
    let filters;
    let loadResults;
    const pincode = selectedPincode === '' ? PINCODE : selectedPincode;
    const { search } = location;
    // const queryString = search.replace('?', '').split('&');
    const getPage = search.split('page=')[1];
    const currentPage = getPage || 1;
    if (location.pathname === '/catalog/all-products') {
      const hashQuery = location.search.split('?').join('');
      query = encodeCategory(params);
      // console.log('1');
      loadResults = loadUrlQuery(encodeCategory(params), hashQuery, pincode);
    } else if (location.pathname === '/search/') {
      /* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: false}}] */
      query = location.search.split('?q=')[1];
      // console.log('2');
      loadResults = loadSearchQuery(query, currentPage, pincode);
    } else {
      // console.log('3');
      query = encodeCategory(params);
      [, filters] = location.search.split('?filters=');
      // loadResults = loadListing(query, currentPage, sort, pincode, filters);
      // [, filters] = location.search.split('?filters=');
      loadResults = applyFilter({ query, pincode, filters });
      dispatch(loadResults).catch(() => null);
    }
    if (currentPage === 1) await dispatch(resetPagination());
    if (!isInitialListLoaded(getState(), query) || currentPage !== page) {
      // console.log('x', currentPage);
      await dispatch(clearPreviousList());
      await dispatch(setCurrentPage(currentPage));
      await dispatch(clearPreviousSort());
      await dispatch(loadResults).catch(() => null);
    }
    await dispatch(setCategoryQuery(query, pincode));
    await dispatch(setCategory(query));
  }
})
@connect(state => ({
  loading: state.products.loading,
  loaded: state.products.loaded,
  shimmer: state.products.shimmer,
  category: state.products.query,
  page: state.loadmore.page,
  filters: getFilters(state),
  appliedFilters: getAppliedFilters(state),
  wishListedSKUs: getSKUList(state.wishlist),
  wishListData: state.wishlist.data,
  wishlistLoading: state.wishlist.loading,
  wishlistKey: state.wishlist.key,
  pincode: state.pincode.selectedPincode,
  products: getProducts(state),
  categoryName: getCategoryName(state),
  productCount: getProductCount(state),
  isLoggedIn: state.userLogin.isLoggedIn,
  metadata: state.products.list,
  sortBy: state.products.filters.sortBy,
  categoryquery: state.products.category
}))
@withRouter
export default class Listing extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    shimmer: PropTypes.bool,
    products: PropTypes.array,
    metadata: PropTypes.array,
    category: PropTypes.string,
    categoryName: PropTypes.string,
    productCount: PropTypes.string,
    wishListedSKUs: PropTypes.array,
    wishListData: PropTypes.array,
    wishlistLoading: PropTypes.bool,
    wishlistKey: PropTypes.string,
    filters: PropTypes.array,
    appliedFilters: PropTypes.array,
    history: PropTypes.object.isRequired,
    pincode: PropTypes.string,
    sortBy: PropTypes.string.isRequired,
    categoryquery: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    loading: false,
    loaded: true,
    shimmer: false,
    products: [],
    categoryName: '',
    category: '',
    productCount: '0',
    wishListedSKUs: [],
    wishListData: [],
    wishlistLoading: false,
    wishlistKey: '',
    filters: [],
    appliedFilters: [],
    metadata: null,
    pincode: '',
    isLoggedIn: false
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.pincode !== this.props.pincode) {
      const { dispatch } = this.context.store;
      const { category } = this.props;
      dispatch(loadAfterPincodeChange(category, nextProps.pincode));
    }
  }
  render() {
    const {
      loading,
      loaded,
      shimmer,
      products,
      categoryName,
      category,
      filters,
      productCount,
      isLoggedIn,
      pincode,
      history,
      wishListedSKUs,
      wishListData,
      wishlistLoading,
      wishlistKey,
      metadata,
      appliedFilters,
      sortBy,
      categoryquery
    } = this.props;
    let page;
    const {
      location: { search, pathname }
    } = history;
    if (search !== '') {
      page = search.replace('?', '').split('page=')[1];
    }
    const previousPage = !page || Number(page) === 1 ? '' : `?page=${page - 1}`;
    const NextPage = !page ? '?page=2' : `?page=${Number(page) + 1}`;
    return (
      <Section p="0" mb="0">
        <Helmet>
          <link rel="canonical" href={`${SITE_URL}${pathname}${previousPage}`} />
          <link rel="next" href={`${SITE_URL}${pathname}${NextPage}`} />
        </Helmet>
        <div className="wrapper">
          <Menu filter search />
          {!loading &&
            products.length === 0 && (
            <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
              <Empty
                title="Sorry no results found"
                subTitle="Please check the Spelling or by a different search"
                btnName="Search Again"
                url="/"
                bg="#fafafa"
              >
                <Img src={SearchEmptyIcon} width="initial" m="auto" alt="Sorry no results found" />
              </Empty>
            </Section>
          )}
          {!loaded && loading && !products.length && <ListingShimmer />}
          {loaded && products.length && !shimmer ? (
            <div>
              <ListingContainer
                wishList={wishListedSKUs}
                wishListData={wishListData}
                products={products}
                categoryName={categoryName}
                productCount={productCount}
                category={category}
                filters={filters}
                sortBy={sortBy}
                appliedFilters={appliedFilters}
                history={history}
                pincode={pincode}
                isLoggedIn={isLoggedIn}
                wishlistLoading={wishlistLoading}
                wishlistKey={wishlistKey}
                metaResults={metadata}
                categoryquery={categoryquery}
              />
              <Pagination
                loading={loading}
                loaded={loaded}
                history={history}
                categoryquery={categoryquery}
                pageRangeDisplayed={9}
              />
            </div>
          ) : (
            shimmer && <ListingShimmer />
          )}
        </div>
        <Footer />
      </Section>
    );
  }
}
