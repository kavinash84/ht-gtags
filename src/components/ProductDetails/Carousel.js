import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import CarouselItem from './CarouselItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 3 ? 3 : length,
  slidesToScroll: 3,
  autoplay: false,
  infinite: false
});

export default class CategoryCarousel extends Component {
  render() {
    const { data, title } = this.props;
    return (
      <Section display="flex" p="0" pt="0" mb="0" className="prodDetailsCarousel">
        <Container pr="0" pl="0">
          <SlickSlider settings={adjustSlides(data.length)}>
            {data.map(slide => (
              <CarouselItem key={slide.id_catalog_product_image} image={`${slide.url}.jpg`} name={title} />
            ))}
          </SlickSlider>
        </Container>
      </Section>
    );
  }
}

CategoryCarousel.defaultProps = {
  data: [],
  title: ''
};

CategoryCarousel.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};
