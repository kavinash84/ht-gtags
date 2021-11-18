import React, { Component } from "react";
// import PropTypes from "prop-types";
// import BoxHtV1 from 'hometown-components/lib/Div';
// import Title from 'components/Title';
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import SlickSlider from "components/SlickSlider";
import CategoryCarouselItemTwo from "./CategoryCarouselItemTwo";

const GetTheLook04 = require("../../../static/new-home/getthelook04.png");
const GetTheLook05 = require("../../../static/new-home/getthelook05.png");
const GetTheLook06 = require("../../../static/new-home/getthelook06.png");

export default class CategoryCarouselTwo extends Component {
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
          <CategoryCarouselItemTwo
            src={GetTheLook04}
            title="Tiago Engieered Wood King bed without storage in Wenge Colour"
          />
          <CategoryCarouselItemTwo
            src={GetTheLook05}
            title="Tiago Engieered Wood Night Stand in Wenge Colour"
          />
          <CategoryCarouselItemTwo
            src={GetTheLook06}
            title="Tiago Engieered Wood Dresser with mirror in Wenge Colour"
          />
        </div>
      </div>
    );
  }
}
