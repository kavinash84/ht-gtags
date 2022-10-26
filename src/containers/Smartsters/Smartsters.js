import React, { Component } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import SmartstersContainer from "../../components/Smartsters";


class Smartsters extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <SmartstersContainer />
        <Footer />
      </div>
    );
  }
}

export default Smartsters;
