import React, { Component } from "react";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import { Link } from "react-router-dom";
const LogoIcon = require("../../../static/logo.png");

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
      </Section>
    );
  }
}

export default Header;
