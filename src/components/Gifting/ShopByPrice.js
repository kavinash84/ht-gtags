import React, { Component } from "react";
import { Link } from "react-router-dom";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

const styles = require("./style.scss");

export class ShopByPrice extends Component {
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
    const { shopByPrice } = this.props;
    return (
      <Div className={styles.shopByPrice} mt="1rem" pt="1rem" pb="2rem">
        <div className={styles.titleCard}>
          <div>
            <p>{shopByPrice.title}</p>
            <div
              style={{
                width: "30px",
                borderTop: "2px solid #323131",
                margin: "auto"
              }}
            ></div>
          </div>
        </div>
        <div className={styles.priceCardsContainer}>
          {shopByPrice.texts.map(item => (
            <Link
              to={item.link}
              onClick={this.handleClick}
              style={{ width: "30%" }}
            >
              <Div className={styles.priceBlock}>
                <Text
                  ta="center"
                  fontSize="14px"
                  mb="5px"
                  color="#323131"
                  style={{ fontWeight: "bold" }}
                >
                  {shopByPrice.description}
                </Text>
                <Text
                  ta="center"
                  fontSize="14px"
                  mt="0px"
                  color="#323131"
                  style={{ fontWeight: "bold" }}
                >
                  {item.value}
                </Text>
              </Div>
            </Link>
          ))}
        </div>
      </Div>
    );
  }
}

export default ShopByPrice;
