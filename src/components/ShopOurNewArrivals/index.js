import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { triggerImpression, triggerClick } from "redux/modules/analytics";
import BoxHtV1 from "hometown-components-dev/lib/BoxHtV1";
import SliderItem from "./SlideItems";
import SlickSlider from "../SlickSlider";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import "./ShopNewArrivalSlider.css";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  autoplay: false,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
};

class ShopOurNewArrivals extends Component {
  render() {
    const {
      shopOurNewArrivalFurniture,
      triggerSlideChange,
      triggerSlideClick,
      reference,
      newSettings,
      onImageClick
    } = this.props;
    const finalSettings = { ...settings, ...newSettings };
    return (
      <React.Fragment>
        <HeadingHtV1
          mb="20px"
          mt="70px"
          fontSize="30px"
          style={{
            textAlign: "center",
            color: "#222222",
            fontFamily: "medium"
          }}
        >
          {shopOurNewArrivalFurniture.mainTitle}
        </HeadingHtV1>
        <div
          style={{
            width: "30px",
            borderTop: "2px solid #222222",
            margin: "auto",
            marginBottom: "10px"
          }}
        />
        <SlickSlider
          settings={finalSettings}
          afterChange={e => triggerSlideChange(e)}
          ref={reference}
          className="ShopBannercarousel_one"
        >
          {shopOurNewArrivalFurniture.data.map((slide, index) => (
            <BoxHtV1 key={String(index)}>
              <SliderItem
                target={slide.target || ""}
                image={slide.image}
                url={slide.url_key}
                onClick={() => triggerSlideClick(index)}
                onImageClick={onImageClick}
              />
            </BoxHtV1>
          ))}
        </SlickSlider>
      </React.Fragment>
    );
  }
}

ShopOurNewArrivals.defaultProps = {
  data: [],
  reference: null,
  newSettings: {},
  onImageClick: () => {}
};

ShopOurNewArrivals.propTypes = {
  data: PropTypes.array,
  triggerSlideChange: PropTypes.func.isRequired,
  triggerSlideClick: PropTypes.func.isRequired,
  reference: PropTypes.object,
  newSettings: PropTypes.object,
  onImageClick: PropTypes.func
};

export default connect(null, {
  triggerSlideChange: triggerImpression,
  triggerSlideClick: triggerClick
})(ShopOurNewArrivals);
