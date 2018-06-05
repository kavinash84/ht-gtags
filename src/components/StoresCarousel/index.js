import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StoresCarouselItem from './StoresCarouselItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 7,
  slidesToScroll: 7
};

export default class StoresCarousel extends Component {
  render() {
    const { data } = this.props;
    return (
      <SlickSlider settings={settings}>
        {data.map((item, index) => (
          <div key={String(index)}>
            <StoresCarouselItem city={item.city} />
          </div>
        ))}
      </SlickSlider>
    );
  }
}

StoresCarousel.defaultProps = {
  data: []
};

StoresCarousel.propTypes = {
  data: PropTypes.array
};
