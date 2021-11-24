import React, { Component } from "react";
import PropTypes from "prop-types";
import BoxHtV1 from "hometown-components-dev/lib/BoxHtV1";
import SlickSlider from "components/SlickSlider";
import DBItem from "./couraselItem";

import '../Slider.css';

export default class DBCarousel extends Component {
  render() {
    const { data, settings, component } = this.props;
    return (
      <BoxHtV1>
        <div className="carousel-one">
        <SlickSlider
          settings={settings(data.length)}
          className="homeCarouselSlider"
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
