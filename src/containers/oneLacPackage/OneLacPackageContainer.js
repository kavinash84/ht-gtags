import React, { Component } from "react";
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import OneLacPackage from "components/OneLacPackage";
import Header from "components/OneLacPackage/Header";

export default class OneLacPackageContainer extends Component {
  render() {
    const { history } = this.props;
    return (
      <Wrapper>
       <Header />
        <OneLacPackage history={history} />
      </Wrapper>
    );
  }
}
