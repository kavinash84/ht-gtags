import React, { Component } from "react";
import GiftingComponent from "components/Gifting";
import Header from "components/Header";
import Footer from "components/Footer";
import GiftingBreadCrumb from "components/Gifting/giftingBreadcrumb";

export default class Gifting extends Component {
  render() {
    return (
      <div>
        <Header />
        <GiftingBreadCrumb />
        <GiftingComponent />
        <Footer />
      </div>
    );
  }
}
