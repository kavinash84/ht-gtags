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
        <div
          style={{ padding: "15px", background: "#fff8f4", color: "#999999" }}
        >
          <GiftingBreadCrumb />
        </div>
        <GiftingComponent />
        <Footer />
      </div>
    );
  }
}
