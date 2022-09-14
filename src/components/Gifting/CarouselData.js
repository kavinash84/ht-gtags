import React, { Component } from "react";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { Link } from "react-router-dom";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";

const styles = require("./style.scss");

export class CarouselData extends Component {
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
    const { index, elem } = this.props;

    return (
      <Div
        key={index}
        p="2rem"
        pl="1rem"
        pr="1rem"
        pb="1rem"
        className={styles.cardContainer}
      >
        <Link to={elem.link} onClick={this.handleClick}>
          <Div
            className={styles.card}
            style={{
              paddingBottom: "1rem",
              boxShadow: "0px 0px 10px 6px #00000029"
            }}
          >
            <Image
              data-src={elem.image}
              alt={elem.title}
              src={`${elem.image}?blur=30`}
            />
            <Div pl="10px" className={styles.cardTitle}>
              <p
                fontSize="19px"
                color="#666666"
                ta="left"
                mb="0px"
                className={styles.title}
              >
                {elem.title}
              </p>
              <p className={styles.shopNow}>SHOP NOW</p>
            </Div>
          </Div>
        </Link>
      </Div>
    );
  }
}

export default CarouselData;
