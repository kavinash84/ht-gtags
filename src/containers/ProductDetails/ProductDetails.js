import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import ProductDetailsContainer from 'components/ProductDetails';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import Section from 'hometown-components/lib/Section';
import ProductDetailsShimmer from 'components/ProductDetails/ProductDetailsShimmer';
import { loadProductDescription } from 'redux/modules/productdetails';
import { loadColorProducts } from 'redux/modules/colorproducts';
import { load as loadRelatedProducts } from 'redux/modules/relatedproducts';
import { loadEmiOptions } from 'redux/modules/emioptions';
import { setRecentlyViewed } from 'redux/modules/recentlyviewed';
import { loadReview } from 'redux/modules/reviews';
import { PINCODE } from '../../helpers/Constants';
import ProductNotFoundContainer from './ProductNotFound';

@provideHooks({
  defer: ({ store: { dispatch, getState }, params }) => {
    const { productdetails: { currentsku }, pincode: { selectedPincode }, reviews } = getState();
    const pincode = selectedPincode || PINCODE;
    if (currentsku !== params.skuId) {
      dispatch(loadProductDescription(params.skuId, pincode));
    }
    if (currentsku !== params.skuId || reviews.data.length === 0) {
      dispatch(loadReview(params.skuId));
    }
    dispatch(loadColorProducts(params.skuId, pincode));
    dispatch(loadRelatedProducts(params.skuId, pincode));
    dispatch(setRecentlyViewed(params.skuId));
    dispatch(loadEmiOptions(params.skuId, pincode));
  }
})
@connect(({ productdetails }) => ({
  ...productdetails
}))
export default class ProductDetails extends Component {
  render() {
    const {
      loading, loaded, history, productDescription
    } = this.props;
    return (
      <Section p="0" mb="0">
        <div className="wrapper">
          <Menu />
          {loading && <ProductDetailsShimmer />}
          {!loading &&
            loaded && (
            <div itemScope itemType="http://schema.org/Product">
              <ProductDetailsContainer history={history} />
            </div>
          )}
          {!loading && !loaded && Object.keys(productDescription).length === 0 && <ProductNotFoundContainer />}
        </div>
        <Footer />
      </Section>
    );
  }
}

ProductDetails.defaultProps = {
  loading: false,
  loaded: false,
  productDescription: {}
};

ProductDetails.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  productDescription: PropTypes.object,
  history: PropTypes.object.isRequired
};
