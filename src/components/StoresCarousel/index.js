import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StoresCarouselItem from './StoresCarouselItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 7,
  slidesToScroll: 7,
  autoplay: false
};

export default class StoresCarousel extends Component {
  render() {
    const { cities } = this.props;
    return (
      <SlickSlider settings={settings}>
        {cities.map((city, index) => (
          <div key={String(index)}>
            <StoresCarouselItem city={city} />
          </div>
        ))}
      </SlickSlider>
    );
  }
}

StoresCarousel.defaultProps = {
  cities: []
};

StoresCarousel.propTypes = {
  cities: PropTypes.array
};
