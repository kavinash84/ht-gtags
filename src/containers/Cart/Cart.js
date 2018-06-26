import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import Cart from 'components/Cart';
import Menu from 'containers/MenuNew/index';
import TitleBar from 'components/TitleBar';
import { PINCODE } from 'helpers/Constants';
import { loadCart, isLoaded as isCartLoaded } from 'redux/modules/cart';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    const { userLogin: { sessionId }, pincode: { selectedPincode } } = getState();
    if (sessionId && !isCartLoaded(getState())) {
      const pincode = selectedPincode === '' ? PINCODE : selectedPincode;
      dispatch(loadCart(sessionId, pincode)).catch(error => console.log(error));
    }
  }
})
@connect(({ cart: { data, summary } }) => ({
  results: data,
  summary
}))
export default class CartContainer extends Component {
  static defaultProps = {
    results: [],
    summary: null
  };
  static propTypes = {
    results: PropTypes.array,
    summary: PropTypes.object
  };
  render() {
    const { results, summary } = this.props;
    return (
      <div>
        <Menu />
        <TitleBar title="Shopping Cart" />
        <Cart results={results} summary={summary} />
      </div>
    );
  }
}
