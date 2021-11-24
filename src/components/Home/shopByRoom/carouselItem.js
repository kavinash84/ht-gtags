import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
const arrowForward = require("../../../../static/new-home/newForwardArrow.svg");
const styles = require("../Slider.scss");

// import "./CategoryCarousel.css";

class DBItem extends React.Component {
  render() {
    const { component, data } = this.props;
    return (
      <Box variant="section.catSliderItem">
        <Div
          className={`${styles.sliderItem}`}
          style={{
            // paddingRight: '0px',
            backgroundColor: "#F5F5F5",
            padding: "0px 0px 20px 0",
            height: "600px"
            // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
          }}
        >
          <Link
            className={styles.link}
            to={data.url_key}
            onClick={() => {
              sessionStorage.setItem("ShopByRoomscroll", window.pageYOffset);
            }}
          >
            <div style={{ height: "400px" }}>
              <img
                src={data.image}
                alt={data.title}
                className={styles.curosalImg}
                style={{
                  height: "100%",
                  width: "100%",
                  margin: "auto",
                  marginTop: "0"
                }}
              />
            </div>
            <Div className={styles.content4}>
              <Div
                style={{ fontSize: "20px", textAlign: "left" }}
                className={styles.name}
              >
                {data.title}
              </Div>
              <div style={{ display: "table-cell" }}>
                <p className={styles.content4_description}>
                  {data.description}
                </p>
              </div>
              <Heading
                style={{ textAlign: "left" }}
                fontSize="14px"
                fontFamily="regular"
                color="black"
                mt="20px"
              >
                KNOW MORE
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
  }
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("ShopByRoomscroll");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("ShopByRoomscroll");
      }, 2000);
    }
  };
}

export default DBItem;
