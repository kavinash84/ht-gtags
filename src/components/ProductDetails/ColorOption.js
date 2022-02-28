import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import ImageShimmer from "hometown-components-dev/lib/ImageShimmerHtV1";

const urlName = name =>
  name
    .split(" ")
    .join("-")
    .toLowerCase();

const ColorOption = ({
  data,
  toggleShowMoreColorProducts,
  showmorecolorproducts,
  showmorecolorproductsCount
}) => (
  <Box>
    <Row active={!showmorecolorproducts} maxHeight={150} overflow="auto" mx={0}>
      {data.map((item, index) => {
        return (
          <Col height={40} width={40} px={0} mr={10} mb={10}>
            <Link
              to={`/${urlName(item.meta.name)}/sku/${
                item.groupedattributes.sku
              }`}
              key={String(index)}
            >
              <ImageShimmer src={`${item.swatch_image}`} height={40}>
                {imageURL => (
                  <img
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "20px",
                      border: item.activeColor ? "50px" : "40px"
                    }}
                    src={imageURL}
                    alt={item.meta.name}
                    width={40}
                    height={40}
                  />
                )}
              </ImageShimmer>
            </Link>
          </Col>
        );
      })}
    </Row>
  </Box>
);
ColorOption.defaultProps = {
  showmorecolorproducts: true,
  toggleShowMoreColorProducts: () => {}
};
ColorOption.propTypes = {
  data: PropTypes.array.isRequired,
  showmorecolorproducts: PropTypes.bool,
  toggleShowMoreColorProducts: PropTypes.func,
  showmorecolorproductsCount: PropTypes.string.isRequired
};

export default ColorOption;
