import React, { Component } from "react";
import Wrapper from "hometown-components-dev/lib/Wrapper";
import Footer from "components/Footer";
import Header from "components/Header";
import WriteReview from "../../components/Review/writeReview";

export default class WriteReviewContainer extends Component {
  render() {
    return (
      <Wrapper>
        {/* <Header /> */}
        <WriteReview />
        {/* <Footer /> */}
      </Wrapper>
    );
  }
}
