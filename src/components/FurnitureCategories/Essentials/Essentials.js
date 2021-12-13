import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const styles = require("../Furniture.scss");

const adjustSlides = length => ({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: false,

    customPaging: i => (
      <div
        style={{
          borderTop: "1px solid #848C7F"
        }}
      />
    )
});

export default class Essentials extends Component {
  render() {
    const { mainTitle , data } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#F9F9F9",
          padding: "30px 30px 10px",
          textAlign: "center",
          marginTop: "40px"
        }}
      >
        <Div
          style={{
            fontSize: "35px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "black"
          }}
        >
          {mainTitle}
          <div
            style={{
              width: '30px',
              borderTop: '2px solid #222222',
              margin: 'auto',
              marginTop: '15px'
            }}
          />
        </Div>

        <Div
          style={{
            paddingBottom: "",
            width: "100%",
            margin: "auto"
          }}
        >
          <DBCarousel
            data={data}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
