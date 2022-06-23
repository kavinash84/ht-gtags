import React from "react";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

const styles = require('../Slider.scss');

const DBItem = ({ component, data }) => {
  return (
    <Box variant="section.catSliderItem">
      <Div className={`${styles.sliderItem}`}>
        <div className={styles.link}>
          <div>
            <img
              data-src={data.imgSrc}
              src={`${data.imgSrc}?blur=30`}
              alt={data.title}
              className={styles.curosalImg}
              style={{ height: "100%", width: "100%", margin: "0 10px"}}
            />
          </div>

          <Div className={styles.content3}>
            <Text style={{ fontSize: "18px", fontWeight: "600", textAlign:'left' }}>
              {data.title}
            </Text>
            <p className={styles.contnet3_description} style={{fontSize:'14px', lineHeight:'20px'}}>{data.description}</p>
          </Div>
        </div>
      </Div>
    </Box>
  );
};

export default DBItem;
