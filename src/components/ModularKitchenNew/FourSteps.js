import React, { Component } from "react";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import { connect } from "react-redux";
import StepsToYourHome from "./StepsToHome";
@connect(({ modularkitchen }) => ({
  modularkitchen,
  stepsToDreamhome: modularkitchen.data.items.text.stepsToDreamhome
}))
class Steps extends React.Component {
  render() {
    const { stepsToDreamhome } = this.props;
    return (
      <Box style={{ width: "100%", marginTop: "70px", position: "relative" }}>
        <Image
          data-src={stepsToDreamhome.image}
          style={{ width: "85%", height: "80%", minHeight: "80%" }}
        />
        <Box style={{ display: "flex" }}>
          <Box
            m="auto"
            style={{
              width: "50%",
              height: "80%",
              position: "absolute",

              top: "5%",
              right: "-50px"
            }}
            p="10px 50px"
            pb="30px"
          >
            <StepsToYourHome />
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Steps;
