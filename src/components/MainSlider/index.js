import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { triggerImpression, triggerClick } from 'redux/modules/analytics';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import SliderItem from './SliderItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1
};

class MainSlider extends Component {
  render() {
    const {
 data, triggerSlideChange, triggerSlideClick, reference, newSettings
} = this.props;
    const finalSettings = { ...settings, ...newSettings };
    return (
      <SlickSlider
        settings={finalSettings}
        afterChange={e => triggerSlideChange(e)}
        ref={reference}
        className="mainSlider"
      >
        {data.map((slide, index) => (
          <BoxHtV1 key={String(index)}>
            <SliderItem
              target={slide.target || ''}
              image={slide.image}
              url={slide.url_key}
              title={slide.title || ''}
              onClick={() => triggerSlideClick(index)}
            />
          </BoxHtV1>
        ))}
      </SlickSlider>
    );
  }
}

MainSlider.defaultProps = {
  data: [],
  reference: null,
  newSettings: {}
};

MainSlider.propTypes = {
  data: PropTypes.array,
  triggerSlideChange: PropTypes.func.isRequired,
  triggerSlideClick: PropTypes.func.isRequired,
  reference: PropTypes.object,
  newSettings: PropTypes.object
};

export default connect(null, {
  triggerSlideChange: triggerImpression,
  triggerSlideClick: triggerClick
})(MainSlider);
