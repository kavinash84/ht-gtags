import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';


export default class MainSlider extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="mgBottom10">
        <Carousel
          autoPlayVal
          className="homeSlider"
          showThumbsVal={false}
          showStatusVal={false}
          showIndicatorsVal
          infiniteLoopVal
          centerModeVal={false}
          centerSlidePercentageVal={100}
          sliderImages={data}
          typeOfSlider="homeSlider"
          contentStatus={false}
        />
      </div>
    );
  }
}

MainSlider.defaultProps = {
  data: []
};

MainSlider.propTypes = {
  data: PropTypes.array
};
