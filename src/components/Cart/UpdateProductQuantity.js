import React from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components-dev/lib/Buttons';
import { Label } from 'hometown-components-dev/lib/Label';
import Row from 'hometown-components-dev/lib/Row';
import Div from 'hometown-components-dev/lib/Div';
import Img from 'hometown-components-dev/lib/Img';
import { connect } from 'react-redux';
import { updateCart } from 'redux/modules/cart';
import { PINCODE } from 'helpers/Constants';

const ReductIcon = require('../../../static/remove_circle_outline.svg');
const IncreaseIcon = require('../../../static/add_circle_outline.svg');
const LoaderIcon = require('../../../static/refresh-primary.svg');

const mapStateToProps = ({ pincode, app }) => ({
  pincode: pincode.selectedPincode === '' ? PINCODE : pincode.selectedPincode,
  sessionId: app.sessionId
});

const onClick = (cartId, skuId, simpleSku, session, pincode, qty) => dispatcher => e => {
  e.preventDefault();
  dispatcher(cartId, skuId, simpleSku, session, pincode, qty);
};

const ProductQuantity = ({
  cartId,
  updateQuantity,
  quantity,
  simpleSku,
  skuId,
  pincode,
  sessionId,
  cartItemLoading
}) => (
  <Row display="block" m="0">
    <Div col="12" ta="left">
      <Button
        type="custom"
        color="textDark"
        border="none"
        bg="white"
        bc="transparent"
        p="0"
        va="middle"
        onClick={onClick(cartId, skuId, simpleSku, sessionId, pincode, -1)(updateQuantity)}
        disabled={cartItemLoading(cartId) || quantity <= 1}
      >
        <Img src={ReductIcon} alt="" float="left" height="22px" />
      </Button>
      <Label color="textLight" mb="0" mt="0" p="0 10px" position="relative" top="2px">
        {cartItemLoading(cartId) ? (
          <Img width="19px" className="spin" va="bottom" src={LoaderIcon} display="inline" />
        ) : (
          quantity
        )}
      </Label>
      <Button
        type="custom"
        color="textDark"
        border="none"
        bg="white"
        bc="transparent"
        p="0"
        va="middle"
        onClick={onClick(cartId, skuId, simpleSku, sessionId, pincode, 1)(updateQuantity)}
        disabled={cartItemLoading(cartId)}
      >
        <Img src={IncreaseIcon} alt="" float="left" height="22px" />
      </Button>
    </Div>
  </Row>
);

ProductQuantity.defaultProps = {
  cartItemLoading: () => {}
};

ProductQuantity.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  cartId: PropTypes.number.isRequired,
  skuId: PropTypes.string.isRequired,
  simpleSku: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  cartItemLoading: PropTypes.func
};

export default connect(mapStateToProps, { updateQuantity: updateCart })(ProductQuantity);
