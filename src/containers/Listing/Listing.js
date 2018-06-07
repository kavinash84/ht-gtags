import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import ListingContainer from 'components/Listing';
import { connect } from 'react-redux';
import Menu from 'containers/MenuNew/index';
import LoadMore from 'components/LoadMore';
import { getWishList } from 'selectors/wishlist';
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
import ProductsNotFound from 'components/Listing/EmptyList';

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
  wishList: getWishList(state),
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
    productCount: PropTypes.string
  };
  static defaultProps = {
    loading: false,
    loaded: true,
    products: [],
    categoryName: '',
    productCount: '0'
  };
  state = {
    wishListState: []
  };
  /* TODO Fix the rehydrate store issue [Server client Mismatch] */
  /* TODO Sync Store Globally Instead of LifeCycle Methods */
  /* eslint-disable */
  componentDidMount() {
    const { wishList } = this.props;
    this.setState({
      wishListState: wishList
    });
  }

  /* eslint-enable */
  componentWillReceiveProps(nextProps) {
    const { wishList } = nextProps;
    this.setState({
      wishListState: wishList
    });
  }
  render() {
    const {
      loading, loaded, products, categoryName, productCount
    } = this.props;
    const { wishListState } = this.state;
    return (
      <div>
        <Menu filter search />
        {!loading && products.length === 0 && <ProductsNotFound />}
        {loaded &&
          products.length && (
          <div>
            <ListingContainer
              wishList={wishListState}
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
