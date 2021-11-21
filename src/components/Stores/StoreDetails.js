import React, { Component } from "react";
// import Container from "hometown-components/lib/Container";
import PropTypes from "prop-types";

import Row from "hometown-components-dev/lib/RowHtV1";

import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import Text from "hometown-components/lib/Text";
import Image from "hometown-components-dev/lib/ImageHtV1";

const storesImg = require("../../../static/storedemoimg.jpg");

export default class StoreDetails extends Component {
  render() {
    const { store } = this.props;
    return (
      <div type="block">
        <div
          style={{
            display: "flex",
            paddingTop: "2.5rem",
            paddingBottom: "2.5rem",
            height: "auto"
          }}
        >
          <div style={{ paddingRight: "0", paddingLeft: "0" }} type="container">
            <Row display="block" mr="0" ml="0" mb="1.25rem  ">
              <div col="12">
                <Image src={storesImg} alt="Stores" width="100%" />
              </div>
            </Row>
            <Row display="block" mr="0" ml="0">
              <div col="12">
                <HeadingHtV1
                  fontSize="0.875rem"
                  mb="0.625rem"
                  color="secondary"
                >
                  STORE ADDRESS
                </HeadingHtV1>
                <div
                  style={{
                    fontSize: "0.75rem",
                    marginBottom: "0rem",
                    marginTop: "0.3125rem",
                    color: "black"
                  }}
                >
                  {store.address || null}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    marginBottom: "0rem",
                    marginTop: "0.3125rem",
                    color: "black"
                  }}
                >
                  {store.city || null}, {store.state || null},{" "}
                  {store.pincode || null}
                </div>
              </div>
              <div col="12">
                <HeadingHtV1
                  fontSize="0.875rem"
                  mb="0.625rem"
                  color="secondary"
                >
                  TIMING
                </HeadingHtV1>
                <div
                  style={{
                    fontSize: "0.75rem",
                    marginBottom: "0rem",
                    marginTop: "0.3125rem",
                    color: "black"
                  }}
                >
                  {store.timings || null}
                </div>
              </div>
              <div col="12">
                <HeadingHtV1
                  fontSize="0.875rem"
                  mb="0.625rem"
                  color="secondary"
                >
                  PHONE
                </HeadingHtV1>
                <div
                  style={{
                    fontSize: "0.75rem",
                    marginBottom: "0rem",
                    marginTop: "0.3125rem",
                    color: "black"
                  }}
                >
                  {store.phone || null}
                </div>
              </div>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
StoreDetails.defaultProps = {
  store: {}
};

StoreDetails.propTypes = {
  store: PropTypes.object
};
