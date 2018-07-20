import React, { Component } from 'react';
import { provideHooks } from 'redial';
import ProductDetailsContainer from 'components/ProductDetails';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import Section from 'hometown-components/lib/Section';
import { loadProductDescription } from 'redux/modules/productdetails';
import { loadColorProducts } from 'redux/modules/colorproducts';

import { loadReview } from 'redux/modules/reviews';

@provideHooks({
  fetch: async ({ store: { dispatch, getState }, params }) => {
    const { productdetails: { currentsku }, pincode: { selectedPincode } } = getState();
    if (currentsku !== params.skuId) {
      await dispatch(loadProductDescription(params.skuId, selectedPincode));
    }
  },
  defer: ({ store: { dispatch, getState }, params }) => {
    const { productdetails: { currentsku }, pincode: { selectedPincode } } = getState();
    if (currentsku !== params.skuId || getState().reviews.data.length === 0) {
      dispatch(loadReview(params.skuId));
    }
    if (currentsku !== params.skuId || getState().colorproducts.list.length === 0) {
      dispatch(loadColorProducts(params.skuId, selectedPincode));
    }
  }
})
export default class ProductDetails extends Component {
  render() {
    return (
      <Section p="0" mb="0">
        <div className="wrapper">
          <Menu />
          <ProductDetailsContainer />
        </div>
        <Footer />
      </Section>
    );
  }
}
