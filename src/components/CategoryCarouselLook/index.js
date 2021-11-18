import React, { Component } from "react";
// import PropTypes from "prop-types";
// import BoxHtV1 from 'hometown-components/lib/Div';
// import Title from 'components/Title';
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import SlickSlider from "components/SlickSlider";
import CategoryCarouselItem from "./CategoryCarouselItem";

const GetTheLook01 = require("../../../static/new-home/getthelook01.png");
const GetTheLook02 = require("../../../static/new-home/getthelook02.png");
const GetTheLook03 = require("../../../static/new-home/getthelook03.png");

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

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <CategoryCarouselItem
            src={GetTheLook01}
            title="Tiago Engieered Wood King bed without storage in Wenge Colour"
          />
          <CategoryCarouselItem
            src={GetTheLook02}
            title="Tiago Engieered Wood Night Stand in Wenge Colour"
          />
          <CategoryCarouselItem
            src={GetTheLook03}
            title="Tiago Engieered Wood Dresser with mirror in Wenge Colour"
          />
        </div>
      </div>
    );
  }
}
