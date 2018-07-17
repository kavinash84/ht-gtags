import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cart from 'components/Cart';
import Empty from 'hometown-components/lib/Empty';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import Notifications from 'components/Notifications';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';
import TitleBar from 'components/TitleBar';

const CartEmptyIcon = require('../../../static/cart-empty.jpg');

@connect(({
  cart: {
    data, summary, error, proceedToCheckout
  }
}) => ({
  results: data,
  summary,
  error,
  proceedToCheckout
}))
export default class CartContainer extends Component {
  static propTypes = {
    results: PropTypes.array,
    summary: PropTypes.object,
    error: PropTypes.object,
    history: PropTypes.object.isRequired,
    proceedToCheckout: PropTypes.bool.isRequired
  };
  static defaultProps = {
    results: [],
    summary: null,
    error: null
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.proceedToCheckout) {
      this.props.history.push('/delivery-address');
    }
  }
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
        <Footer />
      </div>
    );
  }
}
