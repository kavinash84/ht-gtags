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
import { setRecentlyViewed } from 'redux/modules/recentlyviewed';

import { loadReview } from 'redux/modules/reviews';
import { PINCODE } from '../../helpers/Constants';

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const { productdetails: { currentsku }, pincode: { selectedPincode } } = getState();
    const pincode = selectedPincode || PINCODE;
    if (currentsku !== params.skuId) {
      await dispatch(loadProductDescription(params.skuId, pincode));
    }
  },
  defer: ({ store: { dispatch, getState }, params }) => {
    const {
      productdetails: { currentsku }, pincode: { selectedPincode }, colorproducts, reviews
    } = getState();
    const pincode = selectedPincode || PINCODE;
    if (currentsku !== params.skuId || reviews.data.length === 0) {
      dispatch(loadReview(params.skuId));
    }
    if (currentsku !== params.skuId || colorproducts.list.length === 0) {
      dispatch(loadColorProducts(params.skuId, pincode));
    }
    dispatch(loadRelatedProducts(params.skuId, pincode));
    dispatch(setRecentlyViewed(params.skuId));
  }
})
@connect(({ productdetails }) => ({
  ...productdetails
}))
export default class ProductDetails extends Component {
  render() {
    const { loading, loaded } = this.props;
    return (
      <Section p="0" mb="0">
        <div className="wrapper">
          <Menu />
          {loading && !loaded && <ProductDetailsShimmer />}
          <div itemScope itemType="http://schema.org/Product">
            <ProductDetailsContainer />
          </div>
        </div>
        <Footer />
      </Section>
    );
  }
}

ProductDetails.defaultProps = {
  loading: false,
  loaded: false
};

ProductDetails.propTypes = {
  loading: PropTypes.bool,
  loaded: PropTypes.bool
};
