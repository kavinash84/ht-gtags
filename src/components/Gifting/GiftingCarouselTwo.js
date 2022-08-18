import React from "react";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import { Link } from "react-router-dom";
import SlickSlider from "../SlickSlider";
import "./Slider.css";
import CarouselDataTwo from "./CarouselDataTwo";

const styles = require("./style.scss");
const nextArrow = require("../../../static/new-home/roundedArrowRight.svg");
const previousArrow = require("../../../static/new-home/roundedArrowLeft.svg");

const adjustSlidesNew = length => ({
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
  autoplay: false,
  dots: false,
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

function GiftingCarousel({ categoryName, data, link, onClick }) {
  return (
    <div>
      <Div className="carousel-one offset" mt="1rem" pl="0rem" mb="1rem">
        <Div
          className={styles.flexTwo}
          pr="1rem"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Heading
            mb="10px"
            ta="left"
            color="#323131"
            pl="1rem"
            fontSize="16px"
            fontFamily="regular"
            fontWeight="600"
          >
            {categoryName}
          </Heading>
          <Link to={link} onClick={onClick}>
            <Text fontSize="16px">Shop All</Text>
          </Link>
        </Div>
        <SlickSlider
          settings={{
            ...adjustSlidesNew(),
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />
          }}
        >
          {data.map((elem, index) => (
            <CarouselDataTwo
              elem={elem}
              index={index}
              categoryName={categoryName}
            />
          ))}
        </SlickSlider>
      </Div>
    </div>
  );
}

export default GiftingCarousel;
