import React from "react";

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
          src="https://static.hometown.in/media/cms/extras-desktop/logo-ht.png"
          alt="HomeTown"
          style={{ margin: "15px 0px" }}
        />
      </a>
    </div>
  </div>
);

export default LandingPageLogo;
