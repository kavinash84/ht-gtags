import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";

@connect(({ spaces }) => ({
  spaces,
  kidsCollection: spaces.data.items.text.kidsCollection
}))
export default class KidsCollection extends Component {
  render() {
    const { kidsCollection } = this.props;
    return (
      <Div width="100%" height="auto" bg="#FFF8F4" mt="40px">
        <Div mb="20px" mt="35px">
          <Heading
            mb="20px"
            mt="100px"
            fontSize="35px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium",
              paddingTop: "60px"
            }}
          >
            {kidsCollection.title}
          </Heading>
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto"
            }}
          />
        </Div>
        <Link
          to={kidsCollection.url_key}
          onClick={() => {
            sessionStorage.setItem("SpacesScrollPosition", window.pageYOffset);
          }}
        >
          <Div mt="10px" pb="50px" style={{ width: "80%", marginLeft: "10%" }}>
            <Image src={kidsCollection.image} alt="kids" />
          </Div>
        </Link>
      </Div>
    );
  }
}
