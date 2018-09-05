import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { triggerImpression, triggerClick } from 'redux/modules/analytics';
import SliderItem from './SliderItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1
};

class MainSlider extends Component {
  render() {
    const { data, triggerSlideChange, triggerSlideClick } = this.props;
    return (
      <SlickSlider settings={settings} afterChange={e => triggerSlideChange(e)}>
        {data.map((slide, index) => (
          <div key={String(index)}>
            <SliderItem
              image={slide.image}
              url={slide.url_key}
              title={slide.title || ''}
              onClick={() => triggerSlideClick(index)}
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
  data: PropTypes.array,
  triggerSlideChange: PropTypes.func.isRequired,
  triggerSlideClick: PropTypes.func.isRequired
};

export default connect(null, { triggerSlideChange: triggerImpression, triggerSlideClick: triggerClick })(MainSlider);
