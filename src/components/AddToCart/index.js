import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AddCart from 'hometown-components/lib/Icons/AddCart';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import Span from 'hometown-components/lib/Span';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/cart';
import { getCartListSKU } from 'selectors/cart';
import { PINCODE, CART_URL } from 'helpers/Constants';

const checkSKUInCart = (list, sku) => list.includes(sku);
const styles = require('./AddToCart.scss');
const LoaderIcon = require('../../../static/refresh.svg');

const onClick = (key, skuId, simpleSku, session, pincode) => dispatcher => e => {
  e.preventDefault();
  dispatcher(key, skuId, simpleSku, session, pincode);
};

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

const AddToCart = ({
  session, simpleSku, sku, addToCart, pincode, cartSKUs, addingToCart, itemId, stateId, size
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, sku);
  const addLoading = addingToCart && stateId === itemId;
  return (
    <div>
      {!checkStatus ? (
        <Button
          btnType="custom"
          border="1px solid"
          bc="#ae8873"
          color="#ae8873"
          p="8px 15px 0"
          size={size}
          disabled={addLoading}
          onClick={onClick(itemId, sku, simpleSku, session, pincode)(addToCart)}
        >
          {!addLoading && <AddCart fill="#ae8873" />}
          {addLoading && <Img width="24px" className="spin" src={LoaderIcon} display="inline" />}
          <Span ml="0.625rem" fontSize="0.857rem" fontWeight="600" color="#ae8873" va="top">
            {addLoading ? 'Adding..' : 'ADD TO CART'}
          </Span>
        </Button>
      ) : (
        <Div display="block" mb="0.625rem">
          <span className={styles.addedToCart}>✓ Added to Cart</span>
          <Link className={styles.goToCart} to={CART_URL}>
            Go To Cart
          </Link>
        </Div>
      )}
    </div>
  );
};

AddToCart.defaultProps = {
  cartSKUs: [],
  addingToCart: false,
  itemId: '',
  stateId: '',
  size: 'default'
};

AddToCart.propTypes = {
  simpleSku: PropTypes.string.isRequired,
  cartSKUs: PropTypes.array,
  sku: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  addingToCart: PropTypes.bool,
  itemId: PropTypes.string,
  stateId: PropTypes.string,
  size: PropTypes.string
};

export default connect(
  mapStateToProps,
  { ...actionCreators }
)(AddToCart);
