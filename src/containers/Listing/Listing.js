import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import ListingContainer from 'components/Listing';
import { connect } from 'react-redux';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import LoadMore from 'components/LoadMore';
import { getSKUList } from 'selectors/wishlist';
import {
  load as loadListing,
  loadSearchQuery,
  isLoaded as isInitialListLoaded,
  setCategoryQuery,
  clearPreviousList,
  clearPreviousSort,
  clearAllFilters as loadAfterPincodeChange
} from 'redux/modules/products';
import { getProducts, getCategoryName, getProductCount } from 'selectors/products';
import { resetLoadMore } from 'redux/modules/loadmore';
import { encodeCategory, getFilters } from 'utils/helper';

const SearchEmptyIcon = require('../../../static/search-empty.jpg');

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, params, location }) => {
    const {
      products: { sort },
      pincode: { selectedPincode }
    } = getState();
    const query = location.pathname === '/search/' ? location.search.split('?q=')[1] : encodeCategory(params);
    console.log(location.pathname);
    const loadResults =
      location.pathname === '/search/'
        ? loadSearchQuery(query, 1, selectedPincode)
        : loadListing(query, 1, sort, selectedPincode);
    if (!isInitialListLoaded(getState(), query)) {
      await dispatch(clearPreviousList());
      await dispatch(clearPreviousSort());
      await dispatch(resetLoadMore());
      await dispatch(loadResults).catch(() => null);
    }
    await dispatch(setCategoryQuery(query, selectedPincode));
  }
})
@connect(state => ({
  loading: state.products.loading,
  loaded: state.products.loaded,
  category: state.products.query,
  page: state.loadmore.page,
  filters: getFilters(state.products.data.metadata.filter),
  wishListedSKUs: getSKUList(state.wishlist),
  wishListData: state.wishlist.data,
  wishlistLoading: state.wishlist.loading,
  wishlistKey: state.wishlist.key,
  pincode: state.pincode.selectedPincode,
  products: getProducts(state),
  categoryName: getCategoryName(state),
  productCount: getProductCount(state),
  isLoggedIn: state.userLogin.isLoggedIn,
  metadata: state.products.data.metadata
}))
@withRouter
export default class Listing extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    products: PropTypes.array,
    metadata: PropTypes.object,
    category: PropTypes.string,
    categoryName: PropTypes.string,
    productCount: PropTypes.string,
    wishListedSKUs: PropTypes.array,
    wishListData: PropTypes.array,
    wishlistLoading: PropTypes.bool,
    wishlistKey: PropTypes.string,
    filters: PropTypes.array,
    history: PropTypes.object.isRequired,
    pincode: PropTypes.string,
    isLoggedIn: PropTypes.bool
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    loading: false,
    loaded: true,
    products: [],
    categoryName: '',
    category: '',
    productCount: '0',
    wishListedSKUs: [],
    wishListData: [],
    wishlistLoading: false,
    wishlistKey: '',
    filters: [],
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
      metadata
    } = this.props;
    const { results: metaResults } = metadata;
    return (
      <Section p="0" mb="0">
        <div className="wrapper">
          <Menu filter search />
          {!loading &&
            products.length === 0 && (
            <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
              <Empty
                title="Sorry no results found"
                subTitle="Please check the selling or by a different search"
                btnName="Search Again"
                url="/"
                bg="#fafafa"
              >
                <Img src={SearchEmptyIcon} width="initial" m="auto" alt="Sorry no results found" />
              </Empty>
            </Section>
          )}
          {loaded &&
            products.length && (
            <div>
              <ListingContainer
                wishList={wishListedSKUs}
                wishListData={wishListData}
                products={products}
                categoryName={categoryName}
                productCount={productCount}
                category={category}
                filters={filters}
                history={history}
                pincode={pincode}
                isLoggedIn={isLoggedIn}
                wishlistLoading={wishlistLoading}
                wishlistKey={wishlistKey}
                metaResults={metaResults}
              />
              <LoadMore loading={loading} loaded={loaded} />
            </div>
          )}
        </div>
        <Footer />
      </Section>
    );
  }
}
