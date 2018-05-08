import React from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import * as actionCreators from 'redux/modules/cart';
import { CART_URL } from 'helpers/Constants';

const styles = require('./AddToCart.scss');

// const checkItemInCart = (items, id) => items.filter(item => item.sku === id);
const checkItemInCart = (items, id) => items.find(item => item.sku === id);

const onClick = (dispatcher, skuId) => e => {
  e.preventDefault();
  dispatcher(skuId);
};

const mapStateToProps = ({ cart }) => ({ ...cart });

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const AddToCart = ({ skuId, cartList, addToCart }) => {
  const isExists = checkItemInCart(cartList, skuId) || false;
  return (
    <div className={styles.addToCartWrapper}>
      {isExists ? <i>{`${"You've added this to cart"} x ${isExists.count}`}</i> : ''}
      {/* }<Div col="12"> */}
      <Div col={isExists ? '9' : '12'}>
        <Button
          onClick={onClick(addToCart, skuId)}
          btnType="primary"
          size="block"
          fontFamily="regular"
          fontSize="0.875em"
          height="42px"
          lh="2"
        >
          ADD TO CART
        </Button>
      </Div>
      <Div col="3" hide={!isExists}>
        <Link to={`${CART_URL}`}> > </Link>
      </Div>
    </div>
  );
};

AddToCart.propTypes = {
  cartList: PropTypes.array.isRequired,
  skuId: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
