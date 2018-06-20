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
  clearPreviousSort
} from 'redux/modules/products';
import { getProducts, getCategoryName, getProductCount } from 'selectors/products';
import { resetLoadMore } from 'redux/modules/loadmore';
import { encodeCategory, getFilters } from 'utils/helper';

const SearchEmptyIcon = require('../../../static/search-empty.jpg');

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, params, location }) => {
    const { products: { sort } } = getState();
    const query = location.pathname === '/search/' ? location.search.split('?q=')[1] : encodeCategory(params);
    const loadResults = location.pathname === '/search/' ? loadSearchQuery(query, 1) : loadListing(query, 1, sort);
    if (!isInitialListLoaded(getState(), query)) {
      await dispatch(clearPreviousList());
      await dispatch(clearPreviousSort());
      await dispatch(resetLoadMore());
      await dispatch(loadResults).catch(() => null);
    }
    await dispatch(setCategoryQuery(query));
  }
})
@connect(state => ({
  loading: state.products.loading,
  loaded: state.products.loaded,
  category: state.products.query,
  filters: getFilters(state.products.data.metadata.filter),
  wishListedSKUs: getSKUList(state.wishlist),
  wishListData: state.wishlist.data,
  products: getProducts(state),
  categoryName: getCategoryName(state),
  productCount: getProductCount(state),
  isLoggedIn: state.userLogin.isLoggedIn
}))
@withRouter
export default class Listing extends Component {
  static defaultProps = {
    loading: false,
    loaded: true,
    products: [],
    categoryName: '',
    category: '',
    productCount: '0',
    wishListedSKUs: [],
    wishListData: [],
    filters: [],
    isLoggedIn: false
  };
  static propTypes = {
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    products: PropTypes.array,
    category: PropTypes.string,
    categoryName: PropTypes.string,
    productCount: PropTypes.string,
    wishListedSKUs: PropTypes.array,
    wishListData: PropTypes.array,
    filters: PropTypes.array,
    history: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool
  };
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
      history
    } = this.props;
    const { wishListedSKUs, wishListData } = this.props;
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
                isLoggedIn={isLoggedIn}
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
