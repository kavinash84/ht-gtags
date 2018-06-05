import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SliderItem from './SliderItem';
// import { Link } from 'react-router-dom';
import SlickSlider from '../SlickSlider';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default class MainSlider extends Component {
  render() {
    const { data } = this.props;
    return (
      <SlickSlider settings={settings}>
        {data.map(slide => (
          <div key={slide.id}>
            <SliderItem image={slide.url} url={slide.target_url} title={slide.title} />
          </div>
        ))}
      </SlickSlider>
    );
  }
}

MainSlider.defaultProps = {
  data: []
};

MainSlider.propTypes = {
  data: PropTypes.array
};
