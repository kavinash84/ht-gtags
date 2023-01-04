import React, { Component } from "react";
import Header from "./Header";
import Helmet from "react-helmet";
import TopBanner from "./TopBanner";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import StepsToPlanYourKitchen from "./PlanYourKitchen";
import ModularKitchenFormModal from "./ ModularKitchenFormModal";
import { connect } from "react-redux";
import ResponsiveModal from "components/Modal";
import Div from "hometown-components-dev/lib/BoxHtV1";
import { sendData, getData } from "redux/modules/services";
const check = require("../../../static/new-home/check.svg");
@connect(
  ({ services, planyourkitchen, userLogin, profile }) => ({
    planyourkitchen,
    pktopBanner: planyourkitchen.data.items.text.pktopBanner,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class PlanYourKitchenNewContainer extends React.Component {
  state = {
    openModal: false,
    open: false,
    showScript: false
  };
  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  render() {
    const {
      whyChooseUs,
      isLoggedIn,
      fullName,
      loading,
      loaded,
      pktopBanner
    } = this.props;
    const { showScript } = this.state;
    return (
      <div>
        <Helmet title={pktopBanner.title}>
          <meta
            name="description"
            content="HomeTown - Shop online for Furniture, Home Decor, Furnishings, Kitchenware, Dining Products at best prices from HomeTown.in. Get best furniture and home decor products ☆Upto 40% Off, ☆Fast Shipping, ☆High Quality, ☆Premium, ☆Luxury furniture to beautify your ☆bedroom, ☆kitchen, ☆dining room, ☆living and ☆outdoor space ☆Original ☆0% EMI ☆Free Assembly ☆Safe Shipping."
          />
        </Helmet>
        <Header handleModal={this.handleModal} />
        <TopBanner />
        <StepsToPlanYourKitchen />
        <Section p="0" mb="0">
          <ResponsiveModal
            classNames={{ modal: "modularKitchenModel" }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
            style={{ padding: "0rem" }}
          >
            <ModularKitchenFormModal
            />
          </ResponsiveModal>
        
        </Section>
      </div>
    );
  }
}

export default PlanYourKitchenNewContainer;

// const PlanYourKitchen = () => (
//   <div type="block">PlanYourKitchen Page Is Under Development</div>
// );

// export default PlanYourKitchen;
