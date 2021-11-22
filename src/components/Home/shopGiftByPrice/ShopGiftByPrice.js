import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const styles = require("../Home.scss");

const adjustSlides = length => ({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: false
  //   customPaging: i => (
  //     <div
  //       style={{
  //         borderTop: "1px solid #848C7F"
  //       }}
  //     />
  //   )
});

@connect(({ homepage: { homepagecmsdata } }) => ({
  homepagecmsdata,
  shopGiftByPrice: homepagecmsdata.data.items.text.shopGiftByPrice
}))
export default class ShopGiftByPrice extends Component {
  render() {
    console.log(this.props.homepagecmsdata, "homepagecmsdata123");
    const { shopGiftByPrice } = this.props;
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
          {shopGiftByPrice.mainTitle}
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginTop: "15px"
            }}
          />
        </Div>

        <Div
          style={{
            paddingBottom: "",
            width: "80%",
            marginLeft: "10%"
          }}
        >
          <DBCarousel
            data={shopGiftByPrice.items}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
