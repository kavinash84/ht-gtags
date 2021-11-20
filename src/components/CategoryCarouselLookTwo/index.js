import React, { Component } from "react";

import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import SlickSlider from "components/SlickSlider";
import CategoryCarouselItemTwo from "./CategoryCarouselItemTwo";

export default class CategoryCarouselTwo extends Component {
  render() {
    const { getTheLook2 } = this.props;
    return (
      <div>
        <HeadingHtV1
          fontFamily="medium"
          style={{ textAlign: "center", color: "#323131" }}
          fontSize="25px"
          mt="50px"
          mb="20px"
        >
          {getTheLook2.mainTitle}
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
          {getTheLook2.data.map(val => (
            <CategoryCarouselItemTwo src={val.image} title={val.title} />
          ))}
        </div>
      </div>
    );
  }
}
