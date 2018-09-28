import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
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
import { clearAllFilters as loadAfterPincodeChange } from 'redux/modules/products';
import Pagination from 'components/Pagination';
import SeoContent from 'components/SeoContent';
import {
  getProducts,
  getCategoryName,
  getProductCount,
  getFilters,
  getAppliedFilters,
  getSEOInfo
} from 'selectors/products';
import { SITE_URL } from 'helpers/Constants';
import CANONICALS from 'data/canonical';

const SearchEmptyIcon = require('../../../static/search-empty.jpg');

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
  loadingList: state.wishlist.loadingList,
  pincode: state.pincode.selectedPincode,
  products: getProducts(state),
  categoryName: getCategoryName(state),
  productCount: getProductCount(state),
  isLoggedIn: state.userLogin.isLoggedIn,
  metadata: state.products.list,
  sortBy: state.products.filters.sortBy,
  categoryquery: state.products.category,
  seoInfo: getSEOInfo(state),
  breadCrumbs: state.products.categoryDetails,
  currentPage: state.pagination.page
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
    loadingList: PropTypes.array,
    filters: PropTypes.array,
    appliedFilters: PropTypes.array,
    history: PropTypes.object.isRequired,
    pincode: PropTypes.string,
    sortBy: PropTypes.string,
    categoryquery: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool,
    seoInfo: PropTypes.object,
    breadCrumbs: PropTypes.array,
    currentPage: PropTypes.number
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
    productCount: '',
    wishListedSKUs: [],
    wishListData: [],
    loadingList: [],
    filters: [],
    appliedFilters: [],
    metadata: null,
    pincode: '',
    sortBy: '',
    isLoggedIn: false,
    seoInfo: {},
    breadCrumbs: [],
    currentPage: 1
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
      loadingList,
      metadata,
      appliedFilters,
      sortBy,
      categoryquery,
      seoInfo,
      breadCrumbs,
      currentPage
    } = this.props;
    let page;
    const {
      location: { search, pathname }
    } = history;
    if (search !== '') {
      [, page] = search.replace('?', '').split('page=');
    } else page = currentPage;
    const previousPage = !page || Number(page) === 1 ? '' : `?page=${page - 1}`;
    const NextPage = !page ? '?page=2' : `?page=${Number(page) + 1}`;
    /* eslint-disable react/no-danger */
    return (
      <Section p="0rem" mb="0">
        <Helmet>
          <title>{seoInfo && seoInfo.page_title}</title>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta name="description" content={seoInfo && seoInfo.meta_description} />
          {CANONICALS[pathname] && <link rel="canonical" href={`${SITE_URL}${CANONICALS[pathname]}`} />}
          {previousPage !== '' && <link rel="prev" href={`${SITE_URL}${pathname}${previousPage}`} />}
          {productCount / 32 / Number(page) > 1 && <link rel="next" href={`${SITE_URL}${pathname}${NextPage}`} />}
        </Helmet>
        <div className="wrapper">
          <Menu />
          {!loading &&
            products.length === 0 && (
            <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
              <Empty
                title="Sorry no results found"
                subTitle="Please check the Spelling or by a different search"
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
                loadingList={loadingList}
                metaResults={metadata}
                categoryquery={categoryquery}
                breadCrumbs={breadCrumbs}
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
        {seoInfo &&
          seoInfo.seo_text && (
          <SeoContent>
            <div dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }} />
          </SeoContent>
        )}
        <Footer />
      </Section>
    );
  }
}
