import React from "react";
import Box from "hometown-components-dev/lib/BoxHtV1";
// import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import { connect } from "react-redux";

// const logo = require("../../static/designBuildLogo.png");
const styles = require("./PlanYourKitchen.scss");

@connect(({ planyourkitchen }) => ({
  planyourkitchen,
  pktopBanner: planyourkitchen.data.items.text.pktopBanner
}))
class TopBanner extends React.Component {
  render() {
    const { pktopBanner } = this.props;
    return (
      <Box className={styles.maincontainer}>
        <Image
          data-src={pktopBanner.img}
          src={`${pktopBanner.img}?blur=30`}
          alt="topbanner"
          width="100%"
          height="650px"
          style={{ objectFit: "cover" }}
        />
        <Box
          style={{ height: "75%", width: "350px", backgroundColor: "#FFF8F4" }}
          className={styles.subsection}
        >
          {/* <Image src={topBanner.image} alt="topbanner" style={{ objectFit: 'cover', width: '50%', marginLeft: '25%' }} /> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <Text
              style={{
                color: "#252525",
                fontSize: "40px",
                textAlign: "center",
                padding: "70px 20px 0px",
                lineHeight: "50px"
              }}
            >
              Plan
            </Text>
            <Text
              style={{
                color: "#252525",
                fontSize: "40px",
                textAlign: "center",
                padding: " 5px 20px",
                lineHeight: "60px"
              }}
            >
              Your
            </Text>
            <Heading
              style={{
                color: "#252525",
                fontSize: "40px",
                textAlign: "center",
                padding: "0px 25px 25px",
                lineHeight: "60px"
              }}
            >
              Dream <br /> Kitchen
            </Heading>
          </div>
        </Box>
      </Box>
    );
  }
}
export default TopBanner;
