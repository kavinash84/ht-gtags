import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCourosel";

const styles = require("../Designbuild.scss");

const adjustSlides = length => ({
  slidesToShow:3,
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
  servicesOffered: designBuild.data.items.text.servicesOffered
}))
export default class ServicesOffer extends Component {
  render() {
    const { servicesOffered } = this.props;
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
          {servicesOffered.title}
        </Div>
        <Div style={{ fontSize: "20px", color: "#888888", marginBottom: "40px" }}>
          {servicesOffered.description}
        </Div>
        <Div style={{ paddingBottom: "", width: '86%', marginLeft: "6.5%"}}>
          <DBCarousel
            data={servicesOffered.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
