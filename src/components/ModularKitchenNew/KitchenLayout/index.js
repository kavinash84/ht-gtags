import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { triggerImpression, triggerClick } from "redux/modules/analytics";
import BoxHtV1 from "hometown-components-dev/lib/BoxHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import KitchenLayoutItem from "./KitchenLayoutItems";
import SlickSlider from "../../SlickSlider";
import ModularKitchenFormModal from "../ ModularKitchenFormModal";
import ResponsiveModal from "components/Modal";
import { allowNChar, allowTypeOf } from "utils/helper";
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from "helpers/apiUrls";
import { sendData, getData } from "redux/modules/services";

import "./KitchenLayout.css";
const LeftArrow = require("../../../../static/new-home/roundedArrowLeft.svg");
const RightArrow = require("../../../../static/new-home/roundedArrowRight.svg");
const check = require("../../../../static/newHomePage/check.svg");

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={RightArrow}
        onClick={onClick}
        style={{ ...style, marginRight: "11%", width: "15px" }}
      />
    </React.Fragment>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <React.Fragment>
      <img
        className={className}
        src={LeftArrow}
        onClick={onClick}
        style={{ ...style, marginLeft: "11%", width: "15px" }}
      />
    </React.Fragment>
  );
}
const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  autoplay: false,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  customPaging: i => (
    <div
      style={{
        borderTop: "1px solid #848C7F"
      }}
    ></div>
  )
};
@connect(
  ({ services, modularkitchen }) => ({
    modularkitchen,
    ...services.modularkitchen,
    kitchenlayout: modularkitchen.data.items.text.kitchenlayout
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class KitchenLayout extends Component {
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
    const {
      data,
      kitchenlayout,
      triggerSlideChange,
      triggerSlideClick,
      reference,
      newSettings,
      onImageClick
    } = this.props;
    const finalSettings = { ...settings, ...newSettings };
    return (
      <React.Fragment>
        <Heading
          mb="20px"
          mt="70px"
          fontSize="40px"
          style={{
            textAlign: "center",
            color: "#222222",
            fontFamily: "medium"
          }}
        >
          {kitchenlayout.mainTitle}
        </Heading>
        <div
          style={{
            width: "30px",
            borderTop: "2px solid #222222",
            margin: "auto",
            marginBottom: "10px"
          }}
        />
        <SlickSlider
          settings={finalSettings}
          afterChange={e => triggerSlideChange(e)}
          ref={reference}
          className="ShopBannercarousel_one"
        >
          {kitchenlayout.data.map((slide, index) => (
            <BoxHtV1 key={String(index)}>
              <KitchenLayoutItem
                target={slide.target || ""}
                image={slide.image}
                url={slide.url_key}
                title={slide.title}
                description={slide.description}
                onClick={() => triggerSlideClick(index)}
                onImageClick={onImageClick}
                handleModal={this.handleModal}
              />
            </BoxHtV1>
          ))}
        </SlickSlider>

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
          <BoxHtV1>
            {!loading && loaded ? (
              <ResponsiveModal
                classNames={{ modal: "modularKitchenModel" }}
                onCloseModal={() => this.setState({ open: false })}
                open={this.state.open}
              >
                <BoxHtV1 style={{ width: "100%" }}>
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
                    <BoxHtV1
                      style={{
                        width: "50%",
                        height: "90vh",
                        backgroundColor: "#FBF2ED",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px"
                      }}
                    >
                      <BoxHtV1 p="20px 5px" mt="20px">
                        <BoxHtV1>
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
                        </BoxHtV1>
                        <img
                          src={check}
                          style={{
                            width: "60px",
                            height: "60x",
                            margin: "30px auto",
                            display: "block"
                          }}
                        />
                      </BoxHtV1>
                    </BoxHtV1>
                  </Flex>
                </BoxHtV1>
              </ResponsiveModal>
            ) : null}
          </BoxHtV1>
        </Section>
      </React.Fragment>
    );
  }
}

export default connect(null, {
  triggerSlideChange: triggerImpression,
  triggerSlideClick: triggerClick
})(KitchenLayout);
