import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import SlickSlider from "../SlickSlider";
import CarouselData from "./CarouselData";

const nextArrow = require("../../../static/new-home/roundedArrowRight.svg");
const previousArrow = require("../../../static/new-home/roundedArrowLeft.svg");

const adjustSlidesNew = length => ({
  slidesToShow: length > 1 ? 2 : length,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: true,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={nextArrow}
        onClick={onClick}
        style={{ ...style, marginRight: "20px", width: "15px" }}
      />
    </React.Fragment>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={previousArrow}
        onClick={onClick}
        style={{ ...style, marginLeft: "20px", width: "15px" }}
      />
    </React.Fragment>
  );
}

export class BeforeYouBuy extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div mt="2rem" style={{ backgroundColor: "#F3F5F7", padding: "2% 7%" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: 600,
            padding: "0px 0px 25px"
          }}
        >
          {data.title}
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginTop: "15px"
            }}
          />
        </div>
        <Div className="carousel-one offset" mt="0rem">
          <SlickSlider
            settings={{
              ...adjustSlidesNew(8),
              nextArrow: <SampleNextArrow />,
              prevArrow: <SamplePrevArrow />
            }}
          >
            {data.values.map((elem, index) => (
              <CarouselData elem={elem} index={index} component="4" />
            ))}
          </SlickSlider>
        </Div>
      </Div>
    );
  }
}

export default BeforeYouBuy;
