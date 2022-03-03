import React, { Component } from "react";
import PropTypes from "prop-types";
import Wrapper from 'hometown-components-dev/lib/WrapperHtV1';
import PackageCatalog from "../../components/PackageCatalog";
import { setCurrentPackage } from "../../redux/modules/lackpackages";
import Header from "components/Header";

export default class PackageCatlogContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      match: {
        params: { packageid }
      }
    } = this.props;
    if (packageid) {
      const { dispatch } = this.context.store;
      dispatch(setCurrentPackage(packageid));
    }
  }
  render() {
    const { history } = this.props;
    return (
      <Wrapper>
      <Header />
        <PackageCatalog history={history} />
      </Wrapper>
    );
  }
}
