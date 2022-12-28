import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
// import Row from "hometown-components-dev/lib/RowHtV1";
// import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
// const styles = require("./KitchenLayout.scss");
const arrowForward = require("../../../../static/new-home/newForwardArrow.svg");
import Button from "hometown-components-dev/lib/ButtonHtV1";

// const styles = require("./HomeTownAdvantage.scss");

// @connect(({ modularkitchen }) => ({
//   modularkitchen,
//   kitchenlayout: modularkitchen.data.items.text.kitchenlayout
// }))
class KitchenLayoutItems extends React.Component {
  render() {
    const {
      image,
      url,
      onClick,
      target,
      onImageClick,
      title,
      description
    } = this.props;
    return (
      <Section>
        <Box
          width="80%"
          marginLeft="10%"
          marginRight="10%"
          style={{
            position: "relative"
          }}
        >
          <Image
            mt="15px"
            alt="topbanner"
            width="100%"
            height="650px"
            data-src={image}
            style={{
              objectFit: "cover"
            }}
          />

          <Box
            style={{
              height: "45%",
              width: "33%",
              backgroundColor: "white",
              position: "absolute",
              top: "60%",
              left: "68%"
            }}
          >
            <Text
              fontSize="23px"
              color="label"
              mt="10px"
              style={{
                textAlign: "left",
                color: "#3A3A3A",
                fontWeight: "600",
                marginLeft: "5%",
                paddingTop: "20px"
              }}
            >
              {title}
              {/* Straight Kitchen */}
            </Text>
            <Text
              fontSize="16px"
              color="label"
              mt="10px"
              style={{
                textAlign: "left",
                color: "#999999",
                lineHeight: "125%",
                width: "90%",
                marginLeft: "5%"
              }}
            >
              {description}
            </Text>

            <Button
              onClick={this.props.handleModal}
              backgroundColor="#fff"
              fontSize="14px"
              color="label"
              fontWeight="bold"
              mt="10px"
              style={{
                textAlign: "left",
                color: "#3A3A3A",
                lineHeight: "30px",
                width: "90%",
                marginLeft: "2%",
                marginTop: "4%"
              }}
            >
              SPEAK TO OUR EXPERTS
              <img
                style={{
                  display: "inline",
                  marginLeft: "-8px",
                  height: "10px",
                  width: "40px"
                }}
                src={arrowForward}
                alt="Arrow"
              />
            </Button>
          </Box>
        </Box>
      </Section>
    );
  }
}
KitchenLayoutItems.defaultProps = {
  image: "",
  title: "",
  description: "",
  url: "",
  onImageClick: () => {}
};

KitchenLayoutItems.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func
};
export default KitchenLayoutItems;
