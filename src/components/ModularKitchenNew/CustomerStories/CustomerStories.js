import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { connect } from "react-redux";
import DBCarousel from "./DBCarousel";

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

@connect(({ modularkitchen, mattresses }) => ({
  modularkitchen,
  customerStories: modularkitchen.data.items
    ? modularkitchen.data.items.text.customerStories
    : mattresses.data.items.text.customerSpeak
}))
export default class CustomerStories extends Component {
  render() {
    const { customerStories, fromMattres } = this.props;
    return (
      <Div
        style={{
          padding: "30px 30px 20px",
          textAlign: "center",
          marginTop: "40px"
        }}
      >
        {fromMattres ? (
          <div
            style={{
              textAlign: "center",
              fontSize: "22px",
              fontWeight: 600,
              padding: "0px 0px 25px"
            }}
          >
            {customerStories.title}
          </div>
        ) : (
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
                width: "30px",
                borderTop: "2px solid #222222",
                margin: "auto",
                marginTop: "15px",
                marginBottom: "20px"
              }}
            />
          </Div>
        )}
        <Div style={{ paddingBottom: "", width: "86%", marginLeft: "6.5%" }}>
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
