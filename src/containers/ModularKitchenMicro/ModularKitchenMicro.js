import React, { Component } from 'react';
import Wrapper from 'hometown-components/lib/Wrapper';
import ModularKitchenMicroContainer from 'components/ModularKitchenMicro';
// import Header from 'components/ModularKitchenMicro/Header';
// import Footer from 'components/ModularKitchenMicro/Footer';

export default class ModularKitchenMicro extends Component {
  render() {
    return (
      <Wrapper>
        {/* <Header /> */}
        <ModularKitchenMicroContainer />
        {/* <Footer /> */}
      </Wrapper>
    );
  }
}
