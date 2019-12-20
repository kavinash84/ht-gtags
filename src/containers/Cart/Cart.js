import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Cart from 'newComponents/Cart';
import EmptyHtV1 from 'hometown-components-dev/lib/EmptyHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import CartShimmer from 'newComponents/Cart/CartShimmer';
import PinCode from 'newComponents/PinCode';
import ResponsiveModal from 'newComponents/Modal';
import TitleBar from 'newComponents/TitleBar';
import { resetCheck } from 'redux/modules/cart';
import { getCartList, getStockOutProducts } from 'selectors/cart';
import Notifications from 'newComponents/Notifications';
import MenuFooter from 'containers/MenuFooter';

const CartEmptyIcon = require('../../../static/cart-empty.png');
const PincodeModalIcon = require('../../../static/map-placeholder.svg');

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
  state = {
    openPincode: false
  };

  componentDidMount() {
    window.scroll(0, 0);
  }
  componentWillReceiveProps(nextProps) {
    const { isCartChecked, history, resetCheckKey } = this.props;
    if (!isCartChecked && nextProps.isCartChecked) {
      const { dispatch } = this.context.store;
      dispatch(resetCheckKey());
      return history.push('/checkout/delivery-address');
    }
  }
  handlePincodeModal = e => {
    if (e) {
      e.preventDefault();
    }
    this.setState({
      openPincode: !this.state.openPincode
    });
  };
  render() {
    const {
 results, summary, loading, loaded, outOfStockList
} = this.props;
    return (
      // <BoxHtV1 className="wrapper">
      <BoxHtV1>
        <MenuFooter pageTitle="Shopping Cart">
          {loading && !loaded && <CartShimmer />}
          {results && results.length === 0 ? (
            <SectionHtV1 display="flex" padding="0.625rem" paddingTop="1.25rem" mb={0}>
              <EmptyHtV1
                title="Your cart is currently empty!"
                subTitle="Add items to cart"
                btnName="Shop Now"
                url="/"
                bg="#fafafa"
                subTitleWidth="43%"
                p="10"
              >
                <ImageHtV1 src={CartEmptyIcon} width="initial" m="auto" alt="Sorry no results found" />
              </EmptyHtV1>
            </SectionHtV1>
          ) : null}
          {!loading && results && results.length !== 0 ? (
            <BoxHtV1>
              <TitleBar title="Shopping Cart" />
              {outOfStockList && outOfStockList.length > 0 && (
                <Notifications
                  msg="One or more items in your cart are out of stock. Please remove to continue"
                  type="error"
                />
              )}
              <Cart
                results={results}
                summary={summary}
                outOfStockList={outOfStockList}
                handlePincodeModal={this.handlePincodeModal}
              />
            </BoxHtV1>
          ) : (
            loading && <CartShimmer />
          )}
          <ResponsiveModal
            classNames={{ modal: 'pincodeModal' }}
            onCloseModal={this.handlePincodeModal}
            open={this.state.openPincode}
          >
            <BoxHtV1>
              <ImageHtV1 width="100px" m="auto" mb="1.5rem" src={PincodeModalIcon} alt="Pincode" />
              <HeadingHtV1
                ellipsis={false}
                color="rgba(0.0.0.0.8)"
                textAlign="center"
                fontSize="1.375rem"
                mb="1rem"
                fontFamily="light"
              >
                Please enter your Pincode to serve you better
              </HeadingHtV1>
              <PinCode color="#f2f2f2" onCloseModal={this.handlePincodeModal} />
            </BoxHtV1>
          </ResponsiveModal>
        </MenuFooter>
      </BoxHtV1>
    );
  }
}
