import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

import Img from "hometown-components-dev/lib/Img";

// import "./CategoryCarousel.css";
const CategoryItem = ({ src, title }) => (
  <div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          width: "25rem",
          display: "flex",
          height: "360px",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start"
        }}
      >
        <Img src={src} m={5} height="auto" width="90%" style={{ zIndex: 10 }} />
        <h3
          style={{
            fontSize: "16px",
            fontWeight: "300",
            margin: " 20px 15px 0 5px",
            wordSpacing: "2px",
            letterSpacing: "0.6px",
            lineHeight: "18px"
          }}
          className="get-the-look-titleOne"
        >
          {title}
        </h3>
      </div>
    </div>
  </div>
);

CategoryItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default CategoryItem;
