import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Box from "hometown-components-dev/lib/BoxHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import { formatAmount } from "utils/formatters";

import "./CategoryCarousel.css";
import "../Home/Slider.css";

// const arrowForward = require("../../../static/newHomepage/newForwardArrow.svg");

const CategoryItem = ({
  image,
  name,
  brand,
  url,
  offerPrice,
  delivery,
  maxPrice,
  off,
  coupon,
  id,
  specialPrice,
  fixedValue,
  couponType,
  couponEndDate,
  couponFlag,
  percentageOff
}) => {
  const hasCoupon = specialPrice !== maxPrice && off && coupon;
  const hasSpecialPrice = specialPrice && specialPrice !== maxPrice;
  const couponValue = couponType === "fixed" ? `₹${off}` : `${off}% OFF`;

  return (
    <Box
      className="carousel-one"
      p="10px"
      bg="white"
      style={{ position: "relative", borderRadius: "5px", height: "auto" }}
    >
      {id === 2 ? (
        <Box
          bg="#F7F0F0"
          height="100px"
          m="-12px"
          mb="-100px"
          style={{ width: "90%" }}
        />
      ) : null}

      {url ? (
        <Link to={url}>
          {/* Product Image */}
          {image ? (
            <div style={{ position: "relative" }}>
              <Image
                src={image}
                alt={name}
                height="auto"
                width="100%"
                m="auto"
                style={{ border: "2px solid #FAF4F2" }}
              />
              {id === 1 ? <div className="coupon">Ends Today</div> : null}
              {id === 2 && coupon ? (
                <div className="coupon">Ends on {couponEndDate}</div>
              ) : null}
            </div>
          ) : null}

          {/* Product Name */}
          {name ? (
            <Text
              ta="left"
              fontSize="12px"
              mt="12px"
              mb="0"
              lineHeight="1.2rem"
              style={{ fontWeight: "bold", color: "#222222", height: "40px" }}
            >
              {name.split("").length > 50 ? `${name.slice(0, 50)}....` : name}
            </Text>
          ) : null}

          {/* Product Brand */}
          {brand ? (
            <Text
              ta="left"
              fontSize="12px"
              mt="0px"
              mb="0"
              lineHeight="1.3rem"
              style={{
                fontWeight: "bold",
                color: "gray"
              }}
            >
              By{" "}
              {brand.split("").length > 50
                ? `${brand.slice(0, 50)}....`
                : brand}
            </Text>
          ) : null}

          {/* Product Price */}
          {maxPrice && offerPrice ? (
            <div>
              <p className="mrpCsp">
                {hasSpecialPrice ? (
                  <span className="mrpWithCsp">₹{formatAmount(maxPrice)}</span>
                ) : null}

                {hasSpecialPrice ? (
                  <span>
                    <span className="csp">₹{formatAmount(specialPrice)}</span>
                  </span>
                ) : (
                  <span>
                    <span className="mrp">₹{formatAmount(maxPrice)}</span>
                  </span>
                )}
              </p>
            </div>
          ) : null}

          {/* Product Coupon */}
          {hasCoupon ? (
            <Box style={{ display: "flex", alignItems: "center" }}>
              {percentageOff ? (
                <Text
                  fontSize="0.7rem"
                  mt="0px"
                  mb="0px"
                  mr="5px"
                  mt="5px"
                  style={{ fontWeight: "bold" }}
                >
                  {percentageOff}%Off
                </Text>
              ) : null}
              <Box
                style={{
                  border: "2px dashed #FDE2D2",
                  borderRadius: "5px",
                  float: "none",
                  display: "block"
                }}
                bg="#FFF8F8"
                mt="9px"
                mb="5px"
                pl="5px"
              >
                <Text fontSize="10px" lineHeight="1.2rem" mt="3px" mb="3px">
                  Use:{" "}
                  <span style={{ color: "#F47121", fontWeight: "bold" }}>
                    {coupon}
                  </span>{" "}
                  to get extra {couponValue}
                </Text>
              </Box>
            </Box>
          ) : (
            <Box
              height="40px"
              style={{ display: `${couponFlag ? "block" : "none"}` }}
            ></Box>
          )}

          {/* Product Delivery */}
          {delivery ? (
            <Text
              ta="left"
              fontSize="11px"
              style={{
                fontWeight: "bold",
                color: "gray"
              }}
              lineHeight="1.3rem"
            >
              {delivery}
            </Text>
          ) : null}

          {/* Product Link */}

          {/* <Link
          to={url}
          style={{
            fontSize: '12px',
            display: 'flex',
            fontWeight: 'bold',
            alignItems: 'center'
          }}
        >
          SHOP NOW
          <img
            style={{
              display: 'inline',
              marginLeft: '-5px',
              height: '10px',
              width: '40px'
            }}
            src={arrowForward}
            alt="Arrow"
          /> */}
        </Link>
      ) : null}
    </Box>
  );
};
CategoryItem.defaultProps = {
  image: "",
  name: "",
  url: "",
  offerPrice: 0,
  maxPrice: 0,
  coupon: "",
  id: 0,
  toDate: "",
  specialPrice: 0,
  percentage: 0,
  fixedValue: 0,
  off: 0
};

CategoryItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  offerPrice: PropTypes.number,
  maxPrice: PropTypes.number,
  coupon: PropTypes.string,
  id: PropTypes.number,
  toDate: PropTypes.string,
  specialPrice: PropTypes.any,
  percentage: PropTypes.any,
  fixedValue: PropTypes.number,
  off: PropTypes.number
};

export default CategoryItem;
