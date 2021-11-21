import React, { Component } from "react";

import ShopGiftsByPriceCards from "./ShopGiftsByPrice";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";
const LeftArrow = require("../../../static/new-home/leftArrow.svg");
const RightArrow = require("../../../static/new-home/rightArrow.svg");
class ShopGiftsByPrice extends Component {
  render() {
    const { shopGiftByPrice } = this.props;
    return (
      <div>
        <HeadingHtV1
          fontFamily="medium"
          style={{ textAlign: "center", color: "#323131" }}
          fontSize="30px"
          mt="50px"
        >
          {shopGiftByPrice.mainTitle}
        </HeadingHtV1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <img src={LeftArrow} />
          {shopGiftByPrice.items.map(val => (
            <ShopGiftsByPriceCards
              src={val.image}
              title={val.title}
              button="SHOP NOW"
            />
          ))}
          <img src={RightArrow} />
        </div>
      </div>
    );
  }
}

export default ShopGiftsByPrice;
