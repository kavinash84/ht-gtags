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
        <Link to={data.url_key}
        onClick={() => {
              sessionStorage.setItem("DesignBuildscrollPosition", window.pageYOffset);
            }}>
          <div style={{ height: "100%" }}>
            <img
              src={data.image}
              alt={data.title}
              className={styles.curosalImg}
              style={{ height: "100%", width: "100%", margin: "0 10px"}}
            />
          </div>
          </Link>
          <Div>
            <Text style={{ fontSize: "20px", fontWeight: "600", textAlign:'left', padding: '15px 10px 10px'}}>
              {data.title}
            </Text>
          </Div>
        </div>
      </Div>
    </Box>
  );
};

export default DBItem;
