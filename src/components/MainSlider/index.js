import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SliderItem from './SliderItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1
};

export default class MainSlider extends Component {
  render() {
    const { data } = this.props;
    return (
      <SlickSlider settings={settings}>
        {data.map((slide, index) => (
          <div key={String(index)}>
            <SliderItem
              image={slide.url || slide.image}
              url={slide.target_url || slide.url_key}
              title={slide.title || ''}
            />
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
