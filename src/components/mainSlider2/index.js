import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { triggerImpression, triggerClick } from "redux/modules/analytics";
import BoxHtV1 from "hometown-components-dev/lib/BoxHtV1";
import SliderItem from "./SlideItems";
import SlickSlider from "../SlickSlider";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import "./ShopNewArrivalSlider.css";
import { weBannerImpression } from "../../redux/modules/homepage";

const LeftArrow = require("../../../static/new-home/roundedArrowLeft.svg");
const RightArrow = require("../../../static/new-home/roundedArrowRight.svg");

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={RightArrow}
        onClick={onClick}
        style={{ ...style, marginRight: "150px", width: "15px" }}
      />
    </React.Fragment>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={LeftArrow}
        onClick={onClick}
        style={{ ...style, marginLeft: "150px", width: "15px" }}
      />
    </React.Fragment>
  );
}

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
};

class MainSliderTwo extends Component {
  render() {
    const {
      secondmainbanner,
      triggerSlideChange,
      triggerSlideClick,
      weBannerImpression,
      reference,
      newSettings,
      onImageClick
    } = this.props;
    const finalSettings = { ...settings, ...newSettings };
    return (
      <React.Fragment>
        {/* <HeadingHtV1
          mb="20px"
          mt="70px"
          fontSize="35px"
          style={{
            textAlign: "center",
            color: "#222222",
            fontFamily: "medium"
          }}
        >
          {secondmainbanner.mainTitle}
        </HeadingHtV1> */}
        {/* <div
          style={{
            width: "30px",
            borderTop: "2px solid #222222",
            margin: "auto",
            marginBottom: "10px"
          }}
        /> */}

        <SlickSlider
          settings={finalSettings}
          afterChange={e => triggerSlideChange(e)}
          ref={reference}
          className="ShopBannercarousel_one"
        >
          {secondmainbanner.data.map((slide, index) => (
            <BoxHtV1 key={String(index)}>
              <SliderItem
                target={slide.target || ""}
                image={slide.image}
                url={slide.url_key}
                onClick={() => {
                  weBannerImpression(slide.weData);
                  triggerSlideClick(index);
                }}
                onImageClick={onImageClick}
              />
            </BoxHtV1>
          ))}
        </SlickSlider>
      </React.Fragment>
    );
  }
}

MainSliderTwo.defaultProps = {
  data: [],
  reference: null,
  newSettings: {},
  onImageClick: () => {}
};

MainSliderTwo.propTypes = {
  data: PropTypes.array,
  triggerSlideChange: PropTypes.func.isRequired,
  triggerSlideClick: PropTypes.func.isRequired,
  weBannerImpression: PropTypes.func.isRequired,
  reference: PropTypes.object,
  newSettings: PropTypes.object,
  onImageClick: PropTypes.func
};

export default connect(null, {
  triggerSlideChange: triggerImpression,
  triggerSlideClick: triggerClick,
  weBannerImpression: weBannerImpression
})(MainSliderTwo);
