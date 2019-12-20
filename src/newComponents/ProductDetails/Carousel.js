import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';
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
      <RowHtV1 display="block" m={0}>
        <BoxHtV1 col="2">
          <Slider
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={showSlides(data)}
            swipeToSlide
            focusOnSelect
            vertical
            verticalSwiping
            // className="pdpThumbSlider"
          >
            {data.map(slide => (
              <BoxHtV1 className={styles.pdpThumbSliderItem} key={slide.id_catalog_product_image}>
                <ImageShimmerHtV1 src={`${slide.url}-top_sel_100.jpg`} width="105px" height="105px">
                  {imageURL => <ImageHtV1 alt={title} src={imageURL} width="105px" />}
                </ImageShimmerHtV1>
              </BoxHtV1>
            ))}
          </Slider>
        </BoxHtV1>
        <BoxHtV1 col="10" padding="0 0 1rem 0.625rem">
          <ImageHtV1 className="hide" itemProp="image" src={(data && `${data[0].url}-zoom.jpg`) || ''} alt={title} />
          <Slider asNavFor={this.state.nav2} ref={slider => (this.slider1 = slider)}>
            {data.map(slide => (
              <CarouselItem key={slide.id_catalog_product_image} image={`${slide.url}.jpg`} name={title} />
            ))}
          </Slider>
        </BoxHtV1>
      </RowHtV1>
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
