import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { validatePaymentDetails } from 'utils/validation';
import ReviewOrder from 'components/Checkout/ReviewOrder';
import Menu from 'components/MenuWithLogoOnly';
import Section from 'hometown-components/lib/Section';

@connect(({ paymentoptions }) => ({
  paymentDetails: paymentoptions.paymentMethodDetails
}))
export default class ReviewOrderContainer extends Component {
  componentDidMount() {
    const { paymentDetails, history } = this.props;
    if (validatePaymentDetails(paymentDetails)) {
      history.push('/checkout/cart');
    }
  }
  render() {
    return (
      <Section p="0rem" mb="0">
        <Helmet title="Review Order" />
        <div className="wrapper">
          <Menu />
          <ReviewOrder />
        </div>
      </Section>
    );
  }
}

ReviewOrderContainer.defaultProps = {
  history: {}
};

ReviewOrderContainer.propTypes = {
  paymentDetails: PropTypes.object.isRequired,
  history: PropTypes.object
};
