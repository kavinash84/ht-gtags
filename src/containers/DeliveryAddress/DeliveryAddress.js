import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

/**
 * Components
 */
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/**
 * Page Components
 */
import DeliveryAddress from 'components/Checkout/DeliveryAddress';
import HeaderSecondary from 'components/HeaderSecondary';
import Footer from 'components/Footer';

/**
 * modules / selectors / helpers
 */
import { loadMyAddress } from 'redux/modules/myaddress';
import { getCartList } from 'selectors/cart';
import { CART_URL } from 'helpers/Constants';

@connect(({ cart, userLogin }) => ({
  cart: getCartList(cart),
  isLoggedIn: userLogin.isLoggedIn
}))
@withRouter
export default class DeliveryAddressContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { cart, history } = this.props;
    if (cart && cart.length === 0) {
      history.push(CART_URL);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.context.store;
    if (nextProps.isLoggedIn && nextProps.isLoggedIn !== this.props.isLoggedIn) {
      dispatch(loadMyAddress());
    }
  }
  render() {
    return (
      <Wrapper>
        <Helmet title="Delivery Address" />
        <Body>
          {/* HeaderSecondary */}
          <HeaderSecondary />
          <DeliveryAddress />
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}

DeliveryAddressContainer.defaultProps = {
  cart: [],
  history: {},
  isLoggedIn: false
};

DeliveryAddressContainer.propTypes = {
  history: PropTypes.object,
  cart: PropTypes.array,
  isLoggedIn: PropTypes.bool
};
