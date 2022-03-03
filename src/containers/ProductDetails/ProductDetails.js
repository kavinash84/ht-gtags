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
import Footer from 'components/Footer';
import Header from 'components/Header';
import ProductDetailsContainer from 'components/ProductDetails';
import ProductDetailsShimmer from 'components/ProductDetails/ProductDetailsShimmer';
import ProductNotFound from './ProductNotFound';

@connect(({ productdetails }) => ({
  ...productdetails
}))
export default class ProductDetails extends Component {
  render() {
    // console.log(this.props);
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
          {!loading && loaded && productDescription && !productDescription.error_message && (
            <ProductDetailsContainer history={history} />
          )}
          {!loading && loaded && productDescription && productDescription.error_message && <ProductNotFound />}

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
