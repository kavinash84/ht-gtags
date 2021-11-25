import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBcarousel";

// const styles = require("../Home.scss");

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

@connect(({ homepage: { homepagecmsdata } }) => ({
  homepagecmsdata,
  shopByRooms: homepagecmsdata.data.items.text.shopByRooms
}))
export default class ShopByRooms extends Component {
  render() {
    console.log("998888999999999", shopByRooms);
    const { shopByRooms } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#F3F5F7",
          padding: "30px 30px 30px",
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
          {shopByRooms.mainTitle}
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginTop: "15px"
            }}
          />
        </Div>
        <Div style={{ fontSize: "12px", color: "#000", margin: "0 10px 0 0" }}>
          {shopByRooms.description}
        </Div>
        <Div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: "20px 10% 0 "
          }}
        >
          <DBCarousel
            data={shopByRooms.rooms}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
