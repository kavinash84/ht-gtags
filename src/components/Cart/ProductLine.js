import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatAmount } from "utils/formatters";
import { updateCart, removeFromCart } from "redux/modules/cart";
import { PINCODE } from "helpers/Constants";
import ResponsiveModal from "components/Modal";
import { Link } from "react-router-dom";
// import SudoCart from "../PackageCatalog/sudoCart";
import {
  // togglePLPModal,
  toggleProdModal,
  loadPackageSudoCart,
  toggleSCModal,
  loadPackageCatalog
} from "../../redux/modules/lackpackages";
// import ProductsList from "../PackageCatalog/productsLists";
// import PackagePDP from "../PackageCatalog/packagePDP";

const styles = require("./productitem.scss");
const Delete = require("../../../static/cart/delete.svg");
const SaleIcon = require("../../../static/cart/sale.svg");

const mapStateToProps = ({ pincode, app, lackpackages, cart }) => ({
  pincode: pincode.selectedPincode === "" ? PINCODE : pincode.selectedPincode,
  sessionId: app.sessionId,
  openSCModal: lackpackages.openSCModal,
  openPLPModal: lackpackages.openPLPModal,
  sudoCartItems: cart.packageItems,
  openProdModal: lackpackages.openProdModal
});

const onClickRemove = (
  cartId,
  sessionId,
  pincode,
  qty,
  configId
) => dispatcher => onDelete => e => {
  e.preventDefault();
  onDelete();
  dispatcher(cartId, sessionId, pincode, qty, configId);
};

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
  dispatcher(cartId, skuId, simpleSku, session, pincode, qty, configId);
};
class ProductLine extends Component {
  state = { deleteData: "" };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleSCModal = () => {
    const { dispatch } = this.context.store;
    const { openSCModal, packageId, pincode } = this.props;
    dispatch(loadPackageSudoCart(packageId));
    dispatch(toggleSCModal(!openSCModal));
    dispatch(loadPackageCatalog(pincode, packageId));
  };

  componentDidMount() {
    const { dispatch } = this.context.store;
    const { sudoCartItems, isPackage } = this.props;
    dispatch(toggleSCModal(false));
    if (isPackage) {
      let skuData = [];
      if (Array.isArray(sudoCartItems)) {
        sudoCartItems.map(item => {
          skuData = [
            ...skuData,
            {
              simple_sku: item.simpleSku,
              qty: 1
            }
          ];
        });
      }
      this.setState({ deleteData: skuData });
    }
  }

  handlePLPModal = () => {
    // const { dispatch } = this.context.store;
    // const { openPLPModal } = this.props;
    // dispatch(togglePLPModal(!openPLPModal));
  };

  handleProdModal = () => {
    const { dispatch } = this.context.store;
    const { openProdModal } = this.props;
    dispatch(toggleProdModal(!openProdModal));
  };

