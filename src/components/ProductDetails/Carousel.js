import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import CarouselItem from './CarouselItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = length => ({
  slidesToShow: length >= 4 ? 4 : length,
  slidesToScroll: 3
});

export default class CategoryCarousel extends Component {
  render() {
    const { data, title } = this.props;
    return (
      <Section display="flex" p="0" pt="0.5rem" mb="0" className="catCarousel">
        <Container pr="0" pl="0">
          <SlickSlider settings={adjustSlides(data.length)}>
            {data.map(slide => (
              <div key={slide.id_catalog_product_image}>
                <CarouselItem image={`${slide.url}.jpg`} name={title} />
              </div>
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
