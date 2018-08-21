import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section from 'hometown-components/lib/Section';
import CarouselItem from './CarouselItem';
import SlickSlider from '../SlickSlider';

const adjustSlides = (length, data) => ({
  customPaging(i) {
    return (
      <a href={`#${i}`}>
        <img src={`${data[0].url}.jpg`} alt="" />
      </a>
    );
  },
  slidesToShow: length >= 1 ? 1 : length,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  dots: true,
  dotsClass: 'slick-dots slick-thumb'
});

export default class CategoryCarousel extends Component {
  render() {
    const { data, title } = this.props;
    return (
      <Section display="flex" p="0" pt="0" mb="0" className="prodDetailsCarousel">
        <SlickSlider settings={adjustSlides(data.length, data)}>
          {data.map(slide => (
            <CarouselItem key={slide.id_catalog_product_image} image={`${slide.url}.jpg`} name={title} />
          ))}
        </SlickSlider>
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
