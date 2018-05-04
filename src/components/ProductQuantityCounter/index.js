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

const ProductQuantityCounter = ({
  skuId, cartList, reduceQuantity, addToCart
}) => (
  <div>
    <button onClick={onClick(reduceQuantity, skuId)} disabled={cartList.length === 1}>
      {' '}
      -{' '}
    </button>
    <span>{cartList.length}</span>
    <button onClick={onClick(addToCart, skuId)}> + </button>
  </div>
);

ProductQuantityCounter.propTypes = {
  skuId: PropTypes.string.isRequired,
  cartList: PropTypes.array.isRequired,
  reduceQuantity: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductQuantityCounter);
