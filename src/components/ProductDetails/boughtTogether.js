import React, { Component } from "react";
import SlickSlider from "components/SlickSlider";
import { Link } from "react-router-dom";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";

const LeftArrow = require("../../../static/new-home/roundedArrowLeft.svg");
const RightArrow = require("../../../static/new-home/roundedArrowRight.svg");
import "./Slider.css";

const settings = length => ({
  slidesToShow: length > 4 ? 4 : length,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: false
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={RightArrow}
        onClick={onClick}
        style={{ ...style, margin: 0, width: "15px", top: "55%" }}
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
        src={LeftArrow}
        onClick={onClick}
        style={{ ...style, margin: 0, width: "15px", top: "55%" }}
      />
    </React.Fragment>
  );
}

export default class BaughtTogether extends Component {
  render() {
    const { data } = this.props;
    return (
      <div
        style={{
          display: "flex",
          width: "70%",
          justifyContent: "center",
          margin: "10px 5% 30px 5%"
        }}
      >
        <SlickSlider
          settings={{
            ...settings(data.length),
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
          }}
          className="homeBankOfferesSlider"
        >
          {data.length &&
            data.map(item => (
              <div style={{ margin: "0 10px" }}>
                <div
                  style={{
                    padding: "10px",
                    width: "210px"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "white",
                      height: "230px",
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      paddingLeft: "30px",
                      paddingRight: "30px"
                    }}
                  >
                    slider item
                  </div>
                </div>
              </div>
            ))}
        </SlickSlider>
      </div>
    );
  }
}
