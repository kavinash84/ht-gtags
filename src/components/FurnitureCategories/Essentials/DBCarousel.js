import React, { Component } from "react";
import PropTypes from "prop-types";
import BoxHtV1 from "hometown-components-dev/lib/BoxHtV1";
import SlickSlider from "components/SlickSlider";
import DBItem from "./CarouselItem";

const LeftArrow = require("../../../../static/new-home/roundedArrowLeft.svg");
const RightArrow = require("../../../../static/new-home/roundedArrowRight.svg");

import "../Slider.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={RightArrow}
        onClick={onClick}
        style={{ ...style, width: "15px" }}
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
        style={{ ...style,  width: "15px" }}
      />
    </React.Fragment>
  );
}

export default class DBCarousel extends Component {
  render() {
    const { data, settings, component } = this.props;
    return (
      <BoxHtV1>
        <div
          className="carousel-one"
        >
          <SlickSlider
            settings={{
              ...settings(data.length),
              nextArrow: <SampleNextArrow />,
              prevArrow: <SamplePrevArrow />
            }}
            className="furnitureSlider"
          >
            {data.map(slide => (
              <div key={slide}>
                <DBItem data={slide} component={component} />
              </div>
            ))}
          </SlickSlider>
        </div>
      </BoxHtV1>
    );
  }
}

DBCarousel.defaultProps = {
  data: []
};

DBCarousel.propTypes = {
  data: PropTypes.array
};
