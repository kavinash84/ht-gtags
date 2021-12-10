import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import Header from "./Header";
import TopBanner from "./TopBanner";
import ServicesWeOffer from "./ServicesWeOffer";
import DesignByStyle from "./DesignByStyle/DesignByStyle";
import SpacesWeDesign from "./Spaces";
// import LetUsHelpYou from './LetusHelp';
import LivingRoom from "./SpacesWeDesign/LivingRoom";
import Kitchen from "./SpacesWeDesign/Kitchen";
import Bedroom from "./SpacesWeDesign/Bedroom";
import ShopNow from "./ShopNow/ShopNow";
// import CustomerStories from './CustomerStories/CustomerStories';
import ModularKitchenFormModal from "./ModularKitchenFormModal";
import ResponsiveModal from "components/Modal";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import "./Slider.css";

const Check = require("../../../static/newHomePage/check.svg");

import { allowNChar, allowTypeOf } from "utils/helper";
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from "helpers/apiUrls";
import { sendData, getData } from "redux/modules/services";

@connect(
  ({ services, homeinterior, userLogin, profile }) => ({
    homeinterior,
    topBanner: homeinterior.data.items.text.topBanner,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class HomeInteriorContainer extends React.Component {
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
    }, 1000);
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
      topBanner
    } = this.props;
    const { showScript } = this.state;
    return (
      <div>
        <Helmet title={topBanner.title}>
          <meta
            name="description"
            content="HomeTown - Shop online for Furniture, Home Decor, Furnishings, Kitchenware, Dining Products at best prices from HomeTown.in. Get best furniture and home decor products ☆Upto 40% Off, ☆Fast Shipping, ☆High Quality, ☆Premium, ☆Luxury furniture to beautify your ☆bedroom, ☆kitchen, ☆dining room, ☆living and ☆outdoor space ☆Original ☆0% EMI ☆Free Assembly ☆Safe Shipping."
          />
        </Helmet>

        <Header handleModal={this.handleModal} />
        <TopBanner handleModal={this.handleModal} />
        <ServicesWeOffer handleModal={this.handleModal} />
        <DesignByStyle />
        <SpacesWeDesign />
        <LivingRoom />
        <Kitchen />
        <Bedroom />
        {/* <CustomerStories /> */}
        <ShopNow />
        {/* <LetUsHelpYou /> */}

        <Section p="0" mb="0">
          <ResponsiveModal
            classNames={{ modal: "designbuildmodal" }}
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
                classNames={{ modal: "designbuildmodal" }}
                onCloseModal={() => this.setState({ open: false })}
                open={this.state.open}
              >
                {/* <Div
                  mt="50px"
                  p="50px 15%"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '20px'
                  }}
                >
                  <Heading
                    ta="center"
                    fontSize="22px"
                    mb="50px"
                    mt="10px"
                    color="#000000"
                    style={{ whiteSpace: 'normal' }}
                  >
                    Thank you for your Interest, Our Team will get in touch with you Shortly
                  </Heading> */}
                {/* <Img m="0 auto 5px" width="100px" src={correctIcon} alt="Reload Page" /> */}
                {/* </Div> */}

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
                          src={Check}
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

export default HomeInteriorContainer;
