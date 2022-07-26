import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import ImageShimmer from "hometown-components-dev/lib/ImageShimmerHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";

/**
 * Page Components
 */
import CarouselItem from "./CarouselItem";

const showSlides = data => (data && data.length >= 5 ? 5 : data.length || 0);

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
    const styles = require("./Carousel.scss");

    return (
      <Row>
        <Col width="100%" height="100%">
          <img
            className="hide"
            itemProp="image"
            src={(data && `${data[0].url}.jpg`) || ""}
            alt={title}
          />
          <Slider
            asNavFor={this.state.nav2}
            ref={slider => (this.slider1 = slider)}
            beforeChange={(currentSlide, nextSlide) => {
              console.log("before in slider1", currentSlide, nextSlide);
            }}
            afterChange={currentSlide => {
              console.log("after in slider1", currentSlide);
            }}
          >
            {data.map((slide, i) => (
              <CarouselItem
                key={slide.id_catalog_product_image}
                image={`${slide.url}.jpg`}
                name={title}
                id={i}
              />
            ))}
          </Slider>
          <Slider
            asNavFor={this.state.nav1}
            ref={slider => (this.slider2 = slider)}
            slidesToShow={showSlides(data)}
            swipeToSlide
            focusOnSelect
            className="pdpThumbSlider"
            centerPadding="30px"
            variableWidth={true}
            beforeChange={(currentSlide, nextSlide) => {
              console.log("before in slider2", currentSlide, nextSlide);
            }}
            afterChange={currentSlide => {
              console.log("after in slider2", currentSlide);
            }}
          >
            {data.map(slide => (
              <Box
                className={styles.pdpThumbSliderItem}
                key={slide.id_catalog_product_image}
              >
                <ImageShimmer
                  src={`${slide.url}.jpg?mode=fill&h=100`}
                  width="100px"
                  height="100px"
                >
                  {imageURL => <Image alt={title} data-src={imageURL} />}
                </ImageShimmer>
              </Box>
            ))}
          </Slider>
        </Col>
      </Row>
    );
  }
}

ProductDetailSlider.defaultProps = {
  data: [],
  title: ""
};

ProductDetailSlider.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};
