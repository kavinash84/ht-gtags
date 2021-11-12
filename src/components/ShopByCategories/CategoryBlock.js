import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* ====== Components ====== */
import Box from "hometown-components-dev/lib/Div";
// import Flex from 'hometown-components/lib/Flex';
import Text from "hometown-components-dev/lib/Text";
import Image from "hometown-components-dev/lib/Img";

const CategoryBlock = ({ src, title, to }) => (
  <Box style={{ width: "30%", margin: "20px 5px 5px 5px" }}>
    <Link to={to}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          height: "100%"
        }}
        height={96}
        width={1}
        py={0}
      >
        <Image
          src={src}
          alt={title}
          m={5}
          height="auto"
          width="90%"
          style={{ zIndex: 10 }}
        />
        <Box
          mt="-58px"
          style={{
            backgroundColor: "#F2F2F2",
            padding: "30px 44px",
            borderRadius: "5px"
          }}
        />
        <Text fontSize="12px" color="label" mt="5px">
          {title}
        </Text>
      </Box>
    </Link>
  </Box>
);

CategoryBlock.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default CategoryBlock;
