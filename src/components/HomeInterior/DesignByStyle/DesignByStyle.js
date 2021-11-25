import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const styles = require("../HomeInterior.scss");

const adjustSlides = length => ({
  slidesToShow: 2,
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

@connect(({ homeinterior }) => ({
  homeinterior,
  designStyle: homeinterior.data.items.text.designStyle
}))
export default class DesignByStyle extends Component {
  render() {
    const { designStyle } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#F3F5F7",
          padding: "30px 30px 20px",
          textAlign: "center",
          marginTop: "40px"
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
          {designStyle.title}
          <div
            style={{
              width: '30px',
              borderTop: '2px solid #222222',
              margin: 'auto',
              marginTop: '15px'
            }}
          />
        </Div>
        <Div style={{ fontSize: "20px", color: "#888888", marginBottom: "40px" }}>
          {designStyle.subtitle}
        </Div>
        <Div style={{  paddingBottom: "", width: '86%', marginLeft: "6.5%"}}>
          <DBCarousel
            data={designStyle.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
