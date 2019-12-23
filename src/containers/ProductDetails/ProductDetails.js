import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Components
 */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/**
 * Page Components
 */
import Footer from 'newComponents/Footer';
import Header from 'newComponents/Header';
import ProductDetailsContainer from 'newComponents/ProductDetails';
import ProductDetailsShimmer from 'newComponents/ProductDetails/ProductDetailsShimmer';
import ProductNotFound from './ProductNotFound';

@connect(({ productdetails }) => ({
  ...productdetails
}))
export default class ProductDetails extends Component {
  render() {
    const {
 loading, loaded, history, productDescription
} = this.props;
    return (
      <Wrapper>
        <Body>
          {/* Header */}
          <Header />

          {/* PDP Content */}
          {loading && !loaded && <ProductDetailsShimmer />}
          {!loading && loaded && productDescription && productDescription.error_message && <ProductNotFound />}
          {!loading && !productDescription.error_message && loaded && <ProductDetailsContainer history={history} />}

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
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
