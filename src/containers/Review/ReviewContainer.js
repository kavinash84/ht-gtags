import React, { Component } from "react";
import Wrapper from "hometown-components-dev/lib/Wrapper";
import Footer from "components/Footer";
import Header from "components/Header";
import ReviewComponentsContainer from "../../components/Review";

export default class ReviewContainer extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <ReviewComponentsContainer />
        <Footer />
      </Wrapper>
    );
  }
}
