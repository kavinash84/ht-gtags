import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import DeliveryAddress from 'components/Checkout/DeliveryAddress';
import Menu from 'components/MenuWithLogoOnly';
import Section from 'hometown-components-dev/lib/Section';
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
      <Section p="0rem" mb="0">
        <Helmet title="Delivery Address" />
        <div className="wrapper">
          <Menu />
          <DeliveryAddress />
        </div>
      </Section>
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
