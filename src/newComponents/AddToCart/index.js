import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

/**
 * Components
 */
import AddCartIcon from 'hometown-components-dev/lib/Icons/AddCart';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

/**
 * Modules / Helpers / Selectors
 */
import * as actionCreators from 'redux/modules/cart';
import { getCartListSKU } from 'selectors/cart';
import { PINCODE, CART_URL } from 'helpers/Constants';

const checkSKUInCart = (list, sku) => list.includes(sku);
const styles = require('./AddToCart.scss');
const LoaderIcon = require('../../../static/refresh.svg');
const CheckedIcon = require('../../../static/added-to-cart-icon.png');

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
  height,
  btnColor
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, sku);
  const addLoading = addingToCart && stateId === itemId;
  return (
    <Fragment>
      {isSoldOut ? (
        <Button btnType="custom" border="1px solid" bg="white" color="red">
          <Box fontSize="12px" fontFamily="regular" color="red" verticalAlign="text-top">
            Out of Stock
          </Box>
        </Button>
      ) : (
        <Fragment>
          {!checkStatus ? (
            <Button
              variant="outline"
              disabled={addLoading}
              onClick={onClick(itemId, sku, simpleSku, session, pincode)(addToCart)}
            >
              {!addLoading && (
                <AddCartIcon
                  width="18px"
                  height="18px"
                  verticalAlign="middle"
                  fill={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
                />
              )}
              {addLoading && <Image className="spin" src={LoaderIcon} width="18px" />}
              {addLoading ? 'Adding...' : 'Add to Cart'}
            </Button>
          ) : (
            <Box>
              <Box className={styles.addedToCart}>
                <Image width="22px" src={CheckedIcon} display="inline" verticalAlign="middle" mr={8} />
                Added to Cart
              </Box>
              <Link className={`${styles.goToCart} ${height !== 'auto' && styles.heightFix} `} to={CART_URL}>
                <Box ml={0} fontSize="12px" fontFamily="regular" color="#FFF" verticalAlign="text-bottom" lh="1.5">
                  Go to Cart
                </Box>
              </Link>
            </Box>
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
  height: 'auto',
  btnColor: '#f98d29'
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
  height: PropTypes.string,
  btnColor: PropTypes.string,
  isSoldOut: PropTypes.bool
};

export default connect(mapStateToProps, { ...actionCreators })(AddToCart);
