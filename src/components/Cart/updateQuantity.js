import React from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';
import { Label } from 'hometown-components/lib/Label';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import { connect } from 'react-redux';
import { updateCart } from 'redux/modules/cart';
import { PINCODE } from 'helpers/Constants';

const ReductIcon = require('../../../static/minus.jpg');
const IncreaseIcon = require('../../../static/plus.jpg');

const mapStateToProps = ({ pincode, userLogin }) => ({
  pincode: pincode.selectedPincode === '' ? PINCODE : pincode.selectedPincode,
  sessionId: userLogin.sessionId
});

const onClick = (skuId, simpleSku, session, pincode, qty) => dispatcher => e => {
  e.preventDefault();
  dispatcher(skuId, simpleSku, session, pincode, qty);
};

const ProductQuantity = ({
  updateQuantity, quantity, simpleSku, skuId, pincode, sessionId
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
        onClick={onClick(skuId, simpleSku, sessionId, pincode, -1)(updateQuantity)}
        disabled={quantity <= 1}
      >
        <Img src={ReductIcon} alt="" float="left" height="22px" />
      </Button>
      <Label color="textDark" mb="0" mt="0" p="0 10px">
        {quantity}
      </Label>
      <Button
        type="custom"
        color="textDark"
        border="none"
        bg="white"
        bc="transparent"
        p="0"
        va="middle"
        onClick={onClick(skuId, simpleSku, sessionId, pincode, 1)(updateQuantity)}
      >
        <Img src={IncreaseIcon} alt="" float="left" height="22px" />
      </Button>
    </Div>
  </Row>
);

ProductQuantity.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  skuId: PropTypes.string.isRequired,
  simpleSku: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { updateQuantity: updateCart })(ProductQuantity);
