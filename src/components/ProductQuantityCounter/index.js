import React from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';
import { Label } from 'hometown-components/lib/Label';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/cart';

const ReductIcon = require('../../../static/minus.jpg');
const IncreaseIcon = require('../../../static/plus.jpg');

const mapStateToProps = ({ cart }) => ({ ...cart });

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const onClick = (dispatcher, skuId) => e => {
  e.preventDefault();
  dispatcher(skuId);
};

const getCount = (cartList, skuId) => {
  const itemCount = cartList.find(item => item.sku === skuId);
  const { count } = itemCount || 0;
  return count;
};

const ProductQuantityCounter = ({
  skuId, cartList, reduceQuantity, addToCart
}) => {
  const count = getCount(cartList, skuId);
  return (
    <Row display="block" mr="0" ml="0" mb="1.25rem">
      <Div col="12" ta="right">
        <Button
          type="custom"
          color="textDark"
          border="none"
          bg="white"
          bc="transparent"
          pt="0"
          pb="0"
          va="middle"
          onClick={onClick(reduceQuantity, skuId)}
          disabled={count <= 1}
        >
          <Img src={ReductIcon} alt="" float="left" height="22px" />
        </Button>
        <Label color="textDark" mb="0" mt="0">
          {count}
        </Label>
        <Button
          type="custom"
          color="textDark"
          border="none"
          bg="white"
          bc="transparent"
          pt="0"
          pb="0"
          va="middle"
          onClick={onClick(addToCart, skuId)}
        >
          <Img src={IncreaseIcon} alt="" float="left" height="22px" />
        </Button>
      </Div>
    </Row>
  );
};

ProductQuantityCounter.propTypes = {
  skuId: PropTypes.string.isRequired,
  cartList: PropTypes.array.isRequired,
  reduceQuantity: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductQuantityCounter);