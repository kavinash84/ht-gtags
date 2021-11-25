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
  dbServices: modularwardrobe.data.items.text.dbServices
}))
export default class Finishes extends Component {
  render() {
    const { dbServices } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "30px 30px 10px",
          textAlign: "center",
          marginTop: "40px"
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
          {dbServices.title}
        </Div>
        <Div style={{ fontSize: "20px", color: "#888888", marginBottom: "40px" }}>
        Choose from a wide range of shutter finishes that Duracucini has to offer, built apt to suit your usage and lifestyle
        </Div>
        <Div style={{  paddingBottom: "", width: '86%', marginLeft: "6.5%"}}>
          <DBCarousel
            data={dbServices.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
