import React, { Component } from 'react';
import Wrapper from 'hometown-components/lib/Wrapper';
import PlanYourKitchenContainer from 'components/PlanYourKitchen';
// import Header from 'components/ModularKitchenMicro/Header';
// import Footer from 'components/ModularKitchenMicro/Footer';
export default class PlanYourKitchen extends Component {
  render() {
    return (
      <Wrapper>
        {/* <Header /> */}
        <PlanYourKitchenContainer />
        {/* <Footer /> */}
      </Wrapper>
    );
  }
}
