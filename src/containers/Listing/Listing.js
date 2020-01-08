import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { getSKUList } from 'selectors/wishlist';
import { setReloadListing } from 'redux/modules/products';

import Box from 'hometown-components-dev/lib/BoxHtV1';
// import Img from 'hometown-components-dev/lib/ImageHtV1';
// import Section from 'hometown-components-dev/lib/SectionHtV1';
import ListingContainer from 'newComponents/Listing';
// import ListingShimmer from 'newComponents/Listing/ListingShimmer';
import Footer from 'newComponents/Footer';
import Header from 'newComponents/Header';
// import Pagination from 'newComponents/Pagination';
// import SeoContent from 'newComponents/SeoContent';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';

import {
  getProducts,
  getCategoryName,
  getProductCount,
  getFilters,
  getAppliedFilters,
  getSEOInfo,
  getl4
} from 'selectors/products';
import { SITE_URL } from 'helpers/Constants';
import CANONICALS from 'data/canonical';

// const SearchEmptyIcon = require('../../../static/search-empty.png');

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
  currentPage: state.pagination.page,
  categoryBar: getl4(state),
  selectedPincode: state.pincode.selectedPincode
}))
@withRouter
export default class Listing extends Component {
  static propTypes = {
    // loading: PropTypes.bool,
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
    currentPage: PropTypes.number,
    categoryBar: PropTypes.array,
    selectedPincode: PropTypes.string
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    // loading: false,
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
    currentPage: 1,
    categoryBar: [],
    selectedPincode: ''
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.pincode !== this.props.pincode) {
      const { dispatch } = this.context.store;
      const { history } = this.props;
      const {
        location: { search, pathname }
      } = history;
      dispatch(setReloadListing(true));
      history.push(`${pathname}${search}`);
    }
  }
  render() {
    const {
      // loading,
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
      currentPage,
      categoryBar,
      selectedPincode
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
      <Wrapper>
        <Helmet>
          <title>{seoInfo && seoInfo.page_title}</title>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta name="description" content={seoInfo && seoInfo.meta_description} />
          {CANONICALS[pathname] && <link rel="canonical" href={`${SITE_URL}${CANONICALS[pathname]}`} />}
          {previousPage !== '' && Number(page) !== 2 && (
            <link rel="prev" href={`${SITE_URL}${pathname}${previousPage}`} />
          )}
          {Number(page) === 2 && <link rel="prev" href={`${SITE_URL}${pathname}`} />}
          {productCount / 32 / Number(page) > 1 && <link rel="next" href={`${SITE_URL}${pathname}${NextPage}`} />}
        </Helmet>
        <Body>
          <Header />
          {/* {!loading && products.length === 0 && (
            <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
              <Box
                title="Sorry! No Results Found"
                subTitle="Please check the Spelling or by a different search"
                url="/"
                bg="#fafafa"
              >
                <Img src={SearchEmptyIcon} width="initial" m="auto" alt="Sorry no results found" />
              </Box>
            </Section>
          )} */}
          {/* {!loaded && loading && !products.length && <ListingShimmer />} */}

          {loaded && products.length && !shimmer ? (
            <Box>
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
                categoryBar={categoryBar}
                selectedPincode={selectedPincode}
              />
              {/* <Pagination
                loading={loading}
                loaded={loaded}
                history={history}
                categoryquery={categoryquery}
                pageRangeDisplayed={9}
              /> */}
            </Box>
          ) : (
            {
              /* shimmer && () */
            }
          )}
          {/* {seoInfo && seoInfo.seo_text && (
          <SeoContent>
            <Box dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }} />
          </SeoContent>
        )} */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}
