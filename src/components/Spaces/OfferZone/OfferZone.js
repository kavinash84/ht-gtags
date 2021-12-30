import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

const adjustSlides = length => ({
  slidesToShow: 4,
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

@connect(({ spaces }) => ({
  spaces,
  offerZone: spaces.data.items.text.offerZone
}))
export default class OfferZone extends Component {
  render() {
    const { offerZone } = this.props;
    return (
      <Div
        style={{
          backgroundColor: "#FFF8F4",
          padding: "40px 30px 50px",
          textAlign: "center",
          marginTop: "80px",
          marginBottom: "-50px"
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
          {offerZone.title}
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
            width: "86%",
            marginLeft: "7%"
          }}
        >
          <DBCarousel
            data={offerZone.values}
            settings={adjustSlides}
            component={3}
          />
        </Div>
      </Div>
    );
  }
}
