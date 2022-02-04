import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { notifSend } from "redux/modules/notifs";
import SlickSlider from "../../SlickSlider";
import {
  // addPackageCatalog,
  toggleProdModal,
  selectPackageCat,
  setPdpIndex
} from "../../../redux/modules/lackpackages";

const styles = require("../index.scss");
const Checked = require("../../../../static/onelacPackage/checked.svg");
const UnChecked = require("../../../../static/onelacPackage/unchecked.svg");

const adjustSlides = length => ({
  slidesToShow: length > 3 ? 3 : length,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: false
});

@connect(({ userLogin, lackpackages }) => ({
  packageCatalog: lackpackages.package_catalog
}))
class CaroselContainer extends Component {
  constructor(props) {
    super(props);
    this.couponInput = React.createRef();
  }

  state = {
    products: []
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleSelect = () => {
    const { dispatch } = this.context.store;
    const { index } = this.props;
    const { products } = this.state;
    const obj = {
      index,
      products
    };
    dispatch(selectPackageCat(obj));
  };

  handleClick = (i, isSelected) => {
    let arr = [...this.state.products];
    const { data } = this.props;
    if (data.total_qty === this.selectedCount() && !isSelected) {
      const { dispatch } = this.context.store;
      dispatch(
        notifSend({
          type: "warning",
          msg: `You can celect maximum ${data.total_qty} items in this catagory`,
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
    const { data } = this.props;
    if (data.total_qty === this.selectedCount()) {
      return false;
    } else {
      return true;
    }
  };

  selectedCount = () => {
    const { products } = this.state;
    let selectedCount = 0;
    products.map(item => {
      if (item.isSelected) {
        selectedCount = selectedCount + 1;
      }
    });
    return selectedCount;
  };

  componentDidMount() {
    const { data } = this.props;
    if (data.products) {
      this.setState({ products: data.products });
    }
  }

  render() {
    const { data, index, packageCatalog } = this.props;
    const { products } = this.state;
    return (
      <Div
        p="0"
        m="0"
        style={{
          background: "#FFF8F4",
          marginBottom:
            index + 1 === packageCatalog.categories.length ? "120px" : "0px"
        }}
      >
        <div
        style={{width: "81%",
              marginLeft:"9%",
              paddingTop:"20px"}}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 30px 10px 20px"
            }}
          >
            <div
              style={{
                color: "#323131",
                fontSize: "19px",
                fontWeight: 600,
                marginBottom: "10px"
              }}
            >
              {index + 1}. {data.title} ({this.selectedCount()}/{data.total_qty}
              )
            </div>
            <button
              onClick={() => this.handleSelect()}
              disabled={this.checkDisabled()}
              style={{
                color: "white",
                border: "none",
                background: "#EA9671",
                opacity: this.checkDisabled() ? "0.4" : "1",
                width: "100px",
                height: "35px",
                borderRadius: "5px"
              }}
            >
              Select
            </button>
          </div>
          <div style={{ background: "#FFF8F4" , marginTop: "20px"}}>
            <div style={{ paddingBottom: "15px"}}>
              <SlickSlider settings={adjustSlides(products.length)}>
                {products.map((slide, i) => (
                  <div key={String(i)} style={{ width: "100%"}}>
                    <div className={styles.caroselItem}
                     style={{
          width:
          products.length > 2 ? "auto" : "50%"
        }}
                    >
                      <div
                        style={{ position: "relative" }}
                        onClick={() => {
                          if (!slide.isDeliverable) {
                            const { dispatch } = this.context.store;
                            dispatch(
                              notifSend({
                                type: "warning",
                                msg: `This product is not deliverable at this pincode`,
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
                            style={{ position: "absolute", right: 0, top: 0, width:'auto' }}
                          />
                        ) : (
                          <img
                            src={UnChecked}
                            alt="UnChecked"
                            style={{
                              position: "absolute",
                              right: "8px",
                              top: "8px",
                              width: "auto"
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
                            fontSize: "12px",
                            color: "#323131",
                            lineHeight: "normal"
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
                              fontSize: "12px",
                              marginTop: "5px"
                            }}
                            onClick={() => {
                              const { dispatch } = this.context.store;
                              dispatch(
                                setPdpIndex({
                                  catIndex: index,
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
                  </div>
                ))}
              </SlickSlider>
            </div>
          </div>
          {/* <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: "17px",
              color: "#323131",
              fontWeight: 600
            }}
          >
            Select your 2nd product to confirm
          </div> */}
        </div>
      </Div>
    );
  }
}

export default CaroselContainer;
