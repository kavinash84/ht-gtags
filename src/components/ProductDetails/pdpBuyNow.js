import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

/**
 * Components
 */
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Box from "hometown-components-dev/lib/BoxHtV1";

/**
 * Modules / selectors / helpers
 */
import * as actionCreators from "redux/modules/cart";
import { getCartListSKU } from "selectors/cart";
import { meta as getMeta } from "selectors/product";
import { PINCODE, CART_URL } from "helpers/Constants";

const checkSKUInCart = (list, sku) => list.includes(sku);

const mapStateToProps = ({
  app: { sessionId },
  pincode,
  productdetails,
  cart,
  cart: { addingToCart, addedToCart, key }
}) => ({
  session: sessionId,
  pincode: pincode.selectedPincode ? pincode.selectedPincode : PINCODE,
  addingToCart,
  addedToCart,
  stateId: key,
  cartSKUs: getCartListSKU(cart),
  meta: getMeta(productdetails)
});

@withRouter
class BuyNow extends React.Component {
  state = {
    buynow: false
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.state.buynow &&
      nextProps.addedToCart &&
      nextProps.addedToCart !== this.props.addedToCart
    ) {
      const { history } = this.props;
      history.push(CART_URL);
    }
  }

  handleClick = (
    key,
    skuId,
    simpleSku,
    session,
    pincode,
    configId,
    quantity = 1
  ) => dispatcher => e => {
    e.preventDefault();
    this.setState({ buynow: true });
    dispatcher(key, skuId, simpleSku, session, pincode, configId, quantity);
  };
  render() {
    const {
      session,
      simpleSku,
      sku,
      addToCart,
      pincode,
      cartSKUs,
      addingToCart,
      itemId,
      stateId,
      isSoldOut,
      meta: { config_id: configId },
      quantity
    } = this.props;
    const checkStatus = checkSKUInCart(cartSKUs, sku);
    const addLoading = addingToCart && stateId === itemId;
    return (
      <Fragment>
        {!isSoldOut && (
          <Fragment>
            {!checkStatus ? (
              <Button
                backgroundColor="#E9916B"
                width="70%"
                marginBottom="10px"
                variant="primary.large"
                disabled={addLoading}
                onClick={this.handleClick(
                  itemId,
                  sku,
                  simpleSku,
                  session,
                  pincode,
                  configId,
                  quantity
                )(addToCart)}
              >
                BUY NOW
              </Button>
            ) : (
                <Box as={Link} variant="primary.large" to={CART_URL}>
                  <Button variant="primary.large" width="320px">
                    BUY NOW
                </Button>
                </Box>
              )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

BuyNow.defaultProps = {
  cartSKUs: [],
  addingToCart: false,
  itemId: "",
  stateId: "",
  meta: "",
  isSoldOut: false,
  history: {}
};

BuyNow.propTypes = {
  simpleSku: PropTypes.string.isRequired,
  cartSKUs: PropTypes.array,
  sku: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  addingToCart: PropTypes.bool,
  itemId: PropTypes.string,
  stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSoldOut: PropTypes.bool,
  addedToCart: PropTypes.bool.isRequired,
  history: PropTypes.object,
  quantity: PropTypes.number.isRequired,
  meta: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default connect(mapStateToProps, { ...actionCreators })(BuyNow);
