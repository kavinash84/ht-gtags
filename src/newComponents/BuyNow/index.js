import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/**
 * Components
 */
import Button from 'hometown-components-dev/lib/ButtonHtV1';
// import Box from 'hometown-components-dev/lib/BoxHtV1';

/**
 * Modules / selectors / helpers
 */
import * as actionCreators from 'redux/modules/cart';
import { getCartListSKU } from 'selectors/cart';
import { PINCODE, CART_URL } from 'helpers/Constants';

const checkSKUInCart = (list, sku) => list.includes(sku);

const mapStateToProps = ({
 app: { sessionId }, pincode, cart, cart: { addingToCart, addedToCart, key }
}) => ({
  session: sessionId,
  pincode: pincode.selectedPincode ? pincode.selectedPincode : PINCODE,
  addingToCart,
  addedToCart,
  stateId: key,
  cartSKUs: getCartListSKU(cart)
});

@withRouter
class BuyNow extends React.Component {
  state = {
    buynow: false
  };
  componentWillReceiveProps() {
    if (this.state.buynow) {
      const { history } = this.props;
      history.push(CART_URL);
    }
  }

  handleClick = (key, skuId, simpleSku, session, pincode, quantity) => dispatcher => e => {
    e.preventDefault();
    this.setState({ buynow: true });
    dispatcher(key, skuId, simpleSku, session, pincode, quantity);
  };
  render() {
    const {
      session,
      simpleSku,
      sku,
      addToCart,
      updateCart,
      pincode,
      cartSKUs,
      addingToCart,
      itemId,
      stateId,
      isSoldOut,
      quantity,
      quantityChange,
      skuItem
    } = this.props;
    const checkStatus = checkSKUInCart(cartSKUs, sku);
    const addLoading = addingToCart && stateId === itemId;
    const { id_customer_cart: cartId = '', qty } = skuItem;
    const updateQty = qty ? quantity - qty : quantity;
    return (
      <Fragment>
        {!isSoldOut && (
          <Fragment>
            <Button
              variant="primary.large"
              disabled={addLoading}
              onClick={e => {
                if (quantityChange && updateQty !== 0 && checkStatus) {
                  const handler = this.handleClick(cartId, sku, simpleSku, session, pincode, updateQty)(updateCart);
                  handler(e);
                } else {
                  const handler = this.handleClick(itemId, sku, simpleSku, session, pincode, quantity)(addToCart);
                  handler(e);
                }
              }}
            >
              BUY NOW
            </Button>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

BuyNow.defaultProps = {
  cartSKUs: [],
  addingToCart: false,
  itemId: '',
  stateId: '',
  isSoldOut: false,
  history: {},
  quantity: 1,
  quantityChange: false,
  skuItem: {}
};

BuyNow.propTypes = {
  simpleSku: PropTypes.string.isRequired,
  cartSKUs: PropTypes.array,
  sku: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  addingToCart: PropTypes.bool,
  itemId: PropTypes.string,
  stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSoldOut: PropTypes.bool,
  // addedToCart: PropTypes.bool.isRequired,
  history: PropTypes.object,
  quantity: PropTypes.number,
  quantityChange: PropTypes.bool,
  skuItem: PropTypes.object
};

export default connect(mapStateToProps, { ...actionCreators })(BuyNow);
