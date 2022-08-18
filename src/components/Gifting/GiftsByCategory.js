import React, { Component } from "react";
import { Link } from "react-router-dom";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

const styles = require("./style.scss");

export class GiftsByCategory extends Component {
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
    const { giftsByCategory } = this.props;
    return (
      <Div className={styles.giftsByCategoryContainer} mt="2rem">
        <div className={styles.titleCard}>
          <div>
            <p>{giftsByCategory.title}</p>
            <div
              style={{
                width: "30px",
                borderTop: "2px solid #323131",
                margin: "auto"
              }}
            ></div>
          </div>
        </div>
        <Div className={styles.giftsByCategory} p="0px 0.5rem" mt="1.5rem">
          {giftsByCategory.data.map(item => (
            <Link
              to={item.link}
              onClick={this.handleClick}
              style={{ width: "23%" }}
            >
              <Div p="0.5rem" style={{ width: "100%", textAlign: "center" }}>
                <Image data-src={item.image} alt={item.title} />
                <Text ta="center" fontSize="16px" color="#222222" mt="5px">
                  {item.title}
                </Text>
              </Div>
            </Link>
          ))}
        </Div>
      </Div>
    );
  }
}

export default GiftsByCategory;
