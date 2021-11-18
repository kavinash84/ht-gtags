import React, { Component } from "react";

import ShopGiftsByPriceCards from "./ShopGiftsByPrice";
import HeadingHtV1 from "hometown-components-dev/lib/HeadingHtV1";

const ShopGiftByPrice01 = require("../../../static/new-home/shopgiftbyprice01.png");
const ShopGiftByPrice02 = require("../../../static/new-home/shopgiftbyprice02.png");
const ShopGiftByPrice03 = require("../../../static/new-home/shopgiftbyprice03.png");
const ShopGiftByPrice04 = require("../../../static/new-home/shopgiftbyprice04.png");

class ShopGiftsByPrice extends Component {
  render() {
    return (
      <div>
        <HeadingHtV1
          fontFamily="medium"
          style={{ textAlign: "center", color: "#323131" }}
          fontSize="30px"
          mt="50px"
        >
          Shop Gifts By Price
        </HeadingHtV1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ShopGiftsByPriceCards
            src={ShopGiftByPrice01}
            title="Gifts Under Rs.99"
            button="SHOP NOW"
          />
          <ShopGiftsByPriceCards
            src={ShopGiftByPrice02}
            title="Gifts Under Rs.99"
            button="SHOP NOW"
          />
          <ShopGiftsByPriceCards
            src={ShopGiftByPrice03}
            title="Gifts Under Rs.99"
            button="SHOP NOW"
          />
          <ShopGiftsByPriceCards
            src={ShopGiftByPrice04}
            title="Gifts Under Rs.99"
            button="SHOP NOW"
          />
        </div>
      </div>
    );
  }
}

export default ShopGiftsByPrice;
