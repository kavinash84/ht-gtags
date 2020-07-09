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
const checkSKUItemsInCart = (list, sku, quantity) => {
  let numberIsSame = false;
  list.map((item) => {
    if (item.configurable_sku === sku && item.qty === quantity) {
      numberIsSame = true;
    }
  })
  return numberIsSame;
}
const LoaderIcon = require('../../../static/refresh.svg');
// const CheckedIcon = require('../../../static/added-to-cart-icon.png');

const onClick = (key, skuId, simpleSku, session, pincode, quantity) => dispatcher => e => {
  e.preventDefault();
  dispatcher(key, skuId, simpleSku, session, pincode, quantity);
};

const mapStateToProps = ({
  app: { sessionId }, pincode, cart, cart: { addingToCart, addedToCart, key, data }
}) => ({
  session: sessionId,
  pincode: pincode.selectedPincode ? pincode.selectedPincode : PINCODE,
  addingToCart,
  addedToCart,
  stateId: key,
  cartSKUs: getCartListSKU(cart),
  cart,
  cartData: data
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
  cartData
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, sku);
  const checkSKUItem = checkSKUItemsInCart(cartData, sku, quantity);
  const addLoading = addingToCart && stateId === itemId;
  const { id_customer_cart: cartId = '', qty } = skuItem;
  const updateQty = qty ? quantity - qty : quantity;
  // console.log(checkSKUItem, "$$$", quantity, "&&", updateQty, "&&", checkStatus, "quantiy inadd to cart")
  return (
    <Fragment>
      {isSoldOut ? (
        <Button variant="outline.error.large">Out of Stock</Button>
      ) : (
          <Fragment>
            {!checkStatus || !checkSKUItem ? (
              <Button
                variant="outline.primary.large"
                width={1}
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
  skuItem: {}
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
  skuItem: PropTypes.object
};

export default connect(mapStateToProps, { ...actionCreators })(AddToCart);
