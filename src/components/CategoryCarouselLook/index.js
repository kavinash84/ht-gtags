import React, { Component } from "react";
// import PropTypes from "prop-types";
// import BoxHtV1 from 'hometown-components/lib/Div';
// import Title from 'components/Title';
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import SlickSlider from "components/SlickSlider";
import CategoryCarouselItem from "components/CategoryCarouselLook/CategoryCarouselItem";

export default class CategoryCarousel extends Component {
  render() {
    return (
      <div>
        <HeadingHtV1
          fontFamily="medium"
          style={{ textAlign: "center", color: "#323131" }}
          fontSize="25px"
          mt="50px"
          mb="20px"
        >
          Get The Look
        </HeadingHtV1>

        <div>
          <CategoryCarouselItem />
        </div>
      </div>
    );
  }
}
