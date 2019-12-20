import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPaymentOptions } from 'selectors/payments';
import { getCartList } from 'selectors/cart';
import Menu from 'newComponents/MenuWithLogoOnly';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import PaymentOptions from 'newComponents/Checkout/PaymentOptions';
import { CART_URL } from 'helpers/Constants';

@withRouter
@connect(({ paymentoptions, cart, address: { shipping } }) => ({
  availableOptions: getPaymentOptions(paymentoptions),
  cart: getCartList(cart),
  shipping
}))
export default class PaymentOptionsContainer extends Component {
  componentDidMount() {
    const {
      cart,
      history,
      shipping: { pincode, fullName, phone }
    } = this.props;
    if ((cart && cart.length === 0) || pincode === '' || fullName === '' || phone === '') {
      history.push(CART_URL);
    }
  }
  render() {
    const { availableOptions } = this.props;
    return (
      <SectionHtV1 padding="0rem" marginBottom="0">
        <Helmet title="Payment Options" />
        <BoxHtV1 className="wrapper">
          <Menu />
          <PaymentOptions data={availableOptions} />
        </BoxHtV1>
      </SectionHtV1>
    );
  }
}

PaymentOptionsContainer.defaultProps = {
  availableOptions: {},
  cart: [],
  history: {},
  shipping: {
    fullName: '',
    phone: '',
    pincode: ''
  }
};

PaymentOptionsContainer.propTypes = {
  availableOptions: PropTypes.object,
  history: PropTypes.object,
  cart: PropTypes.array,
  shipping: PropTypes.shape({
    fullName: PropTypes.string,
    pincode: PropTypes.string,
    phone: PropTypes.string
  })
};
