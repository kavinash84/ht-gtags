import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { provideHooks } from 'redial';
import { connect } from 'react-redux';
import Cart from 'components/Cart';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Notifications from 'components/Notifications';
import Menu from 'containers/MenuNew/index';
import TitleBar from 'components/TitleBar';
import { PINCODE } from 'helpers/Constants';
import { loadCart, isLoaded as isCartLoaded } from 'redux/modules/cart';

const CartEmptyIcon = require('../../../static/cart-empty.jpg');

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    const { userLogin: { sessionId }, pincode: { selectedPincode } } = getState();
    if (sessionId && !isCartLoaded(getState())) {
      const pincode = selectedPincode === '' ? PINCODE : selectedPincode;
      dispatch(loadCart(sessionId, pincode)).catch(error => console.log(error));
    }
  }
})
@connect(({ cart: { data, summary, error } }) => ({
  results: data,
  summary,
  error
}))
export default class CartContainer extends Component {
  static defaultProps = {
    results: [],
    summary: null,
    error: null
  };
  static propTypes = {
    results: PropTypes.array,
    summary: PropTypes.object,
    error: PropTypes.object
  };
  render() {
    const { results, summary, error } = this.props;
    return (
      <div className="wrapper">
        <Menu />
        {results && results.length === 0 ? (
          <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
            <Empty
              title="Your cart is currently empty!"
              subTitle="Add items to it"
              btnName="Shop Now"
              url="/"
              bg="#fafafa"
            >
              <Img src={CartEmptyIcon} width="initial" m="auto" alt="Sorry no results found" />
            </Empty>
          </Section>
        ) : (
          <div>
            <TitleBar title="Shopping Cart" />
            {error && <Notifications msg={error.error_message} type="error" />}
            <Cart results={results} summary={summary} />
          </div>
        )}
      </div>
    );
  }
}
