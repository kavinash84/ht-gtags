import React from "react";

/* ====== Components ====== */
// import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
// import Box from "hometown-components-dev/lib/Div";
// import BoxHtV1 from "hometown-components-dev/lib/Div";
import RowHtV1 from "hometown-components-dev/lib/RowHtV1";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
// import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
// import Heading from "hometown-components-dev/lib/HeadingHtV1";
// import SectionHtV1 from 'hometown-components-dev/lib/Section';

/* ====== Page Components ====== */
// import Title from 'components/Title';
import CategoryBlock from "./CategoryBlock";

// const shopByCat01 = require("../../../static/new-home/shopbycat01.png");
// const shopByCat02 = require("../../../static/new-home/shopbycat02.png");
// const shopByCat03 = require("../../../static/new-home/shopbycat03.png");
// const shopByCat04 = require("../../../static/new-home/shopbycat04.png");
// const shopByCat05 = require("../../../static/new-home/shopbycat05.png");
// const shopByCat06 = require("../../../static/new-home/shopbycat06.png");
// const shopByCat07 = require("../../../static/new-home/shopbycat07.png");
// const shopByCat08 = require("../../../static/new-home/shopbycat08.png");
// const shopByCat09 = require("../../../static/new-home/shopbycat09.png");
// const shopByCat10 = require("../../../static/new-home/shopbycat10.png");
// const shopByCat11 = require("../../../static/new-home/shopbycat11.png");
// const shopByCat12 = require("../../../static/new-home/shopbycat12.png");

const ShopByCategories = ({ shopByCategories }) => {
  return (
    <div
      p="16px 20px"
      mt="40px"
      pb="10px"
      width="100%"
      style={{ float: "none", display: "block" }}
    >
      <HeadingHtV1
        fontFamily="medium"
        fontWeight="bold"
        style={{ textAlign: "center", color: "#323131" }}
        fontSize="35px"
        mt="45px"
        mb="10px"
      >
        {shopByCategories.mainTitle}
      </HeadingHtV1>
      <RowHtV1 justifyContent="center" mx={0} mb={0}></RowHtV1>
      <div
        style={{
          width: "30px",
          borderTop: "2px solid #222222",
          margin: "auto"
        }}
      />
      <RowHtV1
        justifyContent="space-around"
        style={{
          width: "90%",
          margin: "auto 5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end"
        }}
      >
        {/* <CategoryBlock to="/furniture" src={shopByCat01} title="Furniture" />
        <CategoryBlock
          to="/furniture/living-room-furniture/sofas"
          src={shopByCat02}
          title="Sofas"
          style={{ height: " 50px" }}
        />
        <CategoryBlock
          to="/furniture/living-room-furniture/recliners"
          src={shopByCat03}
          title="Recliners"
        />
        <CategoryBlock
          to="/furniture/dining-kitchen-furniture/dining-sets"
          src={shopByCat04}
          title="Dining Sets"
        />
        <CategoryBlock
          to="/furniture/bedroom-furniture/beds"
          src={shopByCat05}
          title="Beds"
        />
        <CategoryBlock
          to="/furniture/bedroom-furniture/wardrobes"
          src={shopByCat06}
          title="Wardrobes"
        />
        <CategoryBlock
          to="/furniture/shoe-racks"
          src={shopByCat07}
          title="Shoe Racks"
        />
        <CategoryBlock
          to="/furniture/book-shelves"
          src={shopByCat08}
          title="Book Shelves"
        />
        <CategoryBlock to="/home-decor" src={shopByCat09} title="Decor" />
        <CategoryBlock to="/tableware" src={shopByCat10} title="Tableware" />
        <CategoryBlock
          to="/home-furnishings"
          src={shopByCat11}
          title="Furnishings"
        />
        <CategoryBlock
          to="/kitchenware"
          src={shopByCat12}
          title="Kitchenware"
        /> */}
        {shopByCategories.categories.map((val, index) => (
          <CategoryBlock
            to={val.url_key}
            src={val.image}
            title={val.title}
            index={index}
          />
        ))}
      </RowHtV1>
    </div>
  );
};

export default ShopByCategories;
