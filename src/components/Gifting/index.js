import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "hometown-components/lib/Buttons";
import Img from "hometown-components/lib/Img";
import Div from "hometown-components/lib/Div";
import Heading from "hometown-components/lib/Heading";
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
      <div>
        <div>
          <Div className={styles.topBanner}>
            <Img src={topBanner.image} />
            <Heading
              className={styles.topbannerText}
              style={{
                position: "absolute",
                top: "50%",
                fontSize: "50px",
                textAlign: "center",
                width: "100%",
                color: "#ffffff",
                padding: "0px 3.5rem",
                whiteSpace: "normal",
                lineHeight: "45px",
                height: "100px",
                textShadow: "0px 3px 6px #00000098"
              }}
            >
              {topBanner.title}
            </Heading>
            {topBanner.link ? (
              <Link to={topBanner.link}>
                <Button
                  className={styles.topbannerBtn}
                  style={{
                    display: "block",
                    position: "absolute",
                    top: "80%",
                    backgroundColor: "white",
                    left: "50%",
                    transform: "translate(-50%, 0%)",
                    color: "black",
                    padding: "5px 2.1rem",
                    fontWeight: "bold",
                    fontSize: "0.9rem"
                  }}
                >
                  SHOP NOW
                </Button>
              </Link>
            ) : null}
          </Div>
        </div>
        <div className={styles.carouselbg}>
          <Div className={styles.carousel}>
            <GiftingCarousel
              categoryName={giftsByOccasion.title}
              data={giftsByOccasion}
              onClick={this.handleClick}
            />
          </Div>
          {/* <Div className={styles.carousel}>
                        <GiftingCarousel categoryName={giftsByRecipient.title} data={giftsByRecipient} onClick={this.handleClick}/>
                    </Div> */}
        </div>
        <div>
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
