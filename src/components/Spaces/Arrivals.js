import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";

@connect(({ spaces }) => ({
  spaces,
  newArrivals: spaces.data.items.text.newArrivals
}))
export default class Arrivals extends Component {
  // componentDidMount() {
  //   this.handleScrollPosition();
  // }

  // handleScrollPosition = () => {
  //   const scrollPosition = sessionStorage.getItem('HiscrollPosition');
  //   if (scrollPosition) {
  //     window.scrollTo(0, parseInt(scrollPosition));
  //     setTimeout(function() {
  //       sessionStorage.removeItem('HiscrollPosition');
  //     }, 2000);
  //   }
  // };

  render() {
    const { newArrivals } = this.props;
    return (
      <Div>
        <Div mb="25px" mt="50px">
          <Heading
            mb="20px"
            mt="100px"
            fontSize="35px"
            style={{
              textAlign: "center",
              color: "#222222",
              fontFamily: "medium"
            }}
          >
            {newArrivals.title}
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
          to={newArrivals.url_key}
          onClick={() => {
            sessionStorage.setItem("SpacesScrollPosition", window.pageYOffset);
          }}
        >
          <Div style={{ width: "80%", marginLeft: "10%" }}>
            <Image src={newArrivals.image} alt="arrival" />
          </Div>
        </Link>
      </Div>
    );
  }
}
