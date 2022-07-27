import React, { Component } from "react";
import Wrapper from "hometown-components-dev/lib/WrapperHtV1";
import Header from "components/Header";

export default class Blog extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <h2>Blog</h2>
      </Wrapper>
    );
  }
}
