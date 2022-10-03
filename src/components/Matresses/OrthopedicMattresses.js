import React, { Component } from "react";
import { Link } from "react-router-dom";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";

export class OrthopedicMattresses extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div mt="2rem" style={{ padding: "2% 0%" }}>
        <Link to={data.link} style={{ position: "relative" }}>
          <Image src={data.image} alt={data.title} width="100%" />
          <Div
            style={{
              position: "absolute",
              width: "100%",
              bottom: "-1rem"
            }}
          >
            <Text
              color="#FFFFFF"
              fontSize="1rem"
              m=" 0px auto"
              style={{
                width: "55%",
                backgroundColor: "#69878B",
                fontWeight: "bold",
                textAlign: "center",
                padding: "15px"
              }}
            >
              {data.title}
            </Text>
          </Div>
        </Link>
      </Div>
    );
  }
}

export default OrthopedicMattresses;
