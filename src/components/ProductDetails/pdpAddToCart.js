import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

/**
 * Components
 */
// import AddCartIcon from 'hometown-components-dev/lib/Icons/AddCart';
import Box from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";

/**
 * Modules / Helpers / Selectors
 */
import * as actionCreators from "redux/modules/cart";
import { getCartListSKU } from "selectors/cart";
import { PINCODE, CART_URL } from "helpers/Constants";

const checkSKUInCart = (list, sku) => list.includes(sku);
const checkSKUItemsInCart = (list, sku, quantity) => {
  let numberIsSame = false;
  list.forEach(item => {
    if (item.configurable_sku === sku && item.qty === quantity) {
      numberIsSame = true;
    }
  });
  return numberIsSame;
};
const LoaderIcon = require("../../../static/refresh.svg");
// const CheckedIcon = require('../../../static/added-to-cart-icon.png');
let selectedSku = "";

const onClick = (
  key,
  skuId,
  simpleSku,
  session,
  pincode,
  configId,
  quantity
) => dispatcher => e => {
  selectedSku = skuId;
  console.log(
    key,
    skuId,
    simpleSku,
    session,
    pincode,
    configId,
    quantity,
    "bug fix"
  );
  e.preventDefault();
  dispatcher(key, skuId, simpleSku, session, pincode, configId, quantity);
};

const mapStateToProps = ({
  app: { sessionId },
  pincode,
  cart,
  cart: { addingToCart, addedToCart, key, data }
}) => ({
  session: sessionId,
  pincode: pincode.selectedPincode ? pincode.selectedPincode : PINCODE,
  addingToCart,
  addedToCart,
  stateId: key,
  cartSKUs: getCartListSKU(cart),
  cart,
  cartData: data
});

const AddToCart = ({
  session,
  simpleSku,
  sku,
  addToCart,
  updateCart,
  pincode,
  cartSKUs,
  addingToCart,
  itemId,
  stateId,
  isSoldOut,
  quantity,
  quantityChange,
  skuItem,
  cartData,
  size,
  height,
  configId
}) => {
  const checkStatus = checkSKUInCart(cartSKUs, sku);
  const checkSKUItem = checkSKUItemsInCart(cartData, sku, quantity);
  const addLoading = addingToCart && stateId === itemId;
  const { id_customer_cart: cartId = "", qty } = skuItem;
  const updateQty = qty ? quantity - qty : quantity;
  return (
    <Fragment>
      {isSoldOut ? (
        // <Button
        //   backgroundColor="#626463"
        //   variant={`outline.error.${size}`}
        //   height={height}
        //   style={{ width: "320px", color: "#FFFFFF", borderColor: "#626463" }}
        // >
        //   Out of Stock
        // </Button>
        null
      ) : (
          <Fragment>
            {!checkStatus || !checkSKUItem ? (
              <Button
                backgroundColor="#626463"
                borderColor="#626463"
                width="70%"
                color="#FFFFFF"
                // variant={`outline.primary.${size}`}
                variant="outline.primary.large"
                height={height}
                disabled={addLoading && selectedSku === sku}
                onClick={e => {
                  if (quantityChange && updateQty !== 0 && checkStatus) {
                    const handler = onClick(
                      cartId,
                      sku,
                      simpleSku,
                      session,
                      pincode,
                      configId,
                      updateQty
                    )(updateCart);
                    handler(e);
                  } else {
                    const handler = onClick(
                      itemId,
                      sku,
                      simpleSku,
                      session,
                      pincode,
                      configId,
                      quantity
                    )(addToCart);
                    handler(e);
                  }
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {addLoading && selectedSku === sku && (
                  <Image className="spin" src={LoaderIcon} width="18px" mr={10} />
                )}
                {/* {console.log(shouldLoad, 'asdasdasdasd')} */}
                {addLoading && selectedSku === sku ? "Adding..." : "Add to Cart"}
              </Button>
            ) : (
                <Row mx={0} alignItems="center">
                  <Box as={Link} to={CART_URL} style={{ width: "70%", marginBottom: "10px", marginTop: "10px" }}>
                    <Button
                      border="1px solid #626463"
                      backgroundColor="#626463"
                      color="#FFFFFF"
                      variant="outline.primary.large"
                      width={1}
                      height={height}
                    >
                      GO TO CART
                </Button>
                  </Box>
                </Row>
              )}
          </Fragment>
        )}
    </Fragment>
  );
};

AddToCart.defaultProps = {
  cartSKUs: [],
  addingToCart: false,
  itemId: "",
  stateId: "",
  isSoldOut: false,
  quantity: 1,
  quantityChange: false,
  skuItem: {},
  cartData: {},
  size: "large",
  height: 44,
  configId: ""
};

AddToCart.propTypes = {
  simpleSku: PropTypes.string.isRequired,
  cartSKUs: PropTypes.array,
  sku: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
  addingToCart: PropTypes.bool,
  itemId: PropTypes.string,
  stateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isSoldOut: PropTypes.bool,
  quantity: PropTypes.number,
  quantityChange: PropTypes.bool,
  skuItem: PropTypes.object,
  cartData: PropTypes.object,
  size: PropTypes.string,
  height: PropTypes.number,
  configId: PropTypes.string
};

export default connect(mapStateToProps, { ...actionCreators })(AddToCart);
