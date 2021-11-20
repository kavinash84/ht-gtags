import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

import Img from "hometown-components-dev/lib/Img";

import "./CategoryCarouselTwo.css";
const CategoryItem = ({ src, title }) => {
  return (
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
            width: "22rem",
            display: "flex",
            height: "360px",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start"
          }}
        >
          <Img
            src={src}
            m={5}
            height="auto"
            width="90%"
            style={{ zIndex: 10 }}
          />
          <h3 className="get-the-look-title-two">{title}</h3>
        </div>
      </div>
    </div>
  );
};

CategoryItem.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default CategoryItem;
