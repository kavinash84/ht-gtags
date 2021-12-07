import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const styles = require("../ModularWardrobe.scss");

const adjustSlides = length => ({
  slidesToShow: 3,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    />
  )
});

@connect(({ modularwardrobe }) => ({
  modularwardrobe,
  typeswardrobes: modularwardrobe.data.items.text.typeswardrobes
}))
export default class TypesWardrobes extends Component {
  render() {
    const { typeswardrobes } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "30px 30px 10px",
          textAlign: "center",
          marginTop: "10px"
        }}
      >
        <Div
          style={{
            fontSize: "30px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "black"
          }}
        >
          {typeswardrobes.title}
        </Div>
        <Div style={{ fontSize: "20px", color: "#888888", marginBottom: "40px" }}>
        {typeswardrobes.subtitle}
        </Div>
        <Div style={{  paddingBottom: "", width: '86%', marginLeft: "6.5%"}}>
          <DBCarousel
            data={typeswardrobes.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
