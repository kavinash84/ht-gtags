import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";

const styles = require("../Slider.scss");
// const path = require("../../../../static/newHomepage/path.svg");

const DBItem = ({ component, data }) => {
  return (
    <Box variant="section.catSliderItem">
      <Div
        className={`${styles.sliderItem}`}
        style={{
          // paddingRight: '0px',
          backgroundColor: "white",
          padding: "50px 10px",
          height: "500px"
          // pointerEvents: ['/modular-wardrobe'].includes(data.url_key) ? 'none' : ''
        }}
      >
        <div
          className={styles.shadow}
          style={{ width: "100%", height: "400px", backgroundColor: "white" }}
        >
          <Row style={{ position: "relative" }} col="12">
            <Div col="6">
              <img
                data-src={data.imgSrc}
                src={`${data.imgSrc}?blur=30`}
                style={{
                  width: "65%",
                  height: "480px",
                  marginTop: "-40px",
                  marginLeft: "100px"
                }}
              />
            </Div>
            <Div
              col="6"
              style={{
                position: "absolute",
                left: "570px",
                top: "80px",
                textAlign: "left"
              }}
              className={styles.background}
            >
              <Text
                style={{
                  width: "65%",
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: "32px"
                }}
              >
                {data.description}
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  fontStyle: "italic",
                  marginTop: "15px"
                }}
              >
                -{data.customerName}
              </Text>
            </Div>
          </Row>
        </div>
      </Div>
    </Box>
  );
};

export default DBItem;
