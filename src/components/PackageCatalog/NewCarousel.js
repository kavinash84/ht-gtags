import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";

import Box from "hometown-components-dev/lib/BoxHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import ImageShimmer from "hometown-components-dev/lib/ImageShimmerHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";

const showSlides = data => (data && data.length >= 5 ? 5 : data.length || 0);

export default class NewSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

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
      <div>
        <Slider
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
        >
          <div>
            {data.map(slide => (
              <Image
                key={slide.id_catalog_product_image}
                image={`${slide.url}.jpg`}
                name={title}
              />
            ))}
          </div>
        </Slider>

        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={showSlides(data)}
          swipeToSlide={true}
          className="pdpThumbSlider2"
          centerPadding="30px"
          variableWidth={true}
          focusOnSelect
        >
          <div>
            {data.map(slide => (
              <Box
                className={styles.pdpThumbSliderItem}
                key={slide.id_catalog_product_image}
              >
                <ImageShimmer
                  src={`${slide.url}-top_sel_100.jpg`}
                  width="100px"
                  height="100px"
                >
                  {imageURL => <Image alt={title} src={imageURL} />}
                </ImageShimmer>
              </Box>
            ))}
          </div>
        </Slider>
      </div>
    );
  }
}

NewSlider.defaultProps = {
  data: [],
  title: ""
};

NewSlider.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};
