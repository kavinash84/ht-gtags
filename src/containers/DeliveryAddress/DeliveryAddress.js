import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DeliveryAddress from 'components/Checkout/DeliveryAddress';
import Menu from 'components/MenuWithLogoOnly';
import Section from 'hometown-components/lib/Section';
import { loadMyAddress } from 'redux/modules/myaddress';
import { getCartList } from 'selectors/cart';
import { CART_URL } from 'helpers/Constants';

@connect(({ cart, userLogin }) => ({
  cart: getCartList(cart),
  isLoggedIn: userLogin.isLoggedIn
}))
@provideHooks({
  defer: async ({ store: { dispatch, getState } }) => {
    const {
      userLogin: { isLoggedIn }
    } = getState();
    if (isLoggedIn) {
      await dispatch(loadMyAddress());
    }
  }
})
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
