import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AddCart from 'hometown-components/lib/Icons/AddCart';
import Button from 'hometown-components/lib/Buttons';
import Span from 'hometown-components/lib/Span';
import * as actionCreators from 'redux/modules/cart';
import { PINCODE } from 'helpers/Constants';

const onClick = (skuId, simpleSku, session, pincode) => dispatcher => e => {
  e.preventDefault();
  dispatcher(skuId, simpleSku, session, pincode);
};

const mapStateToProps = ({ userLogin, pincode }) => ({
  session: userLogin.sessionId,
  pincode: pincode.selectedPincode ? pincode.selectedPincode : PINCODE
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const AddToCart = ({
  session, simpleSku, sku, addToCart, pincode
}) => (
  <Button
    btnType="custom"
    border="1px solid"
    bc="#ae8873"
    color="#ae8873"
    p="8px 15px 0"
    onClick={onClick(sku, simpleSku, session, pincode)(addToCart)}
  >
    <AddCart fill="#ae8873" />
    <Span ml="0.625rem" fontSize="0.857rem" fontWeight="600" color="#ae8873" va="top">
      ADD TO CART
    </Span>
  </Button>
);

AddToCart.propTypes = {
  simpleSku: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
