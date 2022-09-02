import React, { Component } from "react";
import Wrapper from "hometown-components-dev/lib/WrapperHtV1";
import BlogComp from "../../components/BlogComp/BlogComp";
import Header from "components/Header";

export default class Blogs extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <BlogComp/>
      </Wrapper>
    );
  }
}
