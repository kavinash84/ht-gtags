import React, { Component } from "react";
import Header from "../ModularKitchenNew/Header";
import TopBanner from "./TopBanner";
import StepsToPlanYourKitchen from "./PlanYourKitchen";
// @connect(
//   ({ services, planyourkitchen, userLogin, profile }) => ({
//     planyourkitchen,
//     ...services.planyourkitchen
//   }),
//   { sendFormData: sendData, loadPincodeDetails: getData }
// )
class PlanYourKitchenNewContainer extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <TopBanner />
        <StepsToPlanYourKitchen />
      </div>
    );
  }
}

export default PlanYourKitchenNewContainer;

// const PlanYourKitchen = () => (
//   <div type="block">PlanYourKitchen Page Is Under Development</div>
// );

// export default PlanYourKitchen;
