import React, { Component } from "react";
import { Link } from "react-router-dom";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";

export class OrthopedicMattresses extends Component {
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("scrollPosition");
      }, 500);
    }
  };

  handleClick = () => {
    sessionStorage.setItem("scrollPosition", window.pageYOffset);
  };

  render() {
    const { data } = this.props;
    return (
      <Div mt="2rem" style={{ padding: "2% 0%" }}>
        <Link
          to={data.link}
          onClick={this.handleClick}
          style={{ position: "relative" }}
        >
          <Image src={data.image} alt={data.title} width="100%" />
          <Div
            style={{
              position: "absolute",
              width: "100%",
              bottom: "-2rem"
            }}
          >
            <Text
              color="#FFFFFF"
              fontSize="1rem"
              m=" 0px auto"
              style={{
                width: "55%",
                backgroundColor: "#69878B",
                fontWeight: "bold",
                textAlign: "center",
                padding: "15px"
              }}
            >
              {data.title}
            </Text>
          </Div>
        </Link>
      </Div>
    );
  }
}

export default OrthopedicMattresses;
