import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const styles = require("../ModularWardrobe.scss");

const adjustSlides = length => ({
  slidesToShow: 2.5,
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
  wardrobesEveryone: modularwardrobe.data.items.text.wardrobesEveryone
}))
export default class WardrobesForEveryone extends Component {
  render() {
    const { wardrobesEveryone } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "30px 30px 10px",
          textAlign: "center",
          marginTop: "130px"
        }}
      >
        <Div
          style={{
            fontSize: "40px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "black"
          }}
        >
          {wardrobesEveryone.title}
        </Div>
        <Div style={{ fontSize: "20px", color: "#888888", marginBottom: "40px" }}>
          {wardrobesEveryone.subtitle}
        </Div>
        <Div style={{ paddingBottom: "", width: '86%', marginLeft: "6.5%"}}>
          <DBCarousel
            data={wardrobesEveryone.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
