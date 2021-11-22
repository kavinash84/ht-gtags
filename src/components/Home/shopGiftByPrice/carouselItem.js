import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";

const styles = require("../Slider.scss");
const arrowForward = require("../../../../static/new-home/newForwardArrow.svg");

const DBItem = ({ component, data }) => {
  return (
    <Box variant="section.catSliderItem" style={{ padding: "0 20px" }}>
      <Div
        className={`${styles.sliderItem} ${styles.sliderItemtwo}`}
        style={{
          // paddingRight: '0px',
          backgroundColor: "#ffffff",
          padding: "20px 0px",
          height: "320px"

          // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
        }}
      >
        <Link
          className={styles.link}
          to={data.url_key}
          onClick={() => {
            sessionStorage.setItem("scrollPosition", window.pageYOffset);
          }}
        >
          <div style={{ height: "200px" }}>
            <img
              src={data.image}
              alt={data.title}
              className={styles.curosalImg}
              style={{ height: "100%", width: "90%", margin: "auto" }}
            />
          </div>
          <Div className={styles.content4}>
            <Div
              style={{ fontSize: "15px", textAlign: "left" }}
              className={styles.name}
            >
              {data.title}
            </Div>

            <Heading
              style={{ textAlign: "left" }}
              fontSize="13px"
              fontFamily="regular"
              color="black"
              mt="20px"
            >
              SHOP NOW
              <img
                style={{
                  display: "inline",
                  marginLeft: "-8px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </Heading>
          </Div>
        </Link>
      </Div>
    </Box>
  );
};

export default DBItem;
