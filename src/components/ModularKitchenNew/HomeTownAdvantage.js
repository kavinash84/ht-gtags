/* eslint-disable object-curly-spacing */
import React from "react";
import Box from "hometown-components-dev/lib/BoxHtV1";

import Heading from "hometown-components-dev/lib/HeadingHtV1";

import { connect } from "react-redux";

const styles = require("./HomeTownAdvantage.scss");

@connect(({ modularkitchen }) => ({
  modularkitchen,
  hometownadvantage: modularkitchen.data.items.text.hometownadvantage
}))
class HomeTownAdvantage extends React.Component {
  render() {
    const { hometownadvantage } = this.props;
    return (
      <Box mt="80px">
        <Box>
          <Heading
            style={{ color: "#323131", fontSize: "40px", textAlign: "center" }}
          >
            {hometownadvantage.title}
            {/* The HomeTown Advantage */}
          </Heading>
        </Box>

        <div className={styles.whyus}>
          <div className={styles.outerbox1}>
            <div
              style={{ borderRight: "1px dashed #707070" }}
              className={styles.innerbox}
            >
              <text className={styles.boldtext}>
                {hometownadvantage.data[0].title}
              </text>
              <text>{hometownadvantage.data[0].description}</text>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
            </div>
            <div
              style={{ borderRight: "1px dashed #707070" }}
              className={styles.innerbox}
            >
              <text className={styles.boldtext}>
                {hometownadvantage.data[1].title}
              </text>
              <text>Design</text>
              <text>Studios</text>
            </div>
            <div
              style={{ borderRight: "1px dashed #707070" }}
              className={styles.innerbox}
            >
              <text className={styles.boldtext}>
                {hometownadvantage.data[2].title}
              </text>{" "}
              <text>Homes</text>
              <text>Designed</text>
            </div>
            <div className={styles.innerbox}>
              <text className={styles.boldtext}>
                {hometownadvantage.data[3].title}
              </text>
              <text>Project</text>
              <text>Management</text>
            </div>
          </div>
          <div className={styles.outerbox2}>
            <div
              style={{ borderRight: "1px dashed #707070" }}
              className={styles.innerbox}
            >
              <text className={styles.boldtext}>
                {hometownadvantage.data[4].title}
              </text>
              <text>In-House</text>
              <text>Designers</text>
            </div>
            <div
              style={{ borderRight: "1px dashed #707070" }}
              className={styles.innerbox}
            >
              <text className={styles.boldtext}>
                {hometownadvantage.data[5].title}
              </text>
              <text>Empanelled</text>
              <text>Contractors</text>
            </div>
            <div
              style={{ borderRight: "1px dashed #707070" }}
              className={styles.innerbox}
            >
              <text className={styles.boldtext}>
                {hometownadvantage.data[6].title}
              </text>
              <text>Service</text>
              <text>Visits</text>
            </div>
            <div className={styles.innerbox}>
              <text className={styles.boldtext}>
                {hometownadvantage.data[7].title}
              </text>
              <text>Transparent</text>
              <text>Pricing</text>
            </div>
          </div>
        </div>
      </Box>
    );
  }
}

export default HomeTownAdvantage;
