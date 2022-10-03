import React, { Component } from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";

export class TopBanner extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <div style={{ paddingBottom: "45px" }}>
          <Image
            data-src={data.image}
            src={`${data.image}blur=30`}
            alt=""
            width="100%"
            style={{ marginTop: "15px" }}
          />
          <div
            style={{
              background: "#000000",
              padding: "5%",
              opacity: 0.4,
              marginTop: "-10.2%"
            }}
          ></div>
          <div
            style={{
              fontSize: "22px",
              color: "white",
              width: "100%",
              lineHeight: "35px",
              textAlign: "center",
              fontWeight: 600,
              marginTop: "-7.5%",
              position: "relative",
              zIndex: 2
            }}
          >
            A GOOD NIGHT’S <br />
            SLEEP STARTS HERE
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "10px 15% 0px" }}>
          <Image
            data-src={data.subImage}
            src={`${data.image}blur=30`}
            alt=""
            width="100%"
          />
        </div>
      </div>
    );
  }
}

export default TopBanner;
