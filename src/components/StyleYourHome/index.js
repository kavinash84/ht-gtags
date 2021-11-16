import React from "react";

/* ====== Components ====== */
import RowHtV1 from "hometown-components-dev/lib/RowHtV1";
// import Box from 'hometown-components/lib/Div';
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";

/* ====== Page Components ====== */
// import Title from 'components/Title';
import CategoryBlock from "./CategoryBlock";

const styleYourHome01 = require("../../../static/new-home/StyleYourHome01.png");
const styleYourHome02 = require("../../../static/new-home/StyleYourHome02.png");
const styleYourHome03 = require("../../../static/new-home/StyleYourHome03.png");
const styleYourHome04 = require("../../../static/new-home/StyleYourHome04.png");
const styleYourHome05 = require("../../../static/new-home/StyleYourHome05.png");
const styleYourHome06 = require("../../../static/new-home/StyleYourHome06.png");
const styleYourHome07 = require("../../../static/new-home/StyleYourHome07.png");
const styleYourHome08 = require("../../../static/new-home/StyleYourHome08.png");
const styleYourHome09 = require("../../../static/new-home/StyleYourHome09.png");
const styleYourHome10 = require("../../../static/new-home/StyleYourHome10.png");
const styleYourHome11 = require("../../../static/new-home/StyleYourHome11.png");
const styleYourHome12 = require("../../../static/new-home/StyleYourHome12.png");

const ShopByCategories = () => (
  <div style={{ padding: "10px 20px 20px 20px", marginTop: "30px" }}>
    <RowHtV1 justifyContent="center" mx={0}>
      <HeadingHtV1
        fontFamily="medium"
        style={{ textAlign: "center", color: "#323131" }}
        fontSize="30px"
        mt="40px"
        mb="10px"
      >
        Style Your Home
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
      ml="-5px"
      mr="-5px"
      mt="25px"
      style={{ maxWidth: "1400px" }}
    >
      <CategoryBlock
        to="/home-decor/vases-flowers"
        src={styleYourHome01}
        title="Vases"
      />
      <CategoryBlock
        to="/home-decor/idols-figurines/figurines"
        src={styleYourHome02}
        title="Figurines"
      />
      <CategoryBlock
        to="/home-decor/fountains"
        src={styleYourHome03}
        title="Fountains"
      />
      <CategoryBlock
        to="/home-decor/garden"
        src={styleYourHome04}
        title="Garden"
      />
      <CategoryBlock
        to="/home-furnishings/covers-inserts"
        src={styleYourHome05}
        title="Cushions"
      />
      <CategoryBlock
        to="/home-furnishings/curtains"
        src={styleYourHome06}
        title="Curtains"
      />
      <CategoryBlock
        to="/home-furnishings/bedding"
        src={styleYourHome07}
        title="Bedding"
      />
      <CategoryBlock
        to="/home-furnishings/pillows"
        src={styleYourHome08}
        title="Pillows"
      />
      <CategoryBlock
        to="/tableware/crockery"
        src={styleYourHome09}
        title="Crockery"
      />
      <CategoryBlock
        to="/tableware/drinkware"
        src={styleYourHome10}
        title="Drinkware"
      />
      <CategoryBlock
        to="/kitchenware/cookware"
        src={styleYourHome11}
        title="Cookware"
      />
      <CategoryBlock
        to="/kitchenware/food-storage/containers"
        src={styleYourHome12}
        title="Containers"
      />
    </RowHtV1>
  </div>
);

export default ShopByCategories;
