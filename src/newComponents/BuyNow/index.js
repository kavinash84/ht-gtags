import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/**
 * Components
 */
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';

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
  componentWillReceiveProps(nextProps) {
    if (this.state.buynow && nextProps.addedToCart && nextProps.addedToCart !== this.props.addedToCart) {
      const { history } = this.props;
      history.push(CART_URL);
    }
  }

  handleClick = (key, skuId, simpleSku, session, pincode) => dispatcher => e => {
    e.preventDefault();
    this.setState({ buynow: true });
    dispatcher(key, skuId, simpleSku, session, pincode);
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
      isSoldOut
    } = this.props;
    const checkStatus = checkSKUInCart(cartSKUs, sku);
    const addLoading = addingToCart && stateId === itemId;
    return (
      <Fragment>
        {!isSoldOut && (
          <Fragment>
            {!checkStatus ? (
              <Button
                variant="primary.large"
                disabled={addLoading}
                onClick={this.handleClick(itemId, sku, simpleSku, session, pincode)(addToCart)}
              >
                BUY NOW
              </Button>
            ) : (
              <Box as={Link} variant="primary.large" to={CART_URL}>
                <Button variant="primary.large" width={1}>
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
  itemId: '',
  stateId: '',
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
  history: PropTypes.object
};

export default connect(mapStateToProps, { ...actionCreators })(BuyNow);
