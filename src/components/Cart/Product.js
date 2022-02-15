import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCart, removeFromCart } from "redux/modules/cart";
import { PINCODE } from "helpers/Constants";
import ResponsiveModal from "components/Modal";
import SudoCart from "../PackageCatalog/sudoCart";
import {
  // togglePLPModal,
  toggleProdModal,
  loadPackageSudoCart,
  toggleSCModal,
  loadPackageCatalog
} from "../../redux/modules/lackpackages";
// import ProductsList from "../PackageCatalog/productsLists";
import PackagePDP from "../PackageCatalog/packagePDP";


const mapStateToProps = ({ pincode, app, lackpackages, cart }) => ({
  pincode: pincode.selectedPincode === "" ? PINCODE : pincode.selectedPincode,
  sessionId: app.sessionId,
  openSCModal: lackpackages.openSCModal,
  openPLPModal: lackpackages.openPLPModal,
  sudoCartItems: cart.packageItems,
  openProdModal: lackpackages.openProdModal
});


class ProductItem extends Component {
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
      openSCModal,
      isPackage
    } = this.props;

    return (
      <React.Fragment>
        <div>
        {isPackage ? (
          <div
            style={{
              color: "white",
              background: "#999999",
              borderRadius: "7px",
              width: "100%",
              padding: "15px",
              textAlign: "center",
              marginTop: "-7px",
              cursor: "pointer"
            }}
            onClick={this.handleSCModal}
          >
            CLICK HERE TO CHECK ALL PRODUCTS
          </div>
        ) : null}
        </div>
       
        <ResponsiveModal
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
        </ResponsiveModal>
        <ResponsiveModal
          classNames={{
            overlay: "PackageListingOverlay",
            modal: "PackageDisplayModal"
          }}
          onCloseModal={this.handleProdModal}
          open={this.props.openProdModal}
        >
          <PackagePDP />
        </ResponsiveModal>

      </React.Fragment>
    );
  }
}

ProductItem.defaultProps = {
  cartItemLoading: () => {},
  demoProduct: false,
  checked: false,
  configId: ""
};

ProductItem.propTypes = {
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
})(ProductItem);
