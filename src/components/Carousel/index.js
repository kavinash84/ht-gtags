import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import Title from 'components/Title';
import SlickSlider from 'components/SlickSlider';
import CarouselItem from 'components/Carousel/CarouselItem';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 3,
  autoplaySpeed: 5000
});

export default class Carousel extends Component {
  render() {
    const { data, title } = this.props;
    return (
      <BoxHtV1>
        {(title !== '' || title !== null) && <Title title={title} />}
        <SlickSlider settings={adjustSlides(data.length)}>
          {data.map(slide => (
            <div key={slide.id}>
              <CarouselItem image={slide.image_url || slide.media_url || ''} url={slide.url_key || ''} />
            </div>
          ))}
        </SlickSlider>
      </BoxHtV1>
    );
  }
}

Carousel.defaultProps = {
  data: [],
  title: ''
};

Carousel.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};
