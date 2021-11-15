import React, { Component } from "react";
// import PropTypes from "prop-types";
// import BoxHtV1 from 'hometown-components/lib/Div';
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import Title from 'components/Title';
// import SlickSlider from 'components/SlickSlider';
import CategoryCarouselItem from "components/CategoryCarouselHome/CategoryCarouselItem";

import "./CategoryCarousel.css";

export default class CategoryCarousel extends Component {
  render() {
    // const { categoryName, data } = this.props;
    return (
      <div
        style={{
          backgroundImage: "linear-gradient(to right, #EAEAEA , white)",
          display: "block",
          height: "700px"
        }}
      >
        <HeadingHtV1
          fontFamily="medium"
          style={{ textAlign: "center", color: "#323131" }}
          fontSize="30px"
          mt="40px"
          mb="10px"
          pt="30px"
        >
          Shop By Rooms
        </HeadingHtV1>

        <div
          style={{
            width: "30px",
            borderTop: "2px solid #222222",
            margin: "auto",
            marginBottom: "20px"
          }}
        />

        <CategoryCarouselItem />
      </div>
    );
  }
}
