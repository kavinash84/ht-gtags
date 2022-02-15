import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';

const defaultSettings = {
  infinite: true,
  dots: false,
  speed: 500,
  autoplay: false,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  lazyLoad: true
};

export default class SlickSlider extends Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired,
    passedRef: PropTypes.object
  };
  static defaultProps = {
    passedRef: {}
  };
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }

  render() {
    const { children, settings, ...rest } = this.props;
    const newSettings = { ...defaultSettings, ...settings };
    return (
      <BoxHtV1>
        <Slider ref={this.slider} {...newSettings} {...rest}>
          {children}
        </Slider>
      </BoxHtV1>
    );
  }
}
