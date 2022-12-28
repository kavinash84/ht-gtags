import React from "react";

/* ====== Components ====== */";
import RowHtV1 from "hometown-components-dev/lib/RowHtV1";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";

/* ====== Page Components ====== */
// import Title from 'components/Title';
import CategoryBlock from "./CategoryBlock";


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
