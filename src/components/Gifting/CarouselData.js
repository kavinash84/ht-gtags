import React, { Component } from "react";
import Div from "hometown-components/lib/Div";
import { Link } from "react-router-dom";
import Img from "hometown-components/lib/Img";
import Heading from "hometown-components/lib/Heading";

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
      <div>
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
              <Img data-src={elem.image} alt={elem.title} />
              <Div pl="10px">
                <Heading fontSize="19px" color="#666666" ta="left" mb="0px">
                  {elem.title}
                </Heading>
                {/* <Text color="#888888" fontSize="12px">
                                    {elem.description}
                                </Text> */}
                {/* <Link to={elem.link} onClick={onClick}>
                                    <Text ta="left" mb="0px" mt="0px" className={styles.shopNow} style={{
                                        color: 'orangered',
                                        fontWeight: 'bold',
                                        textAlign: 'left'
                                    }}>
                                    Shop now
                                    </Text>
                                </Link> */}
              </Div>
            </Div>
          </Link>
        </Div>
      </div>
    );
  }
}

export default CarouselData;
