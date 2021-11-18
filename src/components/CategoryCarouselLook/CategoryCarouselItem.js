import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// // import Box from 'hometown-components/lib/Div';
import Img from "hometown-components-dev/lib/Img";
// import TextHtV1 from "hometown-components-dev/lib/TextHtV1";
// import ReactStars from "react-stars";

import "./CategoryCarousel.css";
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
          <h3 className="get-the-look-title-one">{title}</h3>
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
