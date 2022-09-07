import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import SlickSlider from "../SlickSlider";
import CarouselData from "./CarouselData";

const nextArrow = require("../../../static/new-home/roundedArrowRight.svg");
const previousArrow = require("../../../static/new-home/roundedArrowLeft.svg");

const adjustSlidesNew = length => ({
  slidesToShow: length > 2 ? 3 : length,
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
export class FoamPillows extends Component {
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("scrollPosition");
      }, 500);
    }
  };

  handleClick = () => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);
  };
  render() {
    const { data } = this.props;
    return (
      <Div mt="2rem" style={{ padding: "2% 7%" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            padding: "30x"
          }}
        >
          {data.title}
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
              <CarouselData elem={elem} index={index} component="3" />
            ))}
          </SlickSlider>
        </Div>
      </Div>
    );
  }
}

export default FoamPillows;
