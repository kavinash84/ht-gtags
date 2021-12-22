import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const styles = require("../HomewareCat.scss");

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

export default class RecommendForYou extends Component {
  render() {
    const { title, data } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "30px 30px 10px",
          textAlign: "center",
          marginTop: "80px"
        }}
      >
        <Div
          style={{
            width: "80%",
            textAlign: "left",
            fontSize: "40px",
            fontWeight: "600",
            marginBottom: "20px",
            marginLeft: "10%",
            color: "black"
          }}
        >
          {title}
        </Div>
        <Div
          style={{
            paddingBottom: "",
            width: "86%",
            marginLeft: "6.5%",
            marginTop: "30px"
          }}
        >
          <DBCarousel data={data} settings={adjustSlides} component={3} />
        </Div>
      </Div>
    );
  }
}
