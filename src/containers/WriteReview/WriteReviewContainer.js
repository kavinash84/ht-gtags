import React, { Component } from "react";
import Wrapper from "hometown-components/lib/Wrapper";
import Footer from "components/Footer";
import WriteReview from "../../components/Review/writeReview";

export default class WriteReviewContainer extends Component {
  render() {
    return (
      <Wrapper>
        <WriteReview />
        <Footer />
      </Wrapper>
    );
  }
}
