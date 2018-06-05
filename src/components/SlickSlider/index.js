import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const defaultSettings = {
  infinite: true,
  speed: 500
};

export default class SlickSlider extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired
  };
  render() {
    const { children, settings } = this.props;
    const newSettings = { ...defaultSettings, ...settings };
    return <Slider {...newSettings}>{children}</Slider>;
  }
}
