import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import Box from "hometown-components/lib/Div";
import Image from "hometown-components-dev/lib/ImageHtV1";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import Text from 'hometown-components/lib/Text';
// import ReactStars from "react-stars";

const arrowForward = require("../../../static/new-home/newForwardArrow.svg");
import "./CategoryCarousel.css";

class CategoryItem extends Component {
  render() {
    return (
      <div
        style={{
          width: "90%",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: "180px 5% 0 5%"
        }}
      >
        <div
          style={{
            width: "30rem",
            display: "flex",

            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            margin: "30px 30px 0px 0px"
          }}
        >
          <Image
            className="shopByRoom"
            src="https://static.hometown.in/media/cms/extras-desktop/shopbyroom01.png"
            height="auto"
            style={{ zIndex: 10 }}
          />

          <HeadingHtV1
            fontFamily="medium"
            style={{ textAlign: "center", color: "#323131" }}
            fontSize="20px"
            mt="20px"
            mb="10px"
          >
            Living Room
          </HeadingHtV1>
          <p className="description">
            From clssic neutrals to chic modren, over living room furniture
            collection has something for everyone home. Shop sofas, recliners,
            coffee tables, end tables, meedia units, ottomans and much more
          </p>
          <div className="shop-by-room-button">
            EXPLORE
            <img
              style={{
                display: "inline",
                marginLeft: "-3px",
                height: "10px",
                width: "40px"
              }}
              src={arrowForward}
              alt="Arrow"
            />
          </div>
        </div>
        <div
          style={{
            width: "30rem",
            display: "flex",

            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            margin: "30px 30px 0px 0px"
          }}
        >
          <Image
            className="shopByRoom"
            src="https://static.hometown.in/media/cms/extras-desktop/shopbyroom02.png"
            height="auto"
            style={{ zIndex: 10 }}
          />
          <HeadingHtV1
            fontFamily="medium"
            style={{ textAlign: "center", color: "#323131" }}
            fontSize="20px"
            mt="20px"
            mb="10px"
          >
            Dining
          </HeadingHtV1>
          <p className="description">
            casual get-togethers or intimate soirees, our dining room furniture
            collection has the perfect pieces to make every moment intoo a
            memorable one. Shop dining room sets, dining chairs, bar stools,
            sideboards or serving trolleys
          </p>
          <div className="shop-by-room-button">
            EXPLORE
            <img
              style={{
                display: "inline",
                marginLeft: "-3px",
                height: "10px",
                width: "40px"
              }}
              src={arrowForward}
              alt="Arrow"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryItem;
