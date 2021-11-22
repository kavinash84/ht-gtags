import React from "react";

/* ====== Components ====== */
import RowHtV1 from "hometown-components-dev/lib/RowHtV1";
// import Box from 'hometown-components/lib/Div';
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";

/* ====== Page Components ====== */
// import Title from 'components/Title';
import CategoryBlock from "./CategoryBlock";

const ShopByCategories = ({ styleYourHome }) => (
  <div style={{ padding: "10px 20px 20px 20px", marginTop: "30px" }}>
    <RowHtV1 justifyContent="center" mx={0}>
      <HeadingHtV1
        fontFamily="medium"
        style={{ textAlign: "center", color: "#323131" }}
        fontSize="30px"
        mt="40px"
        mb="10px"
      >
        {styleYourHome.mainTitle}
      </HeadingHtV1>
    </RowHtV1>
    <div
      style={{
        width: "30px",
        borderTop: "2px solid #222222",
        margin: "auto",
        marginBottom: "10px"
      }}
    />
    <RowHtV1
      justifyContent="center"
      ml="auto"
      mr="auto"
      mt="25px"
      mb="25px"
      style={{ maxWidth: "1400px" }}
    >
      {styleYourHome.data.map((val, index) => (
        <CategoryBlock
          src={val.image}
          to={val.url_key}
          title={val.title}
          index={index}
        />
      ))}
    </RowHtV1>
  </div>
);

export default ShopByCategories;
