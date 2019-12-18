import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AddCart from 'hometown-components-dev/lib/Icons/AddCart';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
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
  size,
  isSoldOut,
  height,
  btnColor,
  btnType,
  ta,
  fontSize
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, sku);
  const addLoading = addingToCart && stateId === itemId;
  return (
    <BoxHtV1 textAlign={ta}>
      {isSoldOut ? (
        <BoxHtV1>
          <ButtonHtV1
            btnType="custom"
            border="1px solid"
            bg="white"
            color="red"
            padding="4px 8px"
            size={size}
            height={height}
            lh="1.5"
          >
            <BoxHtV1 fontSize="12px" fontFamily="regular" color="red" verticalAlign="text-top">
              Out of Stock
            </BoxHtV1>
          </ButtonHtV1>
        </BoxHtV1>
      ) : (
        <BoxHtV1>
          {!checkStatus ? (
            <ButtonHtV1
              btnType={btnType}
              border="1px solid"
              bc={btnColor === 'transparent' ? '#f98d29' : btnColor}
              color={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
              bg={btnColor === 'transparent' ? 'transparent' : btnColor}
              padding="4px 8px"
              lh="1.5"
              size={size}
              disabled={addLoading}
              onClick={onClick(itemId, sku, simpleSku, session, pincode)(addToCart)}
              className={styles.addToCartBtn}
              height={height}
            >
              {!addLoading && (
                <AddCart
                  width="18px"
                  height="18px"
                  verticalAlign="middle"
                  fill={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
                />
              )}
              {addLoading && (
                <ImageHtV1 className="spin" src={LoaderIcon} display="inline" width="18px" verticalAlign="sub" />
              )}
              <BoxHtV1
                ml={2}
                fontSize={fontSize}
                fontFamily="regular"
                color={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
                verticalAlign="middle"
                lh="1.8"
              >
                {addLoading ? 'Adding..' : 'Add to Cart'}
              </BoxHtV1>
            </ButtonHtV1>
          ) : (
            <BoxHtV1 display="block" mb={0}>
              <BoxHtV1 className={styles.addedToCart}>
                <ImageHtV1 width="22px" src={CheckedIcon} display="inline" verticalAlign="middle" mr={8} />
                Added to Cart
              </BoxHtV1>
              <Link className={`${styles.goToCart} ${height !== 'auto' && styles.heightFix} `} to={CART_URL}>
                <BoxHtV1 ml={0} fontSize="12px" fontFamily="regular" color="#FFF" verticalAlign="text-bottom" lh="1.5">
                  Go to Cart
                </BoxHtV1>
              </Link>
            </BoxHtV1>
          )}
        </BoxHtV1>
      )}
    </BoxHtV1>
  );
};

AddToCart.defaultProps = {
  cartSKUs: [],
  addingToCart: false,
  itemId: '',
  stateId: '',
  size: 'default',
  isSoldOut: false,
  height: 'auto',
  btnColor: '#f98d29',
  btnType: 'custom',
  ta: 'center',
  fontSize: '16px'
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
  size: PropTypes.string,
  height: PropTypes.string,
  btnColor: PropTypes.string,
  btnType: PropTypes.string,
  ta: PropTypes.string,
  fontSize: PropTypes.string,
  isSoldOut: PropTypes.bool
};

export default connect(mapStateToProps, { ...actionCreators })(AddToCart);
