import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
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
    const styles = require('./Carousel.scss');

    return (
      <Row display="block" mt="0" mb="0" mr="0" ml="0">
        <Div col="1">
          <Slider
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={6}
            swipeToSlide
            focusOnSelect
            vertical
            verticalSwiping
            className="pdpThumbSlider"
          >
            {data.map((slide, index) => (
              <div className={styles.pdpThumbSliderItem} key={slide.id_catalog_product_image}>
                <img src={`${slide.url}.jpg`} alt={title} />
              </div>
            ))}
          </Slider>
        </Div>
        <Div col="11" pl="0.625rem" pr="0" pb="1rem">
          <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}>
            {data.map(slide => (
              <CarouselItem key={slide.id_catalog_product_image} image={`${slide.url}.jpg`} name={title} />
            ))}
          </Slider>
        </Div>
      </Row>
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
