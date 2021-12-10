import React, { Component } from "react";
import Header from "./Header";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import { connect } from "react-redux";
import HomeTownAdvantage from "./HomeTownAdvantage";
import TopBanner from "./TopBanner";
import RoomsWeTransform from "./RoomsTransform";
import KitchenLayout from "./KitchenLayout";
import KitchenExperts from "./KitchenExperts";
import SeeAndExperience from "./SeeAndExperience";
import ResponsiveModal from "components/Modal";
import KitchenBlog from "./KitchenBlog";
import CustomerStories from "./CustomerStories/CustomerStories";
import MakeItYourOwn from "./MakeItYourOwn";
import DreamKitchen from "./DreamKitchen";
import OurPartners from "./OurPartners";
import Div from "hometown-components-dev/lib/BoxHtV1";
import ModularKitchenFormModal from "./ ModularKitchenFormModal";
import FourSteps from "./FourSteps";
import { allowNChar, allowTypeOf } from "utils/helper";
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from "helpers/apiUrls";
import { sendData, getData } from "redux/modules/services";
import StepsToYourHome from "./StepsToHome";
const check = require("../../../static/newHomePage/check.svg");
@connect(
  ({ services, modularkitchen, userLogin, profile }) => ({
    modularkitchen,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class ModularKitchenNewContainer extends React.Component {
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
    const { whyChooseUs, isLoggedIn, fullName, loading, loaded } = this.props;
    const { showScript } = this.state;
    return (
      <div>
        <Header handleModal={this.handleModal} />
        <TopBanner handleModal={this.handleModal} />
        <HomeTownAdvantage />
        <RoomsWeTransform />
        <FourSteps />
        <KitchenLayout />
        <KitchenExperts />
        <SeeAndExperience handleModal={this.handleModal} />
        <KitchenBlog />
        <CustomerStories />
        <MakeItYourOwn handleModal={this.handleModal} />
        <DreamKitchen handleModal={this.handleModal} />
        <OurPartners />

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

export default ModularKitchenNewContainer;
