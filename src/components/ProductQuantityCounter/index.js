import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/cart';

const mapStateToProps = ({ cart }) => ({ ...cart });

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const onClick = (dispatcher, skuId) => e => {
  e.preventDefault();
  dispatcher(skuId);
};

const getCount = (cartList, skuId) => {
  const itemCount = cartList.find(item => item.sku === skuId);
  const { count } = itemCount;
  return count;
};

const ProductQuantityCounter = ({
  skuId, cartList, reduceQuantity, addToCart
}) => {
  const count = getCount(cartList, skuId);
  return (
    <div>
      <button onClick={onClick(reduceQuantity, skuId)} disabled={count === 1}>
        {' '}
        -{' '}
      </button>
      <span>{count}</span>
      <button onClick={onClick(addToCart, skuId)}> + </button>
    </div>
  );
};

ProductQuantityCounter.propTypes = {
  skuId: PropTypes.string.isRequired,
  cartList: PropTypes.array.isRequired,
  reduceQuantity: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductQuantityCounter);
