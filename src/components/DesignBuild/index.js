import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import BeginJourney from "./BeginJourney";
// import QueryDropDownContainer from './queryDropdown';
import TopBanner from "./TopBanner";
import WhyChose from "./Whychose";
import RoomsWeTransform from "./RoomsTransform";
import Header from "./Header";
import DandBAdvantage from "./DesignBuildAdavntage/DandBAdvantage";
import DesignServices from "./DesignServices/DesignServices";
import ServicesOffer from "./ServicesOffer/ServicesOffer";
import StepsToYourHome from "./StepsToHome";
// import SpeakToExperts from './SpeakToExperts';
import ShopFurniture from "./ShopFurniture/ShopFurniture";
import StyleYourHome from "./StyleYourHome/StyleYourHome";
// import Blogs from './Blogs/Blogs';
// import CustomerStories from './CustomerStories/CustomerStories';
import SeoContent from "hometown-components-dev/lib/SeoContent";
import ResponsiveModal from "components/Modal";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import ModularKitchenFormModal from "./ModularKitchenFormModal";
import Image from "hometown-components-dev/lib/ImageHtV1";
import ModularKitchen from "./ModularKitchenForm";

import "./Slider.css";
const styles = require("./Designbuild.scss");
const check = require("../../../static/check.svg");

import { allowNChar, allowTypeOf } from "utils/helper";
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from "helpers/apiUrls";
import { sendData, getData } from "redux/modules/services";

@connect(
  ({ services, designbuild, userLogin, profile }) => ({
    designbuild,
    topBanner: designbuild.data.items.text.topBanner,
    seoInfo:
      designbuild.data && designbuild.data.seo && designbuild.data.seo.items,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class DesignBuildContainer extends React.Component {
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
      topBanner,
      seoInfo
    } = this.props;
    const { showScript } = this.state;
    return (
      <div>
        <Helmet title={`${(seoInfo && seoInfo.page_title) || ""}`}>
          <meta name="keywords" content={seoInfo && seoInfo.meta_keywords} />
          <meta
            name="description"
            content={seoInfo && seoInfo.meta_description}
          />
        </Helmet>
        <Header handleModal={this.handleModal} />
        <TopBanner handleModal={this.handleModal} />
        <WhyChose />
        <DandBAdvantage />
        <StepsToYourHome />
        <DesignServices />
        {/* <SpeakToExperts /> */}
        <Div mt="70px">
          <Flex>
            <Image
              src="https://www.hometown.in/media/cms/designbuild/speaktoExperts.png"
              style={{ width: "50%", height: "700px" }}
            />
            <Div
              style={{
                width: "50%",
                height: "700px",
                backgroundColor: "#FBF2ED"
              }}
            >
              <ModularKitchen
                handleModalWithSave={this.handleModalWithSave}
                handleScript={this.handleScript}
              />
            </Div>
          </Flex>
        </Div>

        <RoomsWeTransform />
        <ServicesOffer />
        {/* <CustomerStories /> */}
        <ShopFurniture />
        <StyleYourHome />
        <BeginJourney handleModal={this.handleModal} />
        {/* <Blogs /> */}
        {/* <QueryDropDownContainer /> */}

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
        {/* SEO Content */}
        {seoInfo && seoInfo.seo_text && (
          <SeoContent>
            <Container>
              <div>
                <div dangerouslySetInnerHTML={{ __html: seoInfo.seo_text }} />
              </div>
            </Container>
          </SeoContent>
        )}
      </div>
    );
  }
}

export default DesignBuildContainer;
