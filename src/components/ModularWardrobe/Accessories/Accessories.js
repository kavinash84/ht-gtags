import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const styles = require("../ModularWardrobe.scss");

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

@connect(({ modularwardrobe }) => ({
  modularwardrobe,
  accessories: modularwardrobe.data.items.text.accessories
}))
export default class Accessories extends Component {
  render() {
    const { accessories } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "30px 30px 10px",
          textAlign: "center",
          marginTop: "60px"
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
          {accessories.title}
          <div
            style={{
              width: '30px',
              borderTop: '2px solid #222222',
              marginBottom:'10px',
              margin: 'auto',
              marginTop: '15px'
            }}
          />
        </Div>
        <Div style={{ paddingBottom: "", width: '86%', marginLeft: "6.5%"}}>
          <DBCarousel
            data={accessories.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
