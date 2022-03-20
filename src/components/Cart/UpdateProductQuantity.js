import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const styles = require("./productitem.scss");

/**
 * Components
 */
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Label from "hometown-components-dev/lib/LabelHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";

/**
 * modules / helpers
 */
import { updateCart } from "redux/modules/cart";
import { PINCODE } from "helpers/Constants";

/**
 * Icons
 */
const reductIcon = require("../../../static/reduct.svg");
const increaseIcon = require("../../../static/increase.svg");
const LoaderIcon = require("../../../static/refresh-primary.svg");

const mapStateToProps = ({ pincode, app }) => ({
  pincode: pincode.selectedPincode === "" ? PINCODE : pincode.selectedPincode,
  sessionId: app.sessionId
});

const onClick = (
  cartId,
  skuId,
  simpleSku,
  session,
  pincode,
  qty,
  configId
) => dispatcher => e => {
  e.preventDefault();
  dispatcher(cartId, skuId, simpleSku, session, pincode, configId, qty);
};

const ProductQuantity = ({
  cartId,
  updateQuantity,
  quantity,
  simpleSku,
  skuId,
  pincode,
  sessionId,
  cartItemLoading,
  configId
}) => (
  <div className={styles.qtybtn}>
    <button
      onClick={onClick(
        cartId,
        skuId,
        simpleSku,
        sessionId,
        pincode,
        -1,
        configId
      )(updateQuantity)}
      disabled={cartItemLoading(cartId) || quantity <= 1}
      style={{
        padding: "0px",
        border: "none",
        background: "transparent",
        cursor: "pointer"
      }}
    >
      -
    </button>
    {/* <div style={{fontSize: "14px"}}>{quantity}</div>
     */}
     {cartItemLoading(cartId) || cartItemLoading(configId) ? (
        <Image width={20} className="spin" src={LoaderIcon} />
      ) : (
        quantity
      )}
    <button
      style={{
        padding: "0px",
        border: "none",
        background: "transparent",
        cursor: "pointer"
      }}
      onClick={onClick(
        cartId,
        skuId,
        simpleSku,
        sessionId,
        pincode,
        1,
        configId
      )(updateQuantity)}
      disabled={cartItemLoading(cartId)}
    >
      +
    </button>
  </div>
);

ProductQuantity.defaultProps = {
  cartItemLoading: () => {},
  configId: ""
};

ProductQuantity.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  cartId: PropTypes.number.isRequired,
  skuId: PropTypes.string.isRequired,
  simpleSku: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  cartItemLoading: PropTypes.func,
  configId: PropTypes.string
};

export default connect(mapStateToProps, { updateQuantity: updateCart })(
  ProductQuantity
);
