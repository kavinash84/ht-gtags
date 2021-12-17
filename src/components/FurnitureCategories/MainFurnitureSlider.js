import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { triggerImpression, triggerClick } from "redux/modules/analytics";
import BoxHtV1 from "hometown-components-dev/lib/BoxHtV1";
import MainSliderItem from "./MainSliderItem";
import SlickSlider from "../SlickSlider";

import "./Slider.css";

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

class MainFurnitureSlider extends Component {
  render() {
    const {
      data,
      triggerSlideChange,
      triggerSlideClick,
      reference,
      newSettings,
      onImageClick
    } = this.props;
    const finalSettings = { ...settings, ...newSettings };
    return (
      <React.Fragment>
        <SlickSlider
          settings={finalSettings}
          afterChange={e => triggerSlideChange(e)}
          ref={reference}
          className="maincarousel_one"
        >
          {data.map((slide, index) => (
            <BoxHtV1 key={String(index)}>
              <MainSliderItem
                target={slide.target || ""}
                image={slide.image}
                url={slide.url_key}
                title={slide.title || ""}
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

MainFurnitureSlider.defaultProps = {
  data: [],
  reference: null,
  newSettings: {},
  onImageClick: () => {}
};

MainFurnitureSlider.propTypes = {
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
})(MainFurnitureSlider);