import React, { Fragment } from 'react';
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

const checkSKUInCart = (list, sku) => {
  // list.includes(sku)
  let isAlreadyAdded = false;
  const simpleSKUS = sku.skus || [];
  const skusList = [];
  simpleSKUS.forEach(item => {
    const simpleSKUItem = item.sku || '';
    const skuItem = simpleSKUItem.split('-')[0];
    if (skuItem) {
      skusList.push(skuItem);
    }
  });
  if (list.length && skusList.length) {
    isAlreadyAdded = skusList.every(val => list.includes(val));
  }
  return isAlreadyAdded;
};
const styles = require('../AddToCart/AddToCart.scss');
const LoaderIcon = require('../../../static/refresh.svg');
const CheckedIcon = require('../../../static/added-to-cart-icon.png');

const onClick = (item, session, pincode) => dispatcher => e => {
  e.preventDefault();
  const { id_catalog_buildyourset: setId, skus } = item;
  const simpleSKUS = skus.map(val => ({ simple_sku: val.sku, qty: Number(val.qty) }));
  dispatcher(setId, simpleSKUS, session, pincode);
};

const mapStateToProps = ({
  app: { sessionId }, pincode, cart, cart: { addingToCart, addedToCart, key }
}) => ({
  session: sessionId,
  pincode: pincode.selectedPincode ? pincode.selectedPincode : PINCODE,
  addingToCart,
  stateId: key,
  addedToCart,
  cartSKUs: getCartListSKU(cart)
});

const AddToCartCombined = ({
  session,
  addToCartCombined,
  pincode,
  addingToCart,
  skusData,
  cartSKUs,
  stateId,
  size,
  height,
  btnColor,
  btnType,
  fontSize
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, skusData);
  const { skus } = skusData;
  const { id_catalog_buildyourset: itemId } = skusData;
  const addLoading = addingToCart && stateId === itemId;
  return (
    <Fragment>
      {
        <Fragment>
          {!checkStatus ? (
            <Button
              btnType={btnType}
              border="1px solid"
              bc={btnColor === 'transparent' ? '#f98d29' : btnColor}
              color={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
              bg={btnColor === 'transparent' ? 'transparent' : btnColor}
              p="4px 20px"
              lh="1.5"
              size={size}
              disabled={addLoading}
              onClick={onClick(skusData, session, pincode)(addToCartCombined)}
              className={styles.addToCartBtn}
              height={height}
            >
              {!addLoading && (
                <AddCart
                  width="18px"
                  height="18px"
                  va="middle"
                  fill={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
                />
              )}
              {addLoading && <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />}
              <Span
                ml="2px"
                fontSize={fontSize}
                fontFamily="regular"
                color={btnColor === 'transparent' ? '#f98d29' : '#FFF'}
                va="middle"
                lh="1.8"
              >
                {addLoading ? 'Adding..' : `Add ${skus && skus.length ? `${skus.length} items` : ''} to Cart`}
              </Span>
            </Button>
          ) : (
            <Div display="block" mb="0">
              <span className={styles.addedToCart}>
                <Img width="22px" src={CheckedIcon} display="inline" va="middle" mr="8px" />
                Added to Cart
              </span>
              <Link className={`${styles.goToCart} ${height !== 'auto' && styles.heightFix} `} to={CART_URL}>
                <Span ml="0" fontSize="12px" fontFamily="regular" color="#FFF" va="text-bottom" lh="1.5">
                  Go to Cart
                </Span>
              </Link>
            </Div>
          )}
        </Fragment>
      }
    </Fragment>
  );
};

AddToCartCombined.defaultProps = {
  addingToCart: false,
  cartSKUs: [],
  skusData: {},
  stateId: '',
  size: 'default',
  height: 'auto',
  btnColor: '#f98d29',
  btnType: 'custom',
  fontSize: '16px'
};

AddToCartCombined.propTypes = {
  session: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  addToCartCombined: PropTypes.func.isRequired,
  stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  addingToCart: PropTypes.bool,
  skusData: PropTypes.object,
  cartSKUs: PropTypes.array,
  size: PropTypes.string,
  height: PropTypes.string,
  btnColor: PropTypes.string,
  btnType: PropTypes.string,
  fontSize: PropTypes.string
};

export default connect(
  mapStateToProps,
  { ...actionCreators }
)(AddToCartCombined);
