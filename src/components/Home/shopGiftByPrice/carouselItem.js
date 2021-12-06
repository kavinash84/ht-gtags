import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
// import Text from "hometown-components-dev/lib/TextHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";

const styles = require("../Slider.scss");
const arrowForward = require("../../../../static/new-home/newForwardArrow.svg");

const DBItem = ({ component, data }) => {
  return (
    <div>
      {data.url_key ? (
        <Box variant="section.catSliderItem" style={{ padding: "20px 20px" }}>
          <Div
            className={`${styles.sliderItem} ${styles.sliderItemtwo}`}
            style={{
              // paddingRight: '0px',
              backgroundColor: "#ffffff",
              padding: "20px 0px",

              marginTop: "auto"

              // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
            }}
          >
            <Link
              className={styles.link}
              to={data.url_key}
              onClick={() => {
                sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
              }}
            >
              <div>
                <img
                  src={data.image}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{
                    height: "auto",
                    width: "90%",
                    margin: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
              <Div className={styles.content4}>
                <Div
                  style={{
                    fontSize: "16px",
                    textAlign: "left",
                    color: "#323F38"
                  }}
                  className={styles.name}
                >
                  {data.title}
                </Div>

                <Heading
                  style={{ textAlign: "left" }}
                  fontSize="12px"
                  fontFamily="regular"
                  fontWeight="bold"
                  color="black"
                  mt="20px"
                  color="#323F38"
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
      ) : (
        <Box variant="section.catSliderItem" style={{ padding: "20px 20px" }}>
          <Div
            className={`${styles.sliderItem} ${styles.sliderItemtwo}`}
            style={{
              // paddingRight: '0px',
              backgroundColor: "#ffffff",
              padding: "20px 0px",

              marginTop: "auto"

              // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
            }}
          >
            <div className={styles.link}>
              <div>
                <img
                  src={data.image}
                  alt={data.title}
                  className={styles.curosalImg}
                  style={{
                    height: "auto",
                    width: "90%",
                    margin: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
              <Div className={styles.content4}>
                <Div
                  style={{
                    fontSize: "16px",
                    textAlign: "left",
                    color: "#323F38"
                  }}
                  className={styles.name}
                >
                  {data.title}
                </Div>

                <Heading
                  style={{ textAlign: "left" }}
                  fontSize="12px"
                  fontFamily="regular"
                  fontWeight="bold"
                  color="black"
                  mt="20px"
                  color="#323F38"
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
            </div>
          </Div>
        </Box>
      )}
    </div>
  );
};

export default DBItem;
