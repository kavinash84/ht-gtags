import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/cart';

const Btnstyle = {
  width: '320px',
  height: '42px',
  borderRadius: '2px',
  backgroundColor: '#ae8873',
  align: 'center'
};

// const checkItemInCart = (items, id) => items.filter(item => item.sku === id);
const checkItemInCart = (items, id) => items.find(item => item.sku === id);

const onClick = (dispatcher, skuId) => e => {
  e.preventDefault();
  dispatcher(skuId);
};

const mapStateToProps = ({ cart }) => ({ ...cart });

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const AddToCart = ({
  skuId, cartList, addToCart, removeFromCart, reduceQuantity
}) => {
  const isExists = checkItemInCart(cartList, skuId);
  return (
    <div>
      <i>{isExists ? `${"You've added this to cart"} x ${isExists.count}` : ''}</i>
      <button style={Btnstyle} onClick={onClick(addToCart, skuId)}>
        ADD TO CART
      </button>
      <button style={Btnstyle} onClick={onClick(removeFromCart, skuId)}>
        REMOVE FROM CART
      </button>
      <button style={Btnstyle} onClick={onClick(reduceQuantity, skuId)}>
        REDUCE CART
      </button>
    </div>
  );
};

AddToCart.propTypes = {
  cartList: PropTypes.array.isRequired,
  skuId: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  reduceQuantity: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
