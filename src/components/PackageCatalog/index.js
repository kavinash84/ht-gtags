import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ResponsiveModal from "components/Modal";
// import Container from "hometown-components/lib/Container";
import Section from 'hometown-components-dev/lib/SectionHtV1';
import { checkRedirection } from "utils/helper";
// import ReviewMenu from "../ReviewMenu";
// import BreadCrumb from "../../containers/Category/BreadCrumb";
// import DeliveryAddress from "../Cart/deliveryAddress";
import ProductsList from "./productsLists";
import {
  proceedPackageCatalog,
  savePackageCatalog,
  togglePLPModal,
  toggleProdModal,
  setReplaceIndex,
  toggleSavePostLogin,
  setPdpFromCart
} from "../../redux/modules/lackpackages";
// import { removeFromCart } from "redux/modules/cart";
import { notifSend } from "redux/modules/notifs";
import PackagePDP from "./packagePDP";
import Catagories from "./catagories";
import PackageBreadCrumb from "../OneLacPackage/packageBreadcrumb";

const BreadCrumpstyles = require("../Review/BreadCrumb.scss");
const styles = require("./index.scss");

const formatPrice = price => {
  let newPrice = 0;
  if (price.length > 3 && price !== null) {
    newPrice = Number(price.replace(",", ""));
    return newPrice;
  }
  return Number(price);
};

