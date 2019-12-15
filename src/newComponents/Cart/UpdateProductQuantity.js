import React from 'react';
import PropTypes from 'prop-types';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
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
  <RowHtV1 display="block" m="0">
    <BoxHtV1 col="12" textAlign="left">
      <ButtonHtV1
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
        <ImageHtV1 src={ReductIcon} alt="" float="left" height="22px" />
      </ButtonHtV1>
      <LabelHtV1 color="textLight" mb="0" mt="0" p="0 10px" position="relative" top="2px">
        {cartItemLoading(cartId) ? (
          <ImageHtV1 width="19px" className="spin" va="bottom" src={LoaderIcon} display="inline" />
        ) : (
          quantity
        )}
      </LabelHtV1>
      <ButtonHtV1
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
        <ImageHtV1 src={IncreaseIcon} alt="" float="left" height="22px" />
      </ButtonHtV1>
    </BoxHtV1>
  </RowHtV1>
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
