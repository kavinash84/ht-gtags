import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DeliveryAddress from 'components/Checkout/DeliveryAddress';
import { loadMyAddress } from 'redux/modules/myaddress';
import { getCartList } from 'selectors/cart';

@connect(({ cart }) => ({
  cart: getCartList(cart)
}))
@provideHooks({
  defer: async ({ store: { dispatch, getState } }) => {
    const { userLogin: { isLoggedIn } } = getState();
    if (isLoggedIn) {
      await dispatch(loadMyAddress());
    }
  }
})
@withRouter
export default class DeliveryAddressContainer extends Component {
  componentDidMount() {
    const { cart, history } = this.props;
    if (cart && cart.length === 0) {
      history.push('/cart');
    }
  }
  render() {
    return (
      <div>
        <DeliveryAddress />
      </div>
    );
  }
}

DeliveryAddressContainer.defaultProps = {
  cart: [],
  history: {}
};

DeliveryAddressContainer.propTypes = {
  history: PropTypes.object,
  cart: PropTypes.array
};
