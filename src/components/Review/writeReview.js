import React, { Component } from "react";
import { connect } from "react-redux";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Img from "hometown-components-dev/lib/ImageHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import PropTypes from "prop-types";
import {
  validateMobile,
  validateEmail,
  isEmpty,
  validateFullname,
  checkSpecialChar
} from "utils/validation";
import CustomSlider from "./slider";
import {
  addCustomerReview,
  loadProductsListForReview
} from "../../redux/modules/reviews";
import FormInput from "./FormInput";

const PlusIcon = require("../../../static/Review/plusIcon.svg");
const StarEmpty = require("../../../static/Review/starEmpty.svg");
const StarFilled = require("../../../static/Review/starFilled.svg");
const ReviewBanner = require("../../../static/Review/writeReviewformImage.png");

const styles = require("./writeReview.scss");

@connect(({ reviews, stores }) => ({
  productsToBeReviewed: reviews.productsToBeReviewed,
  cmsData: reviews.cmsData.items.text,
  productsLoader: reviews.productsLoader,
  stores: stores.data.items.text,
  reviewAdded: reviews.reviewAdded,
  loading: reviews.loading
}))
export default class WriteReview extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    name: "",
    nameError: "",
    nameErrorMsg: "Enter Valid Full Name",
    mobile: "",
    mobileError: "",
    mobileErrorMsg: "Enter Valid 10 Digit Phone Number",
    email: "",
    emailError: "",
    emailErrorMsg: "Please Enter Valid Email ",
    city: "",
    cityError: "",
    cityErrorMsg: "City field is Required",
    offline: "offline",
    offlineError: "",
    offlineErrorMsg: "Offline field is Required",
    store: "",
    storeError: "",
    storeErrorMsg: "Store field is Required",
    product: "",
    productError: "",
    productErrorMsg: "Product field is Required",
    addImg: "",
    addImgError: "",
    addImgErrorMsg: "Image field is Required",
    description: "",
    descriptionError: "",
    descriptionErrorMsg: "Description field is Required",
    ratings: 1,
    getDetailsHit: false
  };

  onChangeRating = e => {
    this.setState({ ratings: e });
  };
  onChangeName = e => {
    if (e.target.value) {
      this.setState({ name: e.target.value, nameError: false });
    } else {
      this.setState({
        nameError: true,
        name: ""
      });
    }
  };
  onChangeMobile = e => {
    if (e.target.value) {
      const checkError = !validateMobile(e.target.value);
      this.setState({
        mobile: e.target.value,
        mobileError: checkError,
        getDetailsHit: !checkError ? true : false,
        product: ""
      });
      document.getElementById("selectprodForReview").value = "";
    } else {
      this.setState({
        mobileError: true,
        mobile: ""
      });
    }
  };
  onChangeEmail = e => {
    if (e.target.value) {
      this.setState({ email: e.target.value, emailError: false });
    } else {
      this.setState({
        emailError: true,
        email: ""
      });
    }
  };
  onChangeCity = e => {
    if (e.target.value) {
      this.setState({ city: e.target.value, cityError: false });
    } else {
      this.setState({
        cityError: true,
        city: ""
      });
    }
  };
  onChangeOffline = e => {
    if (e.target.value) {
      this.setState({ city: e.target.value, cityError: false });
    } else {
      this.setState({
        cityError: true,
        city: ""
      });
    }
  };
  onChangeOffline = e => {
    if (e.target.value) {
      this.setState({ offline: e.target.value, offlineError: false });
    } else {
      this.setState({
        offlineError: true,
        offline: ""
      });
    }
  };
  onChangeStore = e => {
    if (e.target.value) {
      this.setState({ store: e.target.value, storeError: false });
    } else {
      this.setState({
        storeError: true,
        store: ""
      });
    }
  };
  onChangeProduct = e => {
    if (e.target.value) {
      this.setState({ product: e.target.value, productError: false });
    } else {
      this.setState({
        productError: true,
        product: ""
      });
    }
  };
  handleDescription = e => {
    if (e.target.value) {
      this.setState({ description: e.target.value, descriptionError: false });
    } else {
      this.setState({
        descriptionError: true,
        description: ""
      });
    }
  };
  handleFileUpload = e => {
    console.log(e.target.files, "files");
    if (e.target.files.length) {
      this.setState({ addImg: e.target.files, addImgError: false });
    } else {
      this.setState({
        addImgError: true,
        addImg: ""
      });
    }
  };
  handleGetDetails = () => {
    console.log("clicked");
    const { dispatch } = this.context.store;
    dispatch(loadProductsListForReview(this.state.mobile));
    this.setState({ getDetailsHit: false });
  };
  onSubmitForm = e => {
    e.preventDefault();
    const {
      name,
      mobile,
      email,
      description,
      city,
      offline,
      product,
      store,
      addImg
    } = this.state;
    const nameError =
      isEmpty(name) || validateFullname(name) || checkSpecialChar(name);
    const mobileError = !validateMobile(mobile);
    const emailError = !validateEmail(email);
    const descriptionError = isEmpty(description);
    const cityError = isEmpty(city);
    const offlineError = isEmpty(offline);
    const productError = isEmpty(product);
    const storeError =
      this.state.offline === "offline" ? isEmpty(store) : false;
    // const addImgError = addImg === "" ? true : false;

    if (
      nameError ||
      mobileError ||
      emailError ||
      descriptionError ||
      cityError ||
      offlineError ||
      productError ||
      storeError
      //  ||
      // addImgError
    ) {
      console.log("error");
      this.setState({
        nameError,
        mobileError,
        emailError,
        descriptionError,
        cityError,
        offlineError,
        productError,
        storeError
        // addImgError
      });
    } else {
      const { dispatch } = this.context.store;
      console.log("noerror", this.state.addImg[0], this.state.addImg.length);
      let formdata = new FormData();
      formdata.append("name", this.state.name);
      formdata.append("rating", this.state.ratings);
      formdata.append("review", this.state.description);
      formdata.append("email", this.state.email);
      formdata.append("mobile", this.state.mobile);
      formdata.append("city", this.state.city);
      formdata.append("storeType", this.state.offline);
      if (this.state.offline === "offline") {
        formdata.append("storeName", this.state.store);
      }
      const selectedSku = this.state.product;
      const arr = [...this.props.productsToBeReviewed];
      const foundSkuProduct = arr.find(
        item => item.fk_catalog_config === +selectedSku
      );
      if (foundSkuProduct) {
        formdata.append("sku", foundSkuProduct.sku);
      }
      if (this.state.addImg) {
        formdata.append("image", this.state.addImg[0]);
      }

      dispatch(addCustomerReview(this.state.product, formdata));
    }
    console.log("noerror");
  };
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.reviewAdded &&
      nextProps.reviewAdded !== this.props.reviewAdded
    ) {
      this.setState({
        name: "",
        mobile: "",
        email: "",
        description: "",
        city: "",
        offline: "offline",
        product: "",
        store: "",
        addImg: "",
        ratings: 1
      });
      document.getElementById("selectprodForReview").value = "";
      document.getElementById("selectStoreforReview").value = "";
    }
  }
  render() {
    const {
      name,
      mobile,
      email,
      description,
      city,
      offline,
      product,
      store,
      addImg,
      nameError,
      nameErrorMsg,
      mobileError,
      mobileErrorMsg,
      emailError,
      emailErrorMsg,
      descriptionError,
      descriptionErrorMsg,
      cityError,
      cityErrorMsg,
      offlineError,
      offlineErrorMsg,
      productError,
      productErrorMsg,
      storeError,
      storeErrorMsg,
      addImgError,
      addImgErrorMsg,
      ratings,
      getDetailsHit
    } = this.state;
    const {
      loading,
      stores,
      productsLoader,
      productsToBeReviewed
    } = this.props;
    console.log(stores, "stores");
    return (
      <Section p="0" mb="0" style={{ padding: "0% 7%" }}>
        <Div className={styles.writeReviewContainer}>
          <Div style={{ width: "50%", height: "100%" }}>
            <Img
              src={this.props.cmsData.desktop.write}
              alt="Banner"
              style={{ height: "100%" }}
            />
          </Div>
          <Div
            style={{
              background: "#f5eeee",
              padding: "15px 15px 0px",
              width: "50%",
              padding: "0% 10%"
            }}
          >
            <Div className={styles.writeTitle}>
              <Div className={styles.title}>Write Your Review</Div>
              <Div className={styles.titleBottom} />
            </Div>
            <Div className={styles.writeFormContainer}>
              <form onSubmit={this.onSubmitForm}>
                <Row m="0">
                  <Div col="24" style={{ width: "100%" }}>
                    <FormInput
                      label=""
                      type="text"
                      placeholder="Name*"
                      onChange={this.onChangeName}
                      value={name}
                      feedBackError={nameError}
                      feedBackMessage={nameErrorMsg}
                    />
                  </Div>
                  <Div
                    col="24"
                    className={styles.mobileInputContainer}
                    style={{ width: "100%" }}
                  >
                    <FormInput
                      label=""
                      type="text"
                      placeholder="Mobile No.*"
                      style={{ width: "100%" }}
                      onChange={this.onChangeMobile}
                      value={mobile}
                      feedBackError={
                        mobileError
                          ? mobileError
                          : getDetailsHit
                          ? getDetailsHit
                          : false
                      }
                      feedBackMessage={
                        mobileError
                          ? mobileErrorMsg
                          : getDetailsHit
                          ? "Please click on get details to get all your product details"
                          : mobileErrorMsg
                      }
                    />
                    <div
                      className={styles.getDetailsBtn}
                      style={{
                        height: mobileError ? "54%" : "54%"
                      }}
                      onClick={() => {
                        if (!productsLoader) {
                          const mobileValError = !validateMobile(mobile);
                          if (!(mobileValError || loading)) {
                            this.handleGetDetails();
                          } else {
                            this.setState({ mobileError: true });
                          }
                        }
                      }}
                    >
                      {productsLoader ? "Loading...!" : "Get my order details"}
                    </div>
                  </Div>
                </Row>
                <Row m="0">
                  <Div col="12" style={{ width: "100%" }}>
                    <FormInput
                      label=""
                      type="email"
                      placeholder="Email ID"
                      onChange={this.onChangeEmail}
                      value={email}
                      feedBackError={emailError}
                      feedBackMessage={emailErrorMsg}
                    />
                  </Div>
                </Row>
                <Row m="0" style={{}}>
                  <Div col="6" m="0px" style={{ marginBottom: "" }}>
                    <FormInput
                      label=""
                      type="text"
                      placeholder="City"
                      onChange={this.onChangeCity}
                      value={city}
                      feedBackError={cityError}
                      feedBackMessage={cityErrorMsg}
                    />
                  </Div>
                  <Div
                    col="6"
                    mb="0px"
                    style={{
                      width: "42%",
                      marginLeft: "3%"
                      // marginTop: "10px"
                    }}
                  >
                    <div className="select-wrapper">
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          height: "50px",
                          borderColor: "#E3E3E3",
                          padding: "0px 8px",
                          fontSize: "14px",
                          color: "#7E7575",
                          marginBottom: "10px",
                          outline: "none",
                          backgroundColor: "white"
                        }}
                      >
                        <select
                          onChange={this.onChangeOffline}
                          placeholder="Offline"
                          style={{
                            width: "100%",
                            height: "50px",
                            border: "none",
                            fontSize: "14px",
                            color: "#7E7575",
                            outline: "none",
                            backgroundColor: "white"
                          }}
                          value={this.state.offline}
                        >
                          <option value="offline" selected>
                            Offline
                          </option>
                          <option value="online">Online</option>
                        </select>
                      </div>
                    </div>
                    {/* {offlineError ? ( */}
                    <Text
                      color={offlineError ? "#dc3545" : "transparent"}
                      fontSize="11px"
                      mt="0px"
                    >
                      {offlineErrorMsg}
                    </Text>
                    {/* ) : null} */}
                  </Div>
                </Row>
                <Row m="0">
                  <Div col="12" style={{ width: "100%" }}>
                    <div className="select-wrapper">
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          height: "50px",
                          borderColor: "#E3E3E3",
                          padding: "0px 8px",
                          fontSize: "14px",
                          color: "#7E7575",
                          // marginBottom: "10px",
                          outline: "none",
                          backgroundColor: "white"
                        }}
                      >
                        <select
                          onChange={this.onChangeStore}
                          placeholder="Select Store"
                          style={{
                            width: "100%",
                            height: "50px",
                            border: "none",
                            fontSize: "14px",
                            color: "#7E7575",
                            // marginBottom: "10px",
                            outline: "none",
                            backgroundColor: "white"
                          }}
                          id="selectStoreforReview"
                          disabled={
                            this.state.offline === "online" ? true : false
                          }
                        >
                          <option value="" disabled selected>
                            Select Store
                          </option>
                          {stores.map(val => (
                            <option key={val.id} value={val.store}>
                              {val.store}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* {storeError ? ( */}
                    <Text
                      color={
                        storeError && this.state.offline === "offline"
                          ? "#dc3545"
                          : "transparent"
                      }
                      fontSize="11px"
                      mt="0px"
                      mb="4px"
                    >
                      {storeErrorMsg}
                    </Text>
                    {/* ) : null} */}
                  </Div>
                  <Div col="12" style={{ width: "100%" }}>
                    <div className="select-wrapper">
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "5px",
                          height: "50px",
                          borderColor: "#E3E3E3",
                          padding: "0px 8px",
                          fontSize: "14px",
                          color: "#7E7575",
                          // marginBottom: "10px",
                          outline: "none",
                          backgroundColor: "white"
                        }}
                      >
                        <select
                          onChange={this.onChangeProduct}
                          placeholder="Select Product"
                          id="selectprodForReview"
                          style={{
                            width: "100%",
                            height: "50px",
                            border: "none",
                            fontSize: "14px",
                            color: "#7E7575",
                            // marginBottom: "10px",
                            outline: "none",
                            backgroundColor: "white"
                          }}
                        >
                          <option value="" disabled selected>
                            Select Product
                          </option>
                          {productsToBeReviewed.map(val => (
                            <option
                              key={val.fk_catalog_config}
                              value={val.fk_catalog_config}
                            >
                              {val.product_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* {productError ? ( */}
                    <Text
                      color={productError ? "#dc3545" : "transparent"}
                      fontSize="11px"
                      mt="4px"
                    >
                      {productErrorMsg}
                    </Text>
                    {/* ) : null} */}
                  </Div>
                  <Div col="12" style={{ position: "relative", width: "100%" }}>
                    <div
                      onClick={() => {
                        document
                          .getElementById("imagesUploadForReview")
                          .click();
                      }}
                    >
                      <FormInput
                        label=""
                        type="text"
                        placeholder="Add Image"
                        disabled={true}
                        value={addImg ? "Image Added" : ""}
                        feedBackError={addImgError}
                        feedBackMessage={addImgErrorMsg}
                      />
                      <Img
                        src={PlusIcon}
                        alt="ADD"
                        style={{
                          width: "20px",
                          height: "20px",
                          padding: "3px",
                          border: "1px solid #999999",
                          borderRadius: "4px",
                          position: "absolute",
                          top: "23%",
                          right: "4%"
                        }}
                      />
                    </div>
                    <input
                      type="file"
                      id="imagesUploadForReview"
                      onChange={this.handleFileUpload}
                      multiple="multiple"
                      accept="image/png, image/gif, image/jpeg"
                      style={{
                        position: "absolute",
                        top: "2%",
                        right: "2%",
                        zIndex: -1
                      }}
                    />
                  </Div>
                  <Div col="12" style={{ width: "100%" }}>
                    <textarea
                      placeholder="Write a review here…."
                      name="review"
                      value={description}
                      onChange={this.handleDescription}
                      rows="4"
                      style={{
                        borderColor: "rgb(227, 227, 227)",
                        background: "white",
                        borderRadius: "5px",
                        padding: "10px",
                        width: "100%",
                        fontFamily: "regular"
                      }}
                    />
                    {/* {descriptionError ? ( */}
                    <Text
                      color={descriptionError ? "#dc3545" : "transparent"}
                      fontSize="11px"
                      mt="0px"
                    >
                      {descriptionErrorMsg}
                    </Text>
                    {/* ) : null} */}
                  </Div>
                  <Div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      marginTop: "15px"
                    }}
                  >
                    <Div
                      style={{
                        display: "flex",
                        width: "70%",
                        justifyContent: "center"
                      }}
                    >
                      <Img
                        src={1 <= ratings ? StarFilled : StarEmpty}
                        width="20px"
                        height="20px"
                        style={{ marginLeft: "5px" }}
                        onClick={() => this.onChangeRating(1)}
                      />
                      <Img
                        src={2 <= ratings ? StarFilled : StarEmpty}
                        width="20px"
                        height="20px"
                        style={{ marginLeft: "5px" }}
                        onClick={() => this.onChangeRating(2)}
                      />
                      <Img
                        src={3 <= ratings ? StarFilled : StarEmpty}
                        width="20px"
                        height="20px"
                        style={{ marginLeft: "5px" }}
                        onClick={() => this.onChangeRating(3)}
                      />
                      <Img
                        src={4 <= ratings ? StarFilled : StarEmpty}
                        width="20px"
                        height="20px"
                        style={{ marginLeft: "5px" }}
                        onClick={() => this.onChangeRating(4)}
                      />
                      <Img
                        src={5 <= ratings ? StarFilled : StarEmpty}
                        width="20px"
                        height="20px"
                        style={{ marginLeft: "5px" }}
                        onClick={() => this.onChangeRating(5)}
                      />
                    </Div>
                  </Div>
                  <CustomSlider
                    ratings={ratings}
                    handleChange={this.onChangeRating}
                  />
                  <Div
                    col="12"
                    pr="0rem"
                    pl="0rem"
                    className={styles.bottomFixedSubmit}
                  >
                    <Button
                      style={{
                        color: "#F47020",
                        border: "1px solid #f47020",
                        background: "#FFFFFF",
                        borderRadius: "5px",
                        fontSize: "14px",
                        width: "100%",
                        fontWeight: 600,
                        margin: "10px"
                      }}
                      fontFamily="regular"
                      height="50px"
                      m="0"
                      pl="5%"
                      pr="5%"
                      onClick={this.onSubmitForm}
                      disabled={loading}
                    >
                      {loading ? "Submiting Review..." : "Submit Review"}
                    </Button>
                  </Div>
                </Row>
              </form>
            </Div>
          </Div>
        </Div>
      </Section>
    );
  }
}
