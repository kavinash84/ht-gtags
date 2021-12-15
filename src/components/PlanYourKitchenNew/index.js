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
    ...services.planyourkitchen
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

  handleModalWithSave = () => {
    this.setState({
      openModal: false
    });
    setTimeout(() => {
      this.setState({
        open: true
      });
    }, 500);
  };

  handleScript = () => {
    this.setState({
      showScript: true
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
              handleModalWithSave={this.handleModalWithSave}
              handleScript={this.handleScript}
            />
          </ResponsiveModal>
          <Div>
            {!loading && loaded ? (
              <ResponsiveModal
                classNames={{ modal: "modularKitchenModel" }}
                onCloseModal={() => this.setState({ open: false })}
                open={this.state.open}
              >
                <Div style={{ width: "100%" }}>
                  <Flex>
                    <img
                      src="https://www.hometown.in/media/cms/D/Top-Image-Living1.jpg"
                      style={{
                        width: "50%",
                        height: "90vh",
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px"
                      }}
                    />
                    <Div
                      style={{
                        width: "50%",
                        height: "90vh",
                        backgroundColor: "#FBF2ED",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px"
                      }}
                    >
                      <Div p="20px 5px" mt="20px">
                        <Div>
                          <Heading
                            mb="15px"
                            mt="40%"
                            color="#000000"
                            fontSize="18px"
                            fontFamily="medium"
                            style={{
                              whiteSpace: "normal",
                              textAlign: "center",
                              lineHeight: "30px"
                            }}
                          >
                            Thank You For Your <br /> Interest, Our Team Will
                            Get In Touch <br /> With You Shortly
                          </Heading>
                        </Div>
                        <img
                          src={check}
                          style={{
                            width: "60px",
                            height: "60x",
                            margin: "30px auto",
                            display: "block"
                          }}
                        />
                      </Div>
                    </Div>
                  </Flex>
                </Div>
              </ResponsiveModal>
            ) : null}
          </Div>
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
