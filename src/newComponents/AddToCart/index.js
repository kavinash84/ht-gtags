import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Components
 */
// import AddCartIcon from 'hometown-components-dev/lib/Icons/AddCart';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

/**
 * Modules / Helpers / Selectors
 */
import * as actionCreators from 'redux/modules/cart';
import { getCartListSKU } from 'selectors/cart';
import { PINCODE, CART_URL } from 'helpers/Constants';

const checkSKUInCart = (list, sku) => list.includes(sku);
const LoaderIcon = require('../../../static/refresh.svg');
// const CheckedIcon = require('../../../static/added-to-cart-icon.png');

const onClick = (key, skuId, simpleSku, session, pincode, quantity) => dispatcher => e => {
  e.preventDefault();
  dispatcher(key, skuId, simpleSku, session, pincode, quantity);
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
  quantity
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, sku);
  const addLoading = addingToCart && stateId === itemId;
  return (
    <Fragment>
      {isSoldOut ? (
        <Button variant="outline.error.large">Out of Stock</Button>
      ) : (
        <Fragment>
          {!checkStatus ? (
            <Button
              variant="outline.primary.large"
              width={1}
              disabled={addLoading}
              onClick={onClick(itemId, sku, simpleSku, session, pincode, quantity)(addToCart)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {addLoading && <Image className="spin" src={LoaderIcon} width="18px" mr={10} />}
              {addLoading ? 'Adding...' : 'Add to Cart'}
            </Button>
          ) : (
            <Row mx={0} alignItems="center">
              <Box as={Link} to={CART_URL} width={1}>
                <Button variant="outline.primary.large" width={1}>
                  Added to Cart
                </Button>
              </Box>
            </Row>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

AddToCart.defaultProps = {
  cartSKUs: [],
  addingToCart: false,
  itemId: '',
  stateId: '',
  isSoldOut: false,
  quantity: 1
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
  stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSoldOut: PropTypes.bool,
  quantity: PropTypes.number
};

export default connect(mapStateToProps, { ...actionCreators })(AddToCart);
