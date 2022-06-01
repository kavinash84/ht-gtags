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
              padding: "0px 0px 20px",

              marginTop: "auto"

              // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
            }}
          >
            <Link
              to={data.url_key}
            >
              <div>
                <img
                  data-src={data.image}
                  alt={data.title}
                  style={{
                    height: "auto",
                    width: "100%",
                    margin: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
              <Div style={{paddingLeft:"10px"}}>
                <Div
                  style={{
                    fontSize: "18px",
                    textAlign: "left",
                    color: "#323F38",
                    fontWeight: "600",
                    paddingTop:"15px"
                  }}
                >
                  {data.title}
                </Div>
                <Div
                  style={{
                    fontSize: "18px",
                    textAlign: "left",
                    color: "#323F38",
                    fontWeight: "600",
                    paddingTop:"10px"
                  }}
                >
                  starting ₹{data.price}
                </Div>

                <Heading
                  style={{ textAlign: "left" }}
                  fontSize="14px"
                  fontFamily="regular"
                  fontWeight="bold"
                  color="#F47020"
                  mt="20px"
                >
                  SHOP NOW
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
              padding: "0px 0px 20px",
              marginTop: "auto"

              // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
            }}
          >
            <div>
            <Link to={data.url_key}>
              <div>
                <img
                  src={data.image}
                  alt={data.title}
                  style={{
                    height: "auto",
                    width: "100%",
                    margin: "auto",
                    objectFit: "contain"
                  }}
                />
              </div>
              <Div>
                <Div
                  style={{
                    fontSize: "16px",
                    textAlign: "left",
                    color: "#323F38",
                    fontWeight: "600",
                    padding:"10px"
                  }}
                >
                  {data.title}
                </Div>
                <Div
                  style={{
                    fontSize: "16px",
                    textAlign: "left",
                    color: "#323F38",
                    fontWeight: "600",
                    padding:"5px 10px 5px"
                  }}
                >
                  {data.subtitle}
                </Div>

                <Heading
                  style={{ textAlign: "left", paddingLeft:"10px" }}
                  fontSize="12px"
                  fontFamily="regular"
                  fontWeight="bold"
                  color="#F47020"
                  mt="20px"
                >
                  SHOP NOW
                </Heading>
              </Div>
              </Link>
            </div>
            
          </Div>
        </Box>
      )}
    </div>
  );
};

export default DBItem;
