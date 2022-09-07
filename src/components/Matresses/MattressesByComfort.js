import React, { Component } from "react";
import { Link } from "react-router-dom";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
export class MattressesByComfort extends Component {
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
      <Div mt="2rem" style={{ padding: "2% 7%" }}>
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            padding: "30x"
          }}
        >
          {data.title}
        </div>
        <Row
          mt="2rem"
          style={{
            justifyContent: "center"
          }}
        >
          {data.values.map((elem, index) => (
            <Link
              to={elem.link}
              style={{ margin: "0px 0.5rem", width: "17%" }}
              onClick={this.handleClick}
            >
              <Div style={{ width: "100%" }}>
                <Div
                  key={index}
                  p="1rem"
                  style={{ backgroundColor: "#F3EFE7", width: "100%" }}
                >
                  <Image src={elem.image} alt={elem.title} width="100%" />
                </Div>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    color: "#17245B",
                    fontSize: "16px"
                  }}
                >
                  {elem.title}
                </Text>
              </Div>
            </Link>
          ))}
        </Row>
      </Div>
    );
  }
}

export default MattressesByComfort;
