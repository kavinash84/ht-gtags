import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cart from 'components/Cart';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import CartShimmer from 'components/Cart/CartShimmer';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import TitleBar from 'components/TitleBar';
import { resetCheck } from 'redux/modules/cart';
import { getCartList, getStockOutProducts } from 'selectors/cart';
import Notifications from 'components/Notifications';

const CartEmptyIcon = require('../../../static/cart-empty.jpg');

@connect(
  ({
    cart, cart: {
      cartChecked, summary, error, loading, loaded
    }
  }) => ({
    results: getCartList(cart),
    outOfStockList: getStockOutProducts(cart),
    isCartChecked: cartChecked,
    summary,
    error,
    loading,
    loaded
  }),
  {
    resetCheckKey: resetCheck
  }
)
export default class CartContainer extends Component {
  static propTypes = {
    results: PropTypes.array,
    summary: PropTypes.object,
    isCartChecked: PropTypes.bool,
    outOfStockList: PropTypes.array,
    history: PropTypes.object.isRequired,
    resetCheckKey: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    loaded: PropTypes.bool
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    results: [],
    summary: null,
    isCartChecked: false,
    outOfStockList: [],
    loading: false,
    loaded: false
  };
  componentWillReceiveProps(nextProps) {
    const { isCartChecked, history, resetCheckKey } = this.props;
    if (!isCartChecked && nextProps.isCartChecked) {
      const { dispatch } = this.context.store;
      dispatch(resetCheckKey());
      return history.push('/checkout/delivery-address');
    }
  }

  render() {
    const {
      results, summary, loading, loaded, outOfStockList
    } = this.props;
    return (
      <div className="wrapper">
        <Menu />
        {loading && !loaded && <CartShimmer />}
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
        ) : null}
        {!loading && (results && results.length !== 0) ? (
          <div>
            <TitleBar title="Shopping Cart" />
            {outOfStockList &&
              outOfStockList.length > 0 && (
              <Notifications
                msg="One or more items in your cart are out of stock. Please remove to continue"
                type="error"
              />
            )}
            <Cart results={results} summary={summary} outOfStockList={outOfStockList} />
          </div>
        ) : (
          loading && <CartShimmer />
        )}
        <Footer />
      </div>
    );
  }
}
