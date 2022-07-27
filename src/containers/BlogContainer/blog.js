import React, { Component } from "react";
import Wrapper from "hometown-components-dev/lib/WrapperHtV1";
import Header from "components/Header";
import PostComp from "../../components/BlogComp/PostComp";

export default class Blog extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <PostComp />
      </Wrapper>
    );
  }
}
