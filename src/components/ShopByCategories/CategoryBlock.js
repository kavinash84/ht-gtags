import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* ====== Components ====== */
// import BoxHtV1 from "hometown-components-dev/lib/Div";
// import Flex from 'hometown-components/lib/Flex';
import TextHtV1 from "hometown-components-dev/lib/TextHtV1";
import Img from "hometown-components-dev/lib/Img";

const CategoryBlock = ({ src, title, to }) => {
  return (
    <div style={{ width: "14%", margin: "20px 5px 5px 5px" }}>
      <Link to={to}>
        <div
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
          <Img
            border="none"
            src={src}
            alt={title}
            m={5}
            height="auto"
            width="90%"
            style={{ zIndex: 10 }}
          />
          <div
            mt="-58px"
            style={{
              backgroundColor: "#F2F2F2",
              position: "relative",
              top: "-115px",
              padding: "28% 50%",
              borderRadius: "5px"
            }}
          />
          <TextHtV1 fontSize="18px" color="label" mt="-95px">
            {title}
          </TextHtV1>
        </div>
      </Link>
    </div>
  );
};

CategoryBlock.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default CategoryBlock;
