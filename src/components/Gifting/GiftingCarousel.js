import React from "react";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import SlickSlider from "../SlickSlider";
import "./Slider.css";
import CarouselData from "./CarouselData";

const styles = require("./style.scss");

const adjustSlidesNew = length => ({
  slidesToShow: length > 1 ? 1.4 : length,
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
        <SlickSlider settings={adjustSlidesNew(8)}>
          {data.values.map((elem, index) => (
            <CarouselData elem={elem} index={index} />
          ))}
        </SlickSlider>
      </Div>
    </Div>
  );
}

export default GiftingCarousel;
