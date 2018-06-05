import React from 'react';
import PropTypes from 'prop-types';
import SliderItem from './SliderItem';
import SlickSlider from '../SlickSlider';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const BannersSlider = ({ data }) => (
  <SlickSlider settings={settings}>
    {data.map(slide => <SliderItem key={slide.id} title={slide.title} image={slide.url} url={slide.target_url} />)}
  </SlickSlider>
);

BannersSlider.defaultProps = {
  data: []
};

BannersSlider.propTypes = {
  data: PropTypes.array
};
