import React, { Component } from "react";
import { Link } from "react-router-dom";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";

export class MattressesForEveryone extends Component {
  componentDidMount() {
    this.handleScrollPosition();
  }

  handleScrollPosition = () => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      setTimeout(function() {
        sessionStorage.removeItem("scrollPosition");
      }, 1000);
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
          mr="0px"
          ml="0px"
          mt="2rem"
          style={{
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {data.collection.length
            ? data.collection.map((row, index) => (
                <Link
                  to={row.link || "/"}
                  style={{ width: "20%", marginRight: "10px" }}
                  onClick={this.handleClick}
                >
                  <Div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <Image src={row.image} alt={row.name} width="100%" />
                    <Text fontSize="1rem" color="#17245B" mt="5px">
                      {row.name}
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

export default MattressesForEveryone;
