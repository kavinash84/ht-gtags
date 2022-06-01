import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* ====== Components ====== */
// import Box from 'hometown-components/lib/Div';
// import Flex from 'hometown-components/lib/FlexHtV1';
import Image from "hometown-components-dev/lib/ImageHtV1";
// import Text from 'hometown-components-dev/lib/TextHtV1';

const CategoryBlock = ({ src, to, title }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      width: "30%"
    }}
  >
    <Link
      to={to}
      onClick={() => {
        sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
      }}
    >
      <div
        style={{
          width: "auto",
          display: "flex",

          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "40px"
        }}
      >
        <Image
          data-src={src}
          alt={title}
          height="auto"
          width="95%"
          // style={{ zIndex: "10" }}
        />

        <div
          style={{
            background: "#F2F2F2",
            padding: "15px 10px",
            width: "50%",
            margin: "-50px 70px 0px",
            position: "relative",
            opacity: "90%",
            textAlign: "center",
            fontSize: "20px",
            color: "black",
            fontWeight: "bold"
          }}
        >
          {title}
        </div>
      </div>
    </Link>
  </div>
);

CategoryBlock.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default CategoryBlock;
