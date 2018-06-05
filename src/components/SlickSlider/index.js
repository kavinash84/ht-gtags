import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Div from 'hometown-components/lib/Div';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const defaultSettings = {
  infinite: true,
  dots: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  lazyLoad: true
};

export default class SlickSlider extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired
  };
  render() {
    const { children, settings } = this.props;
    const newSettings = { ...defaultSettings, ...settings };
    return (
      <Div mb="0.625rem">
        <Slider {...newSettings}>{children}</Slider>
      </Div>
    );
  }
}
