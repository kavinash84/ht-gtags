import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// // import Box from 'hometown-components/lib/Div';
import Img from "hometown-components-dev/lib/Img";
// import TextHtV1 from "hometown-components-dev/lib/TextHtV1";
// import ReactStars from "react-stars";

const GetTheLook01 = require("../../../static/new-home/getthelook01.png");
const GetTheLook02 = require("../../../static/new-home/getthelook02.png");
const GetTheLook03 = require("../../../static/new-home/getthelook03.png");

import "./CategoryCarousel.css";
const CategoryItem = () => {
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
          className="GetTheLookCard"
          style={{
            width: "22rem",
            display: "flex",
            height: "360px",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            margin: "30px 30px 0px 10px"
          }}
        >
          <Img
            src={GetTheLook01}
            m={5}
            height="auto"
            width="90%"
            style={{ zIndex: 10 }}
          />
          <h3 className="title">
            Tiago Engieered Wood King bed without storage in Wenge Colour
          </h3>
        </div>
        <div
          style={{
            width: "22rem",
            display: "flex",
            height: "360px",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            margin: "30px 30px 0px 10px"
          }}
        >
          <Img
            src={GetTheLook02}
            m={5}
            height="auto"
            width="90%"
            style={{ zIndex: 10 }}
          />
          <h3 className="title">
            Tiago Engieered Wood Night Stand in Wenge Colour
          </h3>
        </div>
        <div
          style={{
            width: "22rem",
            display: "flex",
            height: "360px",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            margin: "30px 30px 0px 10px"
          }}
        >
          <Img
            src={GetTheLook03}
            m={5}
            height="auto"
            width="90%"
            style={{ zIndex: 10 }}
          />
          <h3 className="title">
            Tiago Engieered Wood Dresser with mirror in Wenge Colour
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
