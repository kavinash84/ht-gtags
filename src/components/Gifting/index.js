import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import GiftingCarousel from "./GiftingCarousel";
import ShopByPrice from "./ShopByPrice";
import OurTopGiftPicks from "./OurTopGiftPicks";
import GiftsByOccasionTwo from "./GiftsByOccasionTwo";
import GiftsByCategory from "./GiftsByCategory";

const styles = require("./style.scss");

@connect(({ gifting }) => ({
  giftingData: gifting.data.items.text
}))
export default class Gifting extends Component {
  render() {
    const { giftingData } = this.props;
    const {
      topBanner,
      giftsByOccasion,
      giftsByRecipient,
      shopByPrice,
      ourTopGiftPicks,
      giftsByOccasionTwo,
      giftsByCategory
    } = giftingData;
    return (
      <div className={styles.giftingComp}>
        <Div className={styles.topBanner}>
          <Image src={topBanner.image} />
        </Div>
        <div className={styles.carouselbg}>
          <Div className={styles.carousel}>
            <GiftingCarousel
              categoryName={giftsByOccasion.title}
              data={giftsByOccasion}
              onClick={this.handleClick}
            />
          </Div>
          <Div className={styles.carousel}>
            <GiftingCarousel
              categoryName={giftsByRecipient.title}
              data={giftsByRecipient}
              onClick={this.handleClick}
            />
          </Div>
        </div>
        <div className={styles.shopByPriceBg}>
          <ShopByPrice shopByPrice={shopByPrice} />
        </div>
        <div>
          <OurTopGiftPicks OurTopGiftPicks={ourTopGiftPicks} />
        </div>
        <div>
          <GiftsByOccasionTwo giftsByOccasionTwo={giftsByOccasionTwo} />
        </div>
        <div>
          <GiftsByCategory giftsByCategory={giftsByCategory} />
        </div>
      </div>
    );
  }
}

// export default index;
