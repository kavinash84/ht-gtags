import React, { Component } from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";

export class TopBanner extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <Image
          data-src={data.image}
          src={`${data.image}blur=30`}
          alt=""
          width="100%"
          style={{ marginTop: "15px" }}
        />
        <div style={{ textAlign: "center", padding: "15px 15%" }}>
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
