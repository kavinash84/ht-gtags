import React from "react";
import FlipBook from "../../components/flipBook";
import Helmet from "react-helmet";

const FlipBookContainer = () => (
  <div style={{ margin: "12vh auto", width: "75%" }}>
    <Helmet title="Checkout Festive Home Decor & Furniture Catalog Online | HomeTown">
      <meta
        name="description"
        content="Checkout HomeTown's festive home décor & furniture catalog online with all latest designs. Buy ⭐Furniture ⭐Home Decor Items ⭐Tableware & Kitchenware Items online at 60% - 70% 0FF.
        ✔Warranty ✔Easy Returns ✔Low Cost EMI"
      />
    </Helmet>
    <FlipBook />
  </div>
);

export default FlipBookContainer;
