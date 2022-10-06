import React, { Component } from "react";
import Wrapper from "hometown-components-dev/lib/WrapperHtV1";
import MatressesContainer from "components/Matresses";
import Footer from "components/Footer";
import Header from "components/Header";

export class Matresses extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <MatressesContainer history={this.props.history} />
        <Footer />
      </Wrapper>
    );
  }
}

export default Matresses;
