import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import CarouselItem from './CarouselItem';

/* eslint-disable */
export default class ProductDetailSlider extends Component {
  state = {
    nav1: null,
    nav2: null
  };

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {
    const { data, title } = this.props;
    return (
      <div>
        <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}>
          {data.map(slide => (
            <CarouselItem key={slide.id_catalog_product_image} image={`${slide.url}.jpg`} name={title} />
          ))}
        </Slider>
        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={6}
          swipeToSlide
          focusOnSelect
          vertical
          verticalSwiping
        >
          {data.map(slide => (
            <div>
              <img key={slide.id_catalog_product_image} src={`${slide.url}.jpg`} alt={title} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

ProductDetailSlider.defaultProps = {
  data: [],
  title: ''
};

ProductDetailSlider.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};
