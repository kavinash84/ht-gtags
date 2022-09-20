import React, { Component } from "react";
import { Link } from "react-router-dom";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
export class MattressesByComfort extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div mt="2rem" style={{ padding: "2% 7%" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: 600,
            padding: "0px 0px 25px"
          }}
        >
          {data.title}
        </div>
        <Row
          mt="2rem"
          style={{
            justifyContent: "center"
          }}
        >
          {data.values.map((elem, index) => (
            <Link to={elem.link} style={{ margin: "0px 0.5rem", width: "17%" }}>
              <Div style={{ width: "100%" }}>
                <Div
                  key={index}
                  p="1rem"
                  style={{ backgroundColor: "#F3EFE7", width: "100%" }}
                >
                  <Image src={elem.image} alt={elem.title} width="100%" />
                </Div>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    color: "#17245B",
                    fontSize: "16px"
                  }}
                >
                  {elem.title}
                </Text>
              </Div>
            </Link>
          ))}
        </Row>
      </Div>
    );
  }
}

export default MattressesByComfort;
