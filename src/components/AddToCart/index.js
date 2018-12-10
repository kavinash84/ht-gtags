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
  ta
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, sku);
  const addLoading = addingToCart && stateId === itemId;
  return (
    <Div ta={ta}>
      {isSoldOut ? (
        <div>
          <Button
            btnType="custom"
            border="1px solid"
            bc="white"
            color="red"
            p="7px 15px 8px"
            size={size}
            height={height}
          >
            <Span fontSize="14px" fontFamily="regular" color="red" va="text-top">
              {'OUT OF STOCK'}
            </Span>
          </Button>
        </div>
      ) : (
        <div>
          {!checkStatus ? (
            <Button
              btnType={btnType}
              border="1px solid"
              bc={btnColor === 'transparent' ? '#f98d29' : btnColor}
              color={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
              bg={btnColor === 'transparent' ? 'transparent' : btnColor}
              p="7px 15px"
              size={size}
              disabled={addLoading}
              onClick={onClick(itemId, sku, simpleSku, session, pincode)(addToCart)}
              className={styles.addToCartBtn}
              height={height}
            >
              {!addLoading && <AddCart fill={btnColor === 'transparent' ? '#f98d29' : '#FFF'} />}
              {addLoading && <Img width="24px" className="spin" src={LoaderIcon} display="inline" />}
              <Span
                ml="0.625rem"
                fontSize="16px"
                fontFamily="regular"
                color={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
                va="top"
                lh="1.5"
              >
                {addLoading ? 'Adding..' : 'Add to Cart'}
              </Span>
            </Button>
          ) : (
            <Div display="block" mb="0.625rem">
              <span className={styles.addedToCart}>
                <Img width="22px" src={CheckedIcon} display="inline" va="middle" mr="8px" />
                Added to Cart
              </span>
              <Link className={`${styles.goToCart} ${height !== 'auto' && styles.heightFix} `} to={CART_URL}>
                <Span fontSize="14px" fontFamily="regular" color="#FFF" va="middle">
                  Go to Cart
                </Span>
              </Link>
            </Div>
          )}
        </div>
      )}
    </Div>
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
  ta: 'center'
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
  isSoldOut: PropTypes.bool
};

export default connect(mapStateToProps, { ...actionCreators })(AddToCart);
