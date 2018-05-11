import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Carousel from '../Carousel';

export default class MainSlider extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div mb="10px">
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
      </Div>
    );
  }
}

MainSlider.defaultProps = {
  data: []
};

MainSlider.propTypes = {
  data: PropTypes.array
};
