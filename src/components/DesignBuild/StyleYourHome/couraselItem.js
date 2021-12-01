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
          <div style={{ height: "300px" }}>
            <img
              src={data.imgSrc}
              alt={data.title}
              className={styles.curosalImg}
              style={{ height: "100%", width: "100%", margin: "0 10px"}}
            />
          </div>
          </Link>
          {/* <Div className={styles.content12}>
            <Text style={{ fontSize: "18px", fontWeight: "600", textAlign:'center' }}>
              {data.title}
            </Text>
          </Div> */}
          <div
          style={{
            background: '#F2F2F2',
            padding: '10px 10px',
            width: '75%',
            marginLeft: '18%',
            marginTop: '-15px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 'bolder',
            opacity: '90%'
          }}
        >
          {data.title}
        </div>
        </div>
      </Div>
    </Box>
  );
};

export default DBItem;
