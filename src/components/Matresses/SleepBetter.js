import React, { Component } from "react";
import { Link } from "react-router-dom";
import Row from "hometown-components-dev/lib/RowHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";

export class SleepBetter extends Component {
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
      <Div
        mt="2rem"
        style={{
          backgroundColor: "#F3EFE7",
          padding: "0% 7%"
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            padding: "25px"
          }}
        >
          {data.title}
        </div>
        <Row
          mr="0px"
          ml="0px"
          mt="1rem"
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          {data.collection.length
            ? data.collection.map((row, index) => (
                <Link
                  to={row.link1}
                  style={{ width: "30%" }}
                  onClick={this.handleClick}
                >
                  <Div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <Image src={row.image1} alt={row.name1} width="100%" />
                    <Text
                      fontSize="1rem"
                      color="#323231"
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        width: "98%",
                        overflow: "hidden",
                        textAlign: "center",
                        padding: "15px"
                      }}
                    >
                      {row.name1}
                    </Text>
                  </Div>
                </Link>
              ))
            : null}
        </Row>
      </Div>
    );
  }
}

export default SleepBetter;
