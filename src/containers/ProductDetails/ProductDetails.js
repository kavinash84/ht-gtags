import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductDetailsContainer from 'components/ProductDetails';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import Section from 'hometown-components/lib/Section';
import ProductDetailsShimmer from 'components/ProductDetails/ProductDetailsShimmer';
import ProductNotFoundContainer from './ProductNotFound';

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
