import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import GiftingCarouselTwo from "./GiftingCarouselTwo";

const styles = require("./style.scss");

export class GiftsByOccasionTwo extends Component {
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("scrollPosition");
      }, 2000);
    }
  };

  handleClick = () => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);
  };

  render() {
    const { giftsByOccasionTwo } = this.props;

    return (
      <Div className={styles.giftsByOccasionTwo} mt="1.5rem">
        <div className={styles.titleCard}>
          <div>
            <p>{giftsByOccasionTwo.title}</p>
            <div
              style={{
                width: "30px",
                borderTop: "2px solid #323131",
                margin: "auto"
              }}
            ></div>
          </div>
        </div>
        <div className={styles.carouselbg}>
          <Div className={styles.carousel}>
            {giftsByOccasionTwo.data.map((data, index) => (
              <div key={index}>
                <GiftingCarouselTwo
                  categoryName={data.title}
                  data={data.images}
                  link={data.link}
                  onClick={this.handleClick}
                />
              </div>
            ))}
          </Div>
        </div>
      </Div>
    );
  }
}

export default GiftsByOccasionTwo;
