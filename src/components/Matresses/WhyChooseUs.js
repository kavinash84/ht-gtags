import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

export class WhyChooseUs extends Component {
  render() {
    const { data } = this.props;
    return (
      <Div mt="2rem">
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            padding: "25px 25px 35px"
          }}
        >
          {data.title}
        </div>
        <div
          style={{
            margin: "0px 7%",
            padding: "2% 5%",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            borderRadius: "3px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          {data.sections.length
            ? data.sections.map((section, index) => (
                <Div
                  key={index}
                  style={{ width: "30%", textAlign: "center", padding: "10px" }}
                >
                  <Div>
                    <Image src={section.image} alt={section.header} />
                  </Div>
                  <Text
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      margin: "0px 0px 10px"
                    }}
                  >
                    {section.header}
                  </Text>
                  <Text
                    style={{
                      color: "#3A3A3A",
                      lineHeight: "18px",
                      fontSize: "14px"
                    }}
                  >
                    {section.description}
                  </Text>
                </Div>
              ))
            : null}
        </div>
      </Div>
    );
  }
}

export default WhyChooseUs;
