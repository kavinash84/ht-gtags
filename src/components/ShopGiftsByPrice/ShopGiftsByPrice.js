import React from "react";

// import BoxHtV1 from "hometown-components-dev/lib/Div";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

import RowHtV1 from "hometown-components-dev/lib/RowHtV1";

const arrowForward = require("../../../static/new-home/newForwardArrow.svg");

import "./ShopGiftsByPrice.css";

const ShopGiftsByPriceCards = ({ src, title, button }) => {
  return (
    <div className="ShopGiftsByPrice-wrapper">
      <RowHtV1 justifyContent="center" mx={0} mb={0} />

      <div className="ShopGiftsByPrice-card-wrapper">
        <div className="ShopGiftsByPrice-card">
          <img
            className="ShopGiftsByPrice-img"
            src={src}
            m={5}
            height="auto"
            width="90%"
            style={{ zIndex: 10 }}
          />

          <h3 className="ShopGiftsByPrice-card-title">{title}</h3>

          <p className="ShopGiftsByPrice-button">
            {button}
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
          </p>
        </div>
      </div>
    </div>
  );
};

ShopGiftsByPriceCards.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  button: PropTypes.string
};

export default ShopGiftsByPriceCards;
