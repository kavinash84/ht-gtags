import React, { Component } from "react";
import { Link } from "react-router-dom";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";

export class MattressesBySize extends Component {
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
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginTop: "15px"
            }}
          />
        </div>
        <Row
          mr="0px"
          ml="0px"
          mt="1rem"
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {data.collection.length
            ? data.collection.map((row, index) => (
                <Link
                  to={row.link || "/"}
                  style={{ width: "20%", marginRight: "10px" }}
                >
                  <Div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <Image src={row.image} alt={row.name} width="100%" />
                    <Text fontSize="1rem" color="#17245B" mt="10px">
                      {row.name}
                    </Text>
                  </Div>
                </Link>
              ))
            : null}
        </Row>
      </Div>
    );
  }
}

export default MattressesBySize;
