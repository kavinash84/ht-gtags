import React, { Component } from "react";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import { Link } from "react-router-dom";
const LogoIcon = require("../../../static/logo.png");
const styles = require("./ModularKitchen.scss");

class Header extends React.Component {
  render() {
    return (
      <Section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "9px",
          marginBottom: "9px"
        }}
      >
        <div style={{ marginLeft: "10%" }}>
          <Link to="/">
            <Image
              src={LogoIcon}
              alt="logo"
              style={{ width: "90%", cursor: "pointer", marginTop: "5px" }}
            />
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* <Link to="plan-your-kitchen">
            <Text
              style={{
                marginRight: "20px",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              Plan Your Kitchen
            </Text>
          </Link> */}
          {/* <Link to="design-build">
            <Text
              style={{
                marginRight: "20px",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              Design & Build
            </Text>
          </Link> */}
          <Link to="who-we-are">
            <Text
              style={{
                marginRight: "20px",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              About Us
            </Text>
          </Link>
          <Button
            onClick={this.props.handleModal}
            style={{
              width: "200px",
              height: "50px",
              backgroundColor: "white",
              color: "#F47020",
              border: "1px solid #F47020",
              borderRadius: "5px",
              marginRight: "150px",
              textTransform: "none"
            }}
          >
            Request Quote
          </Button>
        </div>
      </Section>
    );
  }
}

export default Header;
