import React, { Component } from "react";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";

export class SecondTopBannere extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            padding: "20x"
          }}
        >
          {data.title}
        </div>
        <Image
          data-src={data.image}
          src={`${data.image}blur=30`}
          alt=""
          width="100%"
          style={{ marginTop: "15px" }}
        />
        <div
          style={{
            background: "#69878BE6",
            color: "#FFFFFF",
            padding: "20px 20%",
            textAlign: "center",
            lineHeight: "20px"
          }}
        >
          {data.text}
        </div>
      </div>
    );
  }
}

export default SecondTopBannere;
