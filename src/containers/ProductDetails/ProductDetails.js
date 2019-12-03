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
          {loading && !loaded && <ProductDetailsShimmer />}
          {!loading && loaded && productDescription && productDescription.error_message && <ProductNotFoundContainer />}
          {!loading && !productDescription.error_message && loaded && (
            <div>
              <ProductDetailsContainer history={history} />
            </div>
          )}
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
