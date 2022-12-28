import React, { Component } from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import Header from "./Header";
import TopBanner from "./TopBanner";
import WardrobesForEveryone from "./WardrobesForEveryone/WardrobeForEveryone";
import TypesWardrobes from "./TypesWardrobes/TypesWardrobes";
import Materials from "./Materials/Materials";
import WhyChose from "./Whychose";
import Finishes from "./Finishes/Finishes";
import Accessories from "./Accessories/Accessories";
// import CustomerStories from './CustomerStories/CustomerStories';
import ShopNow from "./ShopNow/ShopNow";
import Steps from "./4Steps";
import ModularKitchenFormModal from "./ModularKitchenFormModal";
import ResponsiveModal from "components/Modal";
import Section from "hometown-components-dev/lib/SectionHtV1";
import SeoContent from "hometown-components-dev/lib/SeoContent";
import Container from "hometown-components-dev/lib/ContainerHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import "./Slider.css";

const check = require("../../../static/check.svg");

import { allowNChar, allowTypeOf } from "utils/helper";
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from "helpers/apiUrls";
import { sendData, getData } from "redux/modules/services";

@connect(
  ({ services, modularwardrobe, userLogin, profile }) => ({
    modularwardrobe,
    topBanner: modularwardrobe.data.items.text.topBanner,
    seoInfo:
      modularwardrobe.data &&
      modularwardrobe.data.seo &&
      modularwardrobe.data.seo.items,
    typeswardrobes: modularwardrobe.data.items.text.typeswardrobes,
    ...services.modularkitchen
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class ModularWardrobeContainer extends React.Component {
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
      typeswardrobes,
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
        <WardrobesForEveryone />
        <Steps handleModal={this.handleModal} />
        <Div
          style={{
            fontSize: "40px",
            fontWeight: "600",
            marginBottom: "10px",
            color: "black",
            marginTop: "100px",
            textAlign: "center"
          }}
        >
          {typeswardrobes.mainTitle}
          <div
            style={{
              width: "30px",
              borderTop: "2px solid #222222",
              margin: "auto",
              marginTop: "15px"
            }}
          />
        </Div>
        <TypesWardrobes />
        <Materials />
        <Finishes />
        <Accessories />
        {/* <CustomerStories /> */}
        <ShopNow />

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
                      src="https://static.hometown.in/media/cms/D/Top-Image-Living1.jpg"
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

export default ModularWardrobeContainer;
