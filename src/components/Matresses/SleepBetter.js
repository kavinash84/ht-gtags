import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "hometown-components-dev/lib/RowHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

export class SleepBetter extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div
        mt="4rem"
        style={{
          backgroundColor: "#F3EFE7",
          padding: "1.5% 7%"
        }}
        id="sleepBetter"
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: 600,
            padding: "25px"
          }}
        >
          {data.title}
        </div>
        <Row
          mr="0px"
          ml="0px"
          mt="1rem"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          {data.collection.length
            ? data.collection.map((row, index) => (
                <Link to={row.link1} style={{ width: "30%" }}>
                  <Div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <Image src={row.image1} alt={row.name1} width="100%" />
                    <Text
                      fontSize="1rem"
                      color="#323231"
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "98%",
                        overflow: "hidden",
                        textAlign: "center",
                        padding: "15px"
                      }}
                    >
                      {row.name1}
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

export default SleepBetter;
