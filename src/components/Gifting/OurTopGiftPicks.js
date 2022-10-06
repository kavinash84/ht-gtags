import React, { Component } from "react";
import { Link } from "react-router-dom";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";

const styles = require("./style.scss");

export class OurTopGiftPicks extends Component {
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
    const { OurTopGiftPicks } = this.props;
    return (
      <Div className={styles.OurTopGiftPicks} mt="2rem">
        <div className={styles.titleCard}>
          <div>
            <p>{OurTopGiftPicks.title}</p>
            <div
              style={{
                width: "30px",
                borderTop: "2px solid #323131",
                margin: "auto"
              }}
            ></div>
          </div>
        </div>
        {OurTopGiftPicks.data.map((img, index) => (
          <Div key={index} mt={index === 0 ? "1rem" : "2.5rem"}>
            <Link to={img.link} onClick={this.handleClick}>
              <Image data-src={img.image} alt="Top Gift Picks" src={`${img.image}?blur=30`} />
            </Link>
          </Div>
        ))}
      </Div>
    );
  }
}

export default OurTopGiftPicks;
