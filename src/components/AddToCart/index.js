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
  updateCart,
  pincode,
  cartSKUs,
  addingToCart,
  itemId,
  stateId,
  isSoldOut,
  quantity,
  quantityChange,
  skuItem,
  size,
  height
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, sku);
  const addLoading = addingToCart && stateId === itemId;
  const { id_customer_cart: cartId = '', qty } = skuItem;
  const updateQty = qty ? quantity - qty : quantity;
  return (
    <Fragment>
      {isSoldOut ? (
        <Button variant={`outline.error.${size}`} height={height}>
          Out of Stock
        </Button>
      ) : (
        <Fragment>
          {!checkStatus || quantityChange ? (
            <Button
              variant={`outline.primary.${size}`}
              width={1}
              height={height}
              disabled={addLoading}
              onClick={e => {
                if (quantityChange && updateQty !== 0 && checkStatus) {
                  const handler = onClick(cartId, sku, simpleSku, session, pincode, updateQty)(updateCart);
                  handler(e);
                } else {
                  const handler = onClick(itemId, sku, simpleSku, session, pincode, quantity)(addToCart);
                  handler(e);
                }
              }}
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
                  GO TO CART
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
  quantity: 1,
  quantityChange: false,
  skuItem: {},
  size: 'large',
  height: 44
};

AddToCart.propTypes = {
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
  quantity: PropTypes.number,
  quantityChange: PropTypes.bool,
  skuItem: PropTypes.object,
  size: PropTypes.string,
  height: PropTypes.number
};

export default connect(mapStateToProps, { ...actionCreators })(AddToCart);
