import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { triggerImpression, triggerClick } from "redux/modules/analytics";
import BoxHtV1 from "hometown-components-dev/lib/BoxHtV1";
import SliderItem from "./SliderItem";
import SlickSlider from "../SlickSlider";

import "./MainSlider.css";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
};

class MainSlider extends Component {
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
      <React.Fragment className="Maincarousel-one">
        <SlickSlider
          settings={finalSettings}
          afterChange={e => triggerSlideChange(e)}
          ref={reference}
          className="mainSlider"
        >
          {data.map((slide, index) => (
            <BoxHtV1 key={String(index)}>
              <SliderItem
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

MainSlider.defaultProps = {
  data: [],
  reference: null,
  newSettings: {},
  onImageClick: () => {}
};

MainSlider.propTypes = {
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
})(MainSlider);
