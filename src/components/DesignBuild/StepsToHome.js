import React, { Component } from "react";
import ResponsiveModal from "components/Modal";
import ModularKitchenFormModal from "./ModularKitchenFormModal";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import Section from "hometown-components-dev/lib/SectionHtV1";
import StepsMain from "./StepsMain";
import { connect } from "react-redux";

const styles = require("./Designbuild.scss");
import "./Slider.css";

const check = require("../../../static/check.svg");

import { allowNChar, allowTypeOf } from "utils/helper";
import { SERVICE_SIGNUPS, PINCODE as PINCODE_API } from "helpers/apiUrls";
import { sendData, getData } from "redux/modules/services";

@connect(
  ({ services, designbuild }) => ({
    designbuild,
    ...services.modularkitchen,
    stepsToDreamhome: designbuild.data.items.text.stepsToDreamhome
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class StepsToYourHome extends React.Component {
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
    const { stepsToDreamhome, loading, loaded } = this.props;
    return (
      <Div mt="70px">
        <Flex>
          <Image
            data-src={stepsToDreamhome.image}
            style={{ width: "55%", height: "750px" }}
          />
          <Div
            style={{
              width: "45%",
              height: "750px",
              backgroundColor: "#F5F5F5"
            }}
          >
            <StepsMain handleModal={this.handleModal} />
          </Div>
        </Flex>
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
                            mt="100px"
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
      </Div>
    );
  }
}

export default StepsToYourHome;
