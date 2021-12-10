import React from "react";
import ModularKitchenNewContainer from "../../components/ModularKitchenNew";
import Footer from "../../components/Footer";
// import { connect } from "react-redux";
class ModularKitchenNew extends React.Component {
  render() {
    return (
      <div>
        <ModularKitchenNewContainer />
        <Footer />
      </div>
    );
  }
}

export default ModularKitchenNew;
