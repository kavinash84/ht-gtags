import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/**
 * Components
 */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/**
 * Page Components
 */
import PaymentOptions from 'newComponents/Checkout/PaymentOptions';
import HeaderSecondary from 'newComponents/HeaderSecondary';

/**
 * modules / selectors / helpers
 */
import { CART_URL } from 'helpers/Constants';
import { getPaymentOptions } from 'selectors/payments';
import { getCartList } from 'selectors/cart';

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
      <Wrapper>
        <Helmet title="Delivery Address" />
        <Body>
          {/* HeaderSecondary */}
          <HeaderSecondary shippingStep="active" paymentStep="active" />
          <PaymentOptions data={availableOptions} />
        </Body>
      </Wrapper>
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
