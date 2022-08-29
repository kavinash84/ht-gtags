import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import SlickSlider from "../SlickSlider";
import CarouselData from "./CarouselData";
import "./Slider.css";

const adjustSlidesNew = length => ({
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  // dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
});

export class CustomerSpeak extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div mt="2rem">
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            padding: "25px"
          }}
        >
          {data.title}
        </div>
        <Div mt="0rem">
          <SlickSlider settings={adjustSlidesNew(8)}>
            {data.values.map((elem, index) => (
              <CarouselData elem={elem} index={index} component="6" />
            ))}
          </SlickSlider>
        </Div>
      </Div>
    );
  }
}

export default CustomerSpeak;
