import React, { Component } from "react";
import Helmet from "react-helmet";
import Wrapper from "hometown-components-dev/lib/Wrapper";
import Footer from "components/Footer";
import Header from "components/Header";
import ReviewComponentsContainer from "../../components/Review";

export default class ReviewContainer extends Component {
  render() {
    return (
      <Wrapper>
        <Helmet title="HomeTown Reviews: Checkout Product Reviews & Customers Feedback| HomeTown">
          <meta
            name="description"
            content="HomeTown Reviews: Stand a chance to win a HomeTown voucher of Rs. 5000/- on reviewing your order with us. Checkout various product reviews & feedback. Read more!"
          />
        </Helmet>
        <Header />
        <ReviewComponentsContainer />
        <Footer />
      </Wrapper>
    );
  }
}