  render() {
    const {
      Pname,
      Pimage,
      deliveryBy,
      specialPrice,
      unitPrice,
      netPrice,
      discount,
      couponDiscount,
      coupon,
      cartId,
      updateQuantity,
      quantity,
      simpleSku,
      skuId,
      pincode,
      sessionId,
      cartItemLoading,
      discardFromCart,
      handleCheckboxClick,
      checked,
      demoProduct,
      onDelete,
      configId,
      assembly,
      productURL,
      openSCModal,
      isPackage,
      packageId
    } = this.props;
    const deliveryArr = deliveryBy.split(" ");
    let deliveryStr = "";
    let isDeliverable = true;
    deliveryArr.map((item, i) => {
      if (i === 0) {
        if (item === "Not") {
          isDeliverable = false;
        }
      } else {
        if (i > 1) {
          deliveryStr = deliveryStr + " " + item;
        }
      }
    });
    return (
      <React.Fragment>
        <div className={styles.productItemContainer}>
          <Link to={productURL}>
            <div className={styles.product_line}>
              <div className={styles.productImage}>
                <img src={Pimage} alt="product" />
              </div>
              <div className={styles.productrightline}>
                <div className={styles.productname}>{Pname}</div>
                <div className={styles.productsubname}>
                  <span>By Hometown</span>
                  <img
                    src={Delete}
                    alt="delete"
                    onClick={
                      isPackage
                        ? onClickRemove(
                            {
                              skuData: this.state.deleteData,
                              packageId: packageId
                            },
                            sessionId,
                            pincode,
                            quantity,
                            configId
                          )(discardFromCart)(onDelete)
                        : onClickRemove(
                            {
                              skuData: [
                                { simple_sku: simpleSku, qty: quantity }
                              ],
                              packageId: false
                            },
                            sessionId,
                            pincode,
                            quantity,
                            configId
                          )(discardFromCart)(onDelete)
                    }
                  />
                </div>
              </div>
            </div>
          </Link>
          <div className={styles.productdetails}>
            <div style={{ marginRight: "5px" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "black",
                  marginBottom: "5px",
                  fontWeight: 600
                }}
              >
                Delivery by:
              </div>
              <div style={{ fontSize: "12px", color: "#999999" }}>
                {isDeliverable ? deliveryStr : deliveryBy}
              </div>
            </div>
            <div style={{ marginRight: "5px" }}>
              <div
                style={{
                  fontSize: "12px",
                  color: "#F47020",
                  marginBottom: "5px",
                  fontWeight: 600
                }}
              >
                ₹{netPrice ? formatAmount(netPrice) : null}
              </div>
              {discount ? (
                <div style={{ fontSize: "12px", whiteSpace: "nowrap" }}>
                  <span
                    style={{ color: "#999999", textDecoration: "line-through" }}
                  >
                    ₹{unitPrice ? formatAmount(unitPrice) : null}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#F47020",
                      marginLeft: "5px"
                    }}
                  >
                    {discount}% Off
                  </span>
                </div>
              ) : null}
            </div>
            {isPackage ? null : (
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
                    background: "transparent"
                  }}
                >
                  -
                </button>
                <div>{quantity}</div>
                <button
                  style={{
                    padding: "0px",
                    border: "none",
                    background: "transparent"
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
            )}
          </div>
          {couponDiscount ? (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "10px"
              }}
            >
              <img src={SaleIcon} alt="sale" />
              <div>
                <span
                  style={{
                    fontWeight: 600,
                    color: "black",
                    marginLeft: "10px",
                    marginRight: "5px",
                    fontSize: "14px",
                    textTransform: "uppercase"
                  }}
                >
                  {coupon}
                </span>
                <span style={{ color: "#999999", fontSize: "12px" }}>
                  applied on this product.
                </span>
              </div>
            </div>
          ) : null}

          {demoProduct && (
            <div display="inline-block">
              <label className={styles.checkbox_container} htmlFor={simpleSku}>
                Select For Virtual Demo
                <input
                  type="checkbox"
                  id={simpleSku}
                  onClick={handleCheckboxClick}
                  checked={checked}
                />
                <span className={styles.checkmark}></span>
              </label>
            </div>
          )}
        </div>
        {isPackage ? (
          <div
            style={{
              color: "white",
              background: "#999999",
              borderRadius: "7px",
              width: "100%",
              padding: "15px",
              textAlign: "center",
              marginTop: "-7px"
            }}
            onClick={this.handleSCModal}
          >
            CLICK HERE TO CHECK ALL PRODUCTS
          </div>
        ) : null}
        {/* <ResponsiveModal
          classNames={{
            overlay: "PackageListingOverlay",
            modal: "PackageDisplayModal"
          }}
          onCloseModal={this.handleSCModal}
          open={openSCModal}
        >
          <SudoCart
            handleSCModal={this.handleSCModal}
            handlePlpModal={this.handlePLPModal}
          />
        </ResponsiveModal> */}
        {/* <ResponsiveModal
          classNames={{
            overlay: "PackageListingOverlay",
            modal: "PackageDisplayModal"
          }}
          onCloseModal={this.handleProdModal}
          open={this.props.openProdModal}
        >
          <PackagePDP />
        </ResponsiveModal> */}
        {/* <ResponsiveModal
          classNames={{
            overlay: "PackageListingOverlay",
            modal: "PackageListingModal"
          }}
          onCloseModal={this.handlePLPModal}
          open={this.props.openPLPModal}
        >
          <ProductsList handlePlpModal={this.handlePLPModal} />
        </ResponsiveModal> */}
      </React.Fragment>
    );
  }
}

ProductLine.defaultProps = {
  cartItemLoading: () => {},
  demoProduct: false,
  checked: false,
  configId: ""
};

ProductLine.propTypes = {
  updateQuantity: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
  cartId: PropTypes.number.isRequired,
  skuId: PropTypes.string.isRequired,
  simpleSku: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  cartItemLoading: PropTypes.func,
  discardFromCart: PropTypes.func.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  demoProduct: PropTypes.bool,
  checked: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  configId: PropTypes.string
};

export default connect(mapStateToProps, {
  updateQuantity: updateCart,
  discardFromCart: removeFromCart
})(ProductLine);
