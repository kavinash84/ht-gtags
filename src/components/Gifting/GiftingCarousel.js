import React from "react";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import SlickSlider from "../SlickSlider";
import "./Slider.css";
import CarouselData from "./CarouselData";

const nextArrow = require("../../../static/new-home/roundedArrowRight.svg");
const previousArrow = require("../../../static/new-home/roundedArrowLeft.svg");

const styles = require("./style.scss");

const adjustSlidesNew = () => ({
  slidesToShow: 3,
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
        style={{ ...style, width: "15px" }}
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
        style={{ ...style, width: "15px" }}
      />
    </React.Fragment>
  );
}

function GiftingCarousel({ categoryName, data, onClick }) {
  return (
    <Div mt="1.5rem">
      <div className={styles.titleCard}>
        <div>
          <p>{data.title}</p>
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #323131",
              margin: "auto"
            }}
          ></div>
        </div>
      </div>
      <Div className="carousel-one offset" mt="0rem">
        <SlickSlider
          settings={{
            ...adjustSlidesNew(),
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
          }}
        >
          {data.values.map((elem, index) => (
            <CarouselData elem={elem} index={index} />
          ))}
        </SlickSlider>
      </Div>
    </Div>
  );
}

export default GiftingCarousel;
