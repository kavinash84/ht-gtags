import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setCity, gaVisitEvent } from "redux/modules/stores";
// import { hyphenedString } from "utils/helper";
// import StoreListItem from "./StoreListItem";
// import SlickSlider from "../SlickSlider";

import "./slickArrow.css";

const styles = require("./StoresCarousel.scss");

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false
};

const mapStateToProps = ({ stores }) => ({
  stores: stores.data.items.text
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSelectedCity: setCity, gaVisitEvent }, dispatch);

const StoresCarouselItem = ({
  city,
  stores,
  gaVisitEvent: recordStoreVisit
}) => (
  <div className={`storeCarouselItem ${styles.storeSliderItem}`}>{city}</div>
);

StoresCarouselItem.defaultProps = {
  stores: []
};
StoresCarouselItem.propTypes = {
  city: PropTypes.string.isRequired,
  stores: PropTypes.array,
  gaVisitEvent: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(StoresCarouselItem);
