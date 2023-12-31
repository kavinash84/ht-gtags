import React, { Component } from "react";

import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import SlickSlider from "components/SlickSlider";
import CategoryCarouselItem from "./CategoryCarouselItem";

export default class CategoryCarousel extends Component {
  render() {
    const { getTheLook } = this.props;
    return (
      <div>
        <HeadingHtV1
          fontFamily="medium"
          style={{ textAlign: "center", color: "#323131" }}
          fontSize="30px"
          mt="60px"
          mb="50px"
        >
          {getTheLook.mainTitle}
        </HeadingHtV1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            margin: "0 5%"
          }}
        >
          {getTheLook.data.map(val => (
            <CategoryCarouselItem
              src={val.image}
              title={val.title}
              url={val.url_key}
            />
          ))}
        </div>
      </div>
    );
  }
}
