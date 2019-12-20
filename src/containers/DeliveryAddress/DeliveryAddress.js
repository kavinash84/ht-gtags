import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import DeliveryAddress from 'newComponents/Checkout/DeliveryAddress';
import Menu from 'newComponents/MenuWithLogoOnly';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
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
      <SectionHtV1 p="0rem" mb="0">
        <Helmet title="Delivery Address" />
        <BoxHtV1 className="wrapper">
          <Menu />
          <DeliveryAddress />
        </BoxHtV1>
      </SectionHtV1>
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
