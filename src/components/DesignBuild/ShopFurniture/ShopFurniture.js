import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCourosel";

const styles = require("../Designbuild.scss");

const adjustSlides = length => ({
  slidesToShow:4,
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

@connect(({ designBuild }) => ({
  designBuild,
  shopFurniture: designBuild.data.items.text.shopFurniture
}))

export default class ShopFurniture extends Component {
  render() {
    const { shopFurniture } = this.props;
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
            fontSize: "40px",
            fontWeight: "600",
            marginBottom: "20px",
            color: "black"
          }}
        >
          {shopFurniture.title}
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
          {shopFurniture.description}
        </Div>
        <Div style={{ paddingBottom: "", width: '86%', marginLeft: "6.5%"}}>
          <DBCarousel
            data={shopFurniture.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
