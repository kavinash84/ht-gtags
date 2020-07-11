import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Modules / Selectors
 */
import { resetCheck } from 'redux/modules/cart';
import { getCartList, getStockOutProducts } from 'selectors/cart';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Body from 'hometown-components-dev/lib/BodyHtV1';
import Empty from 'hometown-components-dev/lib/EmptyHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';

/**
 * Page Components
 */
import Cart from 'components/Cart';
import Footer from 'components/Footer';
import Header from 'components/Header';
import CartShimmer from 'components/Cart/CartShimmer';
import PinCode from 'components/PinCode';
import ResponsiveModal from 'components/Modal';
import Notifications from 'components/Notifications';

/**
 * Icons / Images
 */
const CartEmptyIcon = require('../../../static/emptyCart.png');
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
    console.log(loaded);

    return (
      <Wrapper>
        <Body>
          {/* Header */}
          <Header />

          {/* {loading && !loaded && <CartShimmer />} */}
          {results && results.length === 0 ? (
            <Section display="flex" padding="0.625rem" paddingTop="1.25rem" mb={0}>
              <Empty
                title="Your Cart is Empty!"
                subTitle="Looks like you haven’t made your choice yet."
                btnName="Shop Now"
                url="/"
                bg="#fafafa"
                subTitleWidth="43%"
                p="10"
              >
                <Image src={CartEmptyIcon} width="initial" m="auto" alt="Sorry no results found" />
              </Empty>
            </Section>
          ) : null}
          {!loading && results && results.length !== 0 ? (
            <Box>
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
            </Box>
          ) : (
            loading && <CartShimmer />
          )}

          {/* Pincode Modal */}
          <ResponsiveModal
            classNames={{ modal: 'pincodeModal' }}
            onCloseModal={this.handlePincodeModal}
            open={this.state.openPincode}
          >
            <Box>
              <Image width="100px" m="auto" mb="1.5rem" src={PincodeModalIcon} alt="Pincode" />
              <Heading
                ellipsis={false}
                color="rgba(0.0.0.0.8)"
                textAlign="center"
                fontSize="1.375rem"
                mb="1rem"
                fontFamily="light"
              >
                Please enter your Pincode to serve you better
              </Heading>
              <PinCode color="#f2f2f2" onCloseModal={this.handlePincodeModal} />
            </Box>
          </ResponsiveModal>

          {/* Footer */}
          <Footer />
        </Body>
      </Wrapper>
    );
  }
}