@connect(({ userLogin, lackpackages, pincode, app, router, cart }) => ({
  openProdModal: lackpackages.openProdModal,
  savePostLogin: lackpackages.savePostLogin,
  packageCatalog: lackpackages.package_catalog,
  oldList: lackpackages.oldList,
  currentPackage: lackpackages.currentPackage,
  selectedPincode: pincode.selectedPincode,
  isLoggedIn: userLogin.isLoggedIn,
  openPLPModal: lackpackages.openPLPModal,
  updated: lackpackages.updated,
  movetoCart: lackpackages.movetoCart,
  proceedLoader: lackpackages.proceedLoader,
  sessionId: app.sessionId,
  cartPackage: cart.currentPackage,
  packageItems: cart.packageItems,
  cartUpdated: cart.cartUpdated,
  cartUpdating: cart.cartUpdating,
  router
}))
export default class PackageCatalog extends Component {
  state = {
    openModal: false,
    totalSelected: 0,
    selected: [],
    priceWarningModal: false,
    cartWarningModal: false
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  handlePriceWarnModal = () => {
    this.setState({
      priceWarningModal: !this.state.priceWarningModal
    });
  };

  handleCartWarnModal = () => {
    this.setState({
      cartWarningModal: !this.state.cartWarningModal
    });
  };

  handlePlpModal = i => {
    const { dispatch } = this.context.store;
    const { openPLPModal } = this.props;
    dispatch(setReplaceIndex(i));
    dispatch(togglePLPModal(!openPLPModal));
  };

  handleProdModal = () => {
    const { dispatch } = this.context.store;
    const { openProdModal } = this.props;
    dispatch(toggleProdModal(!openProdModal));
  };

  handleSave = () => {
    const { dispatch } = this.context.store;
    const {
      isLoggedIn,
      selectedPincode,
      currentPackage,
      sessionId,
      history,
      oldList,
      router
    } = this.props;
    const { selected } = this.state;
    const postData = {
      new_skus: selected,
      old_skus: oldList,
      fk_cart_rule: currentPackage,
      pincode: selectedPincode,
      session_id: sessionId
    };
    if (isLoggedIn) {
      dispatch(savePackageCatalog(postData));
    } else {
      history.push(`/login/?redirect=${checkRedirection(router.location)}`);
      dispatch(toggleSavePostLogin(false));
    }
    console.log(router ,'router');
  };

  handleDeletePackage = () => {
    const { history } = this.props;
    history.push(`/checkout/cart`);
    // const { dispatch } = this.context.store;
    // const { cartPackage, selectedPincode, packageItems } = this.props;
    // const skus = packageItems.map(item => {
    //   return { simple_sku: item.simpleSku, qty: 1 };
    // });
    // const cartId = {
    //   skuData: skus,
    //   packageId: cartPackage
    // };
    // const sessionId = "";
    // const qty = 1;
    // const configId = cartPackage;
    // const pincode = selectedPincode;
    // dispatch(removeFromCart(cartId, sessionId, pincode, qty, configId));
  };

  handlePreProceed = () => {
    const { packageCatalog, cartPackage, currentPackage } = this.props;
    console.log(cartPackage, currentPackage);
    if (this.checkPriceStatus(packageCatalog)) {
      this.setState({ priceWarningModal: true });
    } else if (cartPackage !== "" && cartPackage !== currentPackage) {
      this.setState({ cartWarningModal: true });
    } else {
      this.handleProceed();
    }
  };

  handleProceed = () => {
    const { dispatch } = this.context.store;
    const {
      selectedPincode,
      currentPackage,
      sessionId,
      packageCatalog,
      oldList
    } = this.props;
    const { selected } = this.state;
    const postData = {
      new_skus: selected,
      old_skus: oldList,
      fk_cart_rule: currentPackage,
      pincode: selectedPincode,
      session_id: sessionId
    };
    this.setState({ priceWarningModal: false, cartWarningModal: false });
    if (this.checkPriceStatus(packageCatalog)) {
      dispatch(proceedPackageCatalog({ ...postData, fk_cart_rule: "" }));
    } else if (this.checkDelivarableStatus(packageCatalog)) {
      dispatch(proceedPackageCatalog(postData));
    } else {
      dispatch(
        notifSend({
          type: "warning",
          msg: `Some of the product is not deliverable at this pincode`,
          dismissAfter: 3000
        })
      );
    }
  };

  componentDidMount() {
    const { packageCatalog, savePostLogin } = this.props;
    const { dispatch } = this.context.store;
    if (packageCatalog.categories) {
      this.checkSelected(packageCatalog);
      if (savePostLogin) {
        const {
          isLoggedIn,
          selectedPincode,
          currentPackage,
          sessionId
        } = this.props;
        const postData = {
          new_skus: this.getSelected(packageCatalog),
          old_skus: [],
          fk_cart_rule: currentPackage,
          pincode: selectedPincode,
          session_id: sessionId
        };
        if (isLoggedIn) {
          dispatch(savePackageCatalog(postData));
        }
      }
      dispatch(setPdpFromCart(""));
      // this.setState({ oldList: this.getSelected(packageCatalog) });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.updated !== prevProps.updated) {
      const { packageCatalog } = this.props;
      if (packageCatalog.categories) {
        this.checkSelected(packageCatalog);
      }
    }
    if (this.props.movetoCart !== prevProps.movetoCart) {
      if (this.props.movetoCart) {
        const { history } = this.props;
        history.push(`/checkout/cart`);
      }
    }
    if (this.props.cartUpdated !== prevProps.cartUpdated) {
      if (this.props.cartUpdated) {
        const { dispatch } = this.context.store;
        this.setState({ priceWarningModal: false, cartWarningModal: false });
        dispatch(
          notifSend({
            type: "success",
            msg: `Package deleted now you can proceed.`,
            dismissAfter: 3000
          })
        );
      }
    }
  }

  checkSelected = data => {
    let count = 0;
    let selected = [];
    data.categories.map(item => {
      // const skus = item.value.split(",");
      item.products.map((i, index) => {
        if (i.isSelected) {
          count = count + 1;
          selected = [
            ...selected,
            {
              simple_sku: Object.keys(i.simples)[0],
              qty: 1
            }
          ];
        }
      });
    });
    this.setState({ totalSelected: count, selected: selected });
  };

  getSelected = data => {
    let selected = [];
    data.categories.map(item => {
      // const skus = item.value.split(",");
      item.products.map((i, index) => {
        if (i.isSelected) {
          selected = [
            ...selected,
            {
              simple_sku: Object.keys(i.simples)[0],
              qty: 1
            }
          ];
        }
      });
    });
    return selected;
  };

  checkDelivarableStatus = data => {
    let isDelivarable = true;
    data.categories.map(item => {
      if (isDelivarable) {
        for (let i = 0; i < item.products.length; i++) {
          if (!item.products[i].isDeliverable && item.products[i].isSelected) {
            isDelivarable = false;
            break;
          }
        }
      }
    });
    return isDelivarable;
  };

  checkPriceStatus = data => {
    let total = 0;
    data.categories.map(item => {
      for (let i = 0; i < item.products.length; i++) {
        if (item.products[i].isSelected) {
          total =
            total + formatPrice(item.products[i].pricing_details.special_price);
        }
      }
    });
    console.log(total);
    return total <= parseInt(data.price) ? true : false;
  };

  render() {
    const {
      openProdModal,
      packageCatalog,
      proceedLoader,
      cartUpdating
    } = this.props;
    return (
      <div className="wrapper">
        <div className={styles.PackageCatalogContainer}>
          {/* <ReviewMenu backBtn={true} menuIcon={false} /> */}
          <div className={BreadCrumpstyles.BreadCrumb_wrapper2} style={{marginTop:"0"}}>
            <PackageBreadCrumb isPacakge={true} />
          </div>
          {/* <Section mb="0px" p="0px" pr="0px" pl="0px">
            <Container type="container" pr="0px" pl="0px">
              <DeliveryAddress />
            </Container>
          </Section> */}
          <div style={{display:"flex", width: "100%", backgroundColor:"#FFF8F4"}}>
          <Section
            p="0"
            m="0"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "40%",
              marginLeft:"10%",
              marginBottom:"40px",
              marginTop:"20px"
            }}
          >
            {/* <MainFurnitureSlider data={carosalData} mb="0" /> */}
            <img src={packageCatalog.images} alt="Banner" style={{width:'100%'}}/>
          </Section>
          <Section
            style={{ padding: "0px 50px", zIndex: 1 , marginTop:"20px"}}
            className={styles.PackageCatalog_info_container}
            mb="0"
          >
            <div
              style={{
                color: "#323131",
                fontSize: "28px",
                fontWeight: 600,
                marginBottom: "20px"
              }}
            >
              {packageCatalog.title}
            </div>
            <div
              style={{ color: "#323131", fontSize: "18px", fontWeight: 600 , marginBottom:"20px"}}
            >
              {packageCatalog.subtitle}
            </div>
            <div
              style={{
                color: "#E9916B",
                fontSize: "22px",
                fontWeight: 600,
                margin: "10px 0px"
              }}
            >
              ₹{packageCatalog.price}{" "}
              <span
                style={{
                  color: "#999999",
                  fontSize: "18px"
                }}
              >
                (inclusive of taxes)
              </span>
            </div>
            <div>
              {Array.isArray(packageCatalog.emiOptions) &&
                packageCatalog.emiOptions.length && (
                  <div>
                    <div
                      style={{
                        color: "#605F5F",
                        fontSize: "18px",
                        fontWeight: 600,
                        marginTop: "15px"
                      }}
                    >
                      Emi Options
                    </div>
                    <div
                      style={{
                        marginTop: "10px",
                        fontSize: "15px",
                        color: "#605F5F",
                        maxHeight: "50px",
                        overflow: "auto"
                      }}
                    >
                      {packageCatalog.emiOptions.map((item, i) => {
                        if (!i) return <div>{item.mobile}</div>;
                      })}
                    </div>
                  </div>
                )}
            </div>
            {Array.isArray(packageCatalog.emiOptions) &&
              packageCatalog.emiOptions.length && (
                <div style={{marginTop: "25px"}}>
                  <span
                    style={{
                      color: "#605F5F",
                      fontSize: "15px",
                      cursor: "pointer"
                    }}
                    onClick={this.handleModal}
                  >
                    More info {`>`}
                  </span>
                </div>
              )}
          </Section>
          </div>
          {packageCatalog.categories.map((catItem, i) => (
            <Catagories
              cat={catItem}
              index={i}
              handlePlpModal={this.handlePlpModal}
            />
          ))}
        </div>
        <div className={styles.package_bottom_fixed}>
          <div style={{ marginLeft:'10%', padding:'40px 10px 40px'}}>
            <span>{this.state.totalSelected}</span>/{packageCatalog.totalQty}{" "}
            Items Selected
          </div>
          <div className={styles.buttons_container}>
            <button
              disabled={!this.state.totalSelected}
              className={styles.saveBtn}
              onClick={this.handleSave}
              style={{ opacity: !this.state.totalSelected ? "0.5" : "1" , cursor: "pointer"}}
            >
              Save
            </button>
            <button
              className={styles.proceedBtn}
              disabled={
                this.state.totalSelected !== packageCatalog.totalQty ||
                proceedLoader
                  ? true
                  : false
              }
              onClick={this.handlePreProceed}
              style={{
                // background: "#D5D9D7",
                opacity:
                  this.state.totalSelected !== packageCatalog.totalQty
                    ? "1.5"
                    : "2",
                    cursor: "pointer",
                    backgroundColor: this.state.totalSelected !== packageCatalog.totalQty ? "#F2F2F2" : "#ea9671"
              }}
            >
              {proceedLoader ? "Loading..." : "Proceed"}
            </button>
          </div>
        </div>
        <ResponsiveModal
          classNames={{
            overlay: "PackageListingOverlay",
            modal: "PackageListingModal"
          }}
          onCloseModal={this.handlePlpModal}
          open={this.props.openPLPModal}
        >
          <ProductsList handlePlpModal={this.handlePlpModal} />
        </ResponsiveModal>
        <ResponsiveModal
          classNames={{ modal: "PackageModal" }}
          onCloseModal={this.handleModal}
          open={this.state.openModal}
        >
          <div
            style={{
              background: "#F5EEEE",
              height: "50px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px"
            }}
          />
          <div
            style={{
              padding: "25px 20px",
              fontSize: "16px",
              color: "#000000",
              height: "50vh",
              overflow: "auto",
              marginBottom: "25px"
            }}
          >
            {/* {packageCatalog.description} */}
            {packageCatalog.emiOptions.map(item => (
              <div>{item.mobile}</div>
            ))}
          </div>
        </ResponsiveModal>
        <ResponsiveModal
          classNames={{
            overlay: "PackageListingOverlay",
            modal: "PackageDisplayModal"
          }}
          onCloseModal={this.handleProdModal}
          open={openProdModal}
        >
          <PackagePDP />
        </ResponsiveModal>
        <ResponsiveModal
          classNames={{ modal: "PackageModal" }}
          onCloseModal={this.handlePriceWarnModal}
          open={this.state.priceWarningModal}
        >
          <div
            style={{
              background: "#F5EEEE",
              height: "50px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px"
            }}
          />
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <p
              style={{
                color: "#000000",
                fontSize: "22px",
                fontWeight: 600,
                textAlign: "center",
                margin: "20px 0px",
                width: "60%"
              }}
            >
              {`The selected items in this package is less than ${packageCatalog.price}. Please replace few items to make it more than ${packageCatalog.price} Or click on Proceed to add products indivitually.`}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            <button
              className={styles.packageWarningBtns}
              style={{ background: "#D5D9D7" }}
              onClick={this.handlePriceWarnModal}
            >
              Cancel
            </button>
            <button
              className={styles.packageWarningBtns}
              onClick={this.handleProceed}
            >
              Proceed
            </button>
          </div>
        </ResponsiveModal>
        <ResponsiveModal
          classNames={{ modal: "PackageModal" }}
          onCloseModal={this.handleCartWarnModal}
          open={this.state.cartWarningModal}
        >
          <div
            style={{
              background: "#F5EEEE",
              height: "50px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px"
            }}
          />
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <span
              style={{
                color: "#000000",
                fontSize: "22px",
                fontWeight: 600,
                textAlign: "center",
                margin: "20px 0px",
                width: "60%"
              }}
            >
              There is Already A package in your cart, please delete the package
              and comeback.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            <button
              className={styles.packageWarningBtns}
              style={{ background: "#D5D9D7" }}
              onClick={this.handleCartWarnModal}
            >
              Cancel
            </button>
            <button
              className={styles.packageWarningBtns}
              onClick={this.handleDeletePackage}
              // disabled={cartUpdating}
            >
              Go To Cart
            </button>
          </div>
        </ResponsiveModal>
      </div>
    );
  }
}
