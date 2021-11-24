import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const styles = require("../HomeInterior.scss");

const adjustSlides = length => ({
  slidesToShow: 1,
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
  customerStories: homeinterior.data.items.text.customerStories
}))
export default class CustomerStories extends Component {
  render() {
    const { customerStories } = this.props;
    return (
      <Div
        style={{
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
          {customerStories.title}
          <div
            style={{
              width: '30px',
              borderTop: '2px solid #222222',
              margin: 'auto',
              marginTop: '15px'
            }}
          />
        </Div>
        <Div style={{  paddingBottom: "", width: '80%', marginLeft: "10%"}}>
          <DBCarousel
            data={customerStories.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
