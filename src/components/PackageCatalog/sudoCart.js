import React, { Component } from "react";
import { connect } from "react-redux";
import { formatPackageItems } from "helpers/cartFormateres";
import PropTypes from "prop-types";
import SelectedItems from "./selectedProds";

const styles = require("./index.scss");

@connect(({ pincode, lackpackages, cart }) => ({
  selectedPincode: pincode.selectedPincode,
  sudoCartid: lackpackages.sudoCart,
  cartData: cart.data,
  sudoCartItems: cart.packageItems
}))
export default class SudoCart extends Component {
  state = {};

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { sudoCartid, sudoCartItems, cartData } = this.props;
    const foundItem = cartData.find(
      item => item.product_info.packageId === sudoCartid
    );
    const prodArr = foundItem ? formatPackageItems(foundItem.packageItems) : [];
    console.log(prodArr);
    return (
      <div style={{ background: "#FFF8F4" }}>
        <div
          style={{
            color: "#323131",
            fontSize: "16px",
            fontWeight: 600,
            position: "absolute",
            top: "25px",
            left: "9%",
            zIndex: 2
          }}
        >
          {prodArr.length} Products Included
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            background: "rgb(255, 248, 244)",
            height: "50px",
            width: "100%"
          }}
        ></div>
        <div
          style={{ height: "90vh", overflow: "auto", paddingTop: "30px" }}
          className={styles.PackageCatalogContainer}
        >
          {Array.isArray(prodArr) && prodArr.length && (
            <SelectedItems
              handlePlpModal={this.props.handlePlpModal}
              isSudoCart={true}
              cat={{ products: prodArr }}
            />
          )}
        </div>
        <div
          className={styles.package_plp_container}
          style={{ padding: "0px", overflow: "hidden" }}
        >
          <div className={styles.select_container}>
            <button onClick={this.props.handleSCModal}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}
