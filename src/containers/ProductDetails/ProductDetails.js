import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductDetailsContainer from 'newComponents/ProductDetails';
// import Footer from 'components/Footer';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import Header from 'newComponents/Header';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ProductDetailsShimmer from 'newComponents/ProductDetails/ProductDetailsShimmer';
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
      <SectionHtV1 p={0} mb={0}>
        <BoxHtV1>
          {/* <Menu /> */}
          <Header />
          {loading && !loaded && <ProductDetailsShimmer />}
          {!loading && loaded && productDescription && productDescription.error_message && <ProductNotFoundContainer />}
          {!loading && !productDescription.error_message && loaded && (
            <BoxHtV1>
              <ProductDetailsContainer history={history} />
            </BoxHtV1>
          )}
        </BoxHtV1>
        {/* <Footer /> */}
      </SectionHtV1>
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
