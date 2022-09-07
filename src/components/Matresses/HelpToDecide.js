import React, { Component } from "react";
import { Link } from "react-router-dom";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import "./Slider.css";

export class HelpToDecide extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div mt="3rem" pt="1rem" pb="1rem" style={{ backgroundColor: "#F3EFE7" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            padding: "50px 30x 30px"
          }}
        >
          {data.title}
        </div>
        <Row
          mr="0px"
          ml="0px"
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {data.values.map((item, index) => (
            <Div
              key={index}
              p="0rem"
              pl="1.5rem"
              pr="0rem"
              pb="0rem"
              style={{ width: "30%" }}
            >
              {item.id === "3" ? (
                <a href="mailto: care@hometown.in">
                  <Div
                    style={{
                      paddingBottom: "1rem"
                    }}
                  >
                    <Div p="1rem 5rem">
                      <Image src={item.image} alt="brand logo" />
                    </Div>
                    <Div p="0px 0.7rem">
                      <Heading
                        fontSize="1.3rem"
                        style={{ color: "#323231", textAlign: "center" }}
                        mb="0px"
                      >
                        {item.title}
                      </Heading>
                      <Text
                        color="#323231"
                        fontSize="1rem"
                        mt="5px"
                        style={{ textAlign: "center" }}
                      >
                        {item.description}
                      </Text>
                    </Div>
                  </Div>
                </a>
              ) : (
                <Link to={item.link}>
                  <Div
                    style={{
                      paddingBottom: "1rem"
                    }}
                  >
                    <Div p="1rem 5rem">
                      <Image src={item.image} alt="brand logo" />
                    </Div>
                    <Div p="0px 0.7rem">
                      <Heading
                        fontSize="1.3rem"
                        style={{ color: "#323231", textAlign: "center" }}
                        mb="0px"
                      >
                        {item.title}
                      </Heading>
                      <Text
                        color="#323231"
                        fontSize="1rem"
                        mt="5px"
                        style={{ textAlign: "center" }}
                      >
                        {item.description}
                      </Text>
                    </Div>
                  </Div>
                </Link>
              )}
            </Div>
          ))}
        </Row>
      </Div>
    );
  }
}

export default HelpToDecide;
