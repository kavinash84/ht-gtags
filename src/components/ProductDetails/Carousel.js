import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import CarouselItem from './CarouselItem';

const showSlides = data => (data && data.length >= 4 ? 4 : data.length || 0);

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
        <Div col="2">
          <Slider
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={showSlides(data)}
            swipeToSlide
            focusOnSelect
            vertical
            verticalSwiping
            className="pdpThumbSlider"
          >
            {data.map(slide => (
              <div className={styles.pdpThumbSliderItem} key={slide.id_catalog_product_image}>
                <ImageShimmer src={`${slide.url}-catalog_360.jpg`} style={{ width: '105px' }} height="105px">
                  {imageURL => <Img alt={title} src={imageURL} width="105px" />}
                </ImageShimmer>
              </div>
            ))}
          </Slider>
        </Div>
        <Div col="10" pl="0.625rem" pr="0" pb="1rem">
          <img className="hide" itemProp="image" src={(data && `${data[0].url}-zoom.jpg`) || ''} alt={title} />
          <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}>
            {data.map(slide => (
              <CarouselItem key={slide.id_catalog_product_image} image={`${slide.url}-zoom.jpg`} name={title} />
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
