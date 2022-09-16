import React from "react";
import logo from "../../../static/logo-ht.png";

const LandingPageLogo = () => (
  <div
    style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <div>
      <a href="https://www.hometown.in" target="_blank" rel="noopener">
        <img
          className="img-fluid"
          src={logo}
          alt="HomeTown"
          style={{ margin: "15px 0px" }}
        />
      </a>
    </div>
  </div>
);

export default LandingPageLogo;
