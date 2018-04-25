import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Carousel from '../Carousel';

@connect(({ banners }) => ({
  ...banners
}))

export default class HomePageBanners extends Component {
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

HomePageBanners.defaultProps = {
  data: []
};

HomePageBanners.propTypes = {
  data: PropTypes.array
};
