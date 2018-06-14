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
import LoadMore from 'components/LoadMore';
import { getSKUList } from 'selectors/wishlist';
import {
  load as loadListing,
  loadSearchQuery,
  isLoaded as isInitialListLoaded,
  setCategoryQuery,
  clearPreviousList
} from 'redux/modules/products';
import { getProducts, getCategoryName, getProductCount } from 'selectors/products';
import { resetLoadMore } from 'redux/modules/loadmore';
import { encodeCategory } from 'utils/helper';

const SearchEmptyIcon = require('../../../static/search-empty.jpg');

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, params, location }) => {
    const query = location.pathname === '/search/' ? location.search.split('?q=')[1] : encodeCategory(params);
    const loadResults = location.pathname === '/search/' ? loadSearchQuery(query, 1) : loadListing(query, 1);
    if (!isInitialListLoaded(getState(), query)) {
      await dispatch(clearPreviousList());
      await dispatch(resetLoadMore());
      await dispatch(loadResults).catch(() => null);
    }
    await dispatch(setCategoryQuery(query));
  }
})
@connect(state => ({
  loading: state.products.loading,
  loaded: state.products.loaded,
  wishListedSKUs: getSKUList(state.wishlist),
  wishListData: state.wishlist.data,
  products: getProducts(state),
  categoryName: getCategoryName(state),
  productCount: getProductCount(state)
}))
@withRouter
export default class Listing extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    products: PropTypes.array,
    categoryName: PropTypes.string,
    productCount: PropTypes.string,
    wishListedSKUs: PropTypes.array,
    wishListData: PropTypes.array
  };
  static defaultProps = {
    loading: false,
    loaded: true,
    products: [],
    categoryName: '',
    productCount: '0',
    wishListedSKUs: [],
    wishListData: []
  };
  render() {
    const {
      loading, loaded, products, categoryName, productCount
    } = this.props;
    const { wishListedSKUs, wishListData } = this.props;
    return (
      <div>
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
            />
            <LoadMore loading={loading} loaded={loaded} />
          </div>
        )}
      </div>
    );
  }
}
