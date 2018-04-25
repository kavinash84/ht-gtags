import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';

export default class CategorySlider extends Component {
  render() {
    const { data, categoryName } = this.props;
    return (
      <section>
        <div className="head">
          <div className="container">
            <div className="title">
              <h4>{categoryName}</h4>
            </div>
          </div>
        </div>
        <Carousel
          autoPlayVal={false}
          className="catSlider"
          showThumbsVal={false}
          showStatusVal={false}
          showArrowsVal={false}
          showIndicatorsVal={false}
          infiniteLoopVal={false}
          centerModeVal
          centerSlidePercentageVal={42}
          sliderImages={data}
          contentStatus
          typeOfSlider="catSlider"
        />
      </section>
    );
  }
}

CategorySlider.defaultProps = {
  data: [],
  categoryName: ''
};

CategorySlider.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string
};
