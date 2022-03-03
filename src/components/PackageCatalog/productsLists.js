import React, { Component } from "react";
import { connect } from "react-redux";
// import Div from "hometown-components/lib/Div";
import PropTypes from "prop-types";
import { notifSend } from "redux/modules/notifs";
import {
  toggleProdModal,
  selectPackageCat,
  setPdpIndex,
  setReplaceIndex,
  selectSkuForPlp
} from "../../redux/modules/lackpackages";

const styles = require("./index.scss");

const Checked = require("../../../static/onelacPackage/checked.svg");
const UnChecked = require("../../../static/onelacPackage/unchecked.svg");

@connect(({ userLogin, lackpackages }) => ({
  openProdModal: lackpackages.openProdModal,
  replaceIndex: lackpackages.replaceIndex,
  packageCatalog: lackpackages.package_catalog,
  replaceSku: lackpackages.replaceSku
}))
export default class ProductsList extends Component {
  state = {
    products: []
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleProdModal = () => {
    const { dispatch } = this.context.store;
    const { openProdModal } = this.props;
    dispatch(toggleProdModal(!openProdModal));
  };

  handleSelect = () => {
    const { dispatch } = this.context.store;
    const { replaceIndex, handlePlpModal } = this.props;
    const { products } = this.state;
    const obj = {
      index: replaceIndex,
      products
    };
    dispatch(selectPackageCat(obj));
    handlePlpModal();
  };

  handleClick = (i, isSelected) => {
    const { dispatch } = this.context.store;
    let arr = [...this.state.products];
    const { packageCatalog, replaceIndex } = this.props;
    const { products } = this.state;
    let selectedCount = 0;
    products.map(item => {
      if (item.isSelected) {
        selectedCount = selectedCount + 1;
      }
    });
    if (
      packageCatalog.categories[replaceIndex].total_qty === selectedCount &&
      !isSelected
    ) {
      dispatch(
        notifSend({
          type: "warning",
          msg: `You can celect maximum ${packageCatalog.categories[replaceIndex].total_qty} items in this catagory`,
          dismissAfter: 3000
        })
      );
    } else {
      arr[i] = {
        ...this.state.products[i],
        isSelected: !this.state.products[i].isSelected
      };
      this.setState({ products: arr });
    }
  };

  checkDisabled = () => {
    const { packageCatalog, replaceIndex } = this.props;
    const { products } = this.state;
    let selectedCount = 0;
    products.map(item => {
      if (item.isSelected) {
        selectedCount = selectedCount + 1;
      }
    });
    if (packageCatalog.categories[replaceIndex]) {
      if (packageCatalog.categories[replaceIndex].total_qty === selectedCount) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  handleIndexSelect = () => {
    const { packageCatalog, replaceSku } = this.props;
    const str = replaceSku.split("-")[0];
    let foundIndex = 0;
    if (packageCatalog.categories) {
      packageCatalog.categories.map((item, i) => {
        item.products.map(prod => {
          if (prod.meta.sku === str) {
            foundIndex = i;
          }
        });
      });
      if (!isNaN(foundIndex) && packageCatalog.categories[foundIndex]) {
        const { dispatch } = this.context.store;
        console.log(foundIndex, "foundIndex");
        dispatch(setReplaceIndex(foundIndex));
        dispatch(selectSkuForPlp(""));
        this.setState({
          products: packageCatalog.categories[foundIndex].products
        });
      }
    }
  };

  componentDidMount() {
    const { packageCatalog, replaceIndex, replaceSku } = this.props;
    if (!isNaN(replaceIndex) && replaceSku) {
      this.handleIndexSelect();
    } else {
      if (
        packageCatalog.categories &&
        packageCatalog.categories[replaceIndex]
      ) {
        this.setState({
          products: packageCatalog.categories[replaceIndex].products
        });
      }
    }
  }

  checkSelectedCount = () => {
    let selectedCount = 0;
    this.state.products.map(item => {
      if (item.isSelected) {
        selectedCount = selectedCount + 1;
      }
    });
    return selectedCount;
  };

  render() {
    const { replaceIndex, packageCatalog } = this.props;
    return (
      <div className={styles.package_plp_container}>
        {packageCatalog.categories &&
        packageCatalog.categories[replaceIndex] ? (
          <React.Fragment>
            <div style={{ fontSize: "16px", fontWeight: 600 }}>
              Choose Products({this.checkSelectedCount()}/
              {packageCatalog.categories[replaceIndex].total_qty})
            </div>
            {this.state.products && (
              <div className={styles.listContainer}>
                {this.state.products.map((slide, i) => (
                  <div className={styles.caroselItem} key={String(i)} style={{ width: "33%" }}>
                    <div
                      style={{ position: "relative" }}
                      onClick={() => {
                        if (!slide.isDeliverable && !slide.isSelected) {
                          const { dispatch } = this.context.store;
                          dispatch(
                            notifSend({
                              type: "warning",
                              msg: `This product not Delivarable at this pincode`,
                              dismissAfter: 3000
                            })
                          );
                        } else {
                          this.handleClick(i, slide.isSelected);
                        }
                      }}
                    >
                      {slide.isSelected ? (
                        <img
                          src={Checked}
                          alt="Checked"
                          style={{ position: "absolute", right: 0, top: 0 }}
                        />
                      ) : (
                        <img
                          src={UnChecked}
                          alt="UnChecked"
                          style={{
                            position: "absolute",
                            right: "8px",
                            top: "8px"
                          }}
                        />
                      )}
                      <div className={styles.caroselImg}>
                        <img
                          src={`${slide.image}-catalog_360.jpg`}
                          alt="product image"
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        background: "#FFFFFF",
                        padding: "15px",
                        minHeight: "91px"
                      }}
                    >
                      <div
                        className={styles.prod_title}
                        style={{
                          fontSize: "16px",
                          color: "#323131",
                          lineHeight: "20px",
                          marginTop: "-10px"
                        }}
                      >
                        {slide.meta.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <div
                          style={{
                            color: "#E9916B",
                            fontSize: "14px",
                            marginTop: "5px"
                          }}
                          onClick={() => {
                            const { dispatch } = this.context.store;
                            dispatch(
                              setPdpIndex({
                                catIndex: replaceIndex,
                                prodIndex: i
                              })
                            );
                            dispatch(toggleProdModal(true));
                          }}
                        >
                          More Info
                        </div>
                        {!slide.isDeliverable ? (
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              marginTop: "5px"
                            }}
                          >
                            Not Deliverable
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className={styles.select_container}>
              <button
                onClick={() => this.handleSelect()}
                disabled={this.checkDisabled()}
                style={{cursor: "pointer"}}
              >
                Select
              </button>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    );
  }
}
