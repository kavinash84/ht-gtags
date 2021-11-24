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
  dbAdvantage: modularwardrobe.data.items.text.dbAdvantage
}))
export default class WardrobesForEveryone extends Component {
  render() {
    const { dbAdvantage } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "30px 30px 10px",
          textAlign: "center",
          marginTop: "180px"
        }}
      >
        <Div
          style={{
            fontSize: "40px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "black",
            fontFamily: "hel"
          }}
        >
          {dbAdvantage.title}
        </Div>
        <Div style={{ fontSize: "20px", color: "#888888", marginBottom: "40px" }}>
          {dbAdvantage.subtitle}
        </Div>
        <Div style={{ paddingBottom: "", width: '80%', marginLeft: "10%"}}>
          <DBCarousel
            data={dbAdvantage.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
