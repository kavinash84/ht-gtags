import React from "react";
import Box from "hometown-components-dev/lib/BoxHtV1";
// import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from "hometown-components-dev/lib/ImageHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Button from "hometown-components-dev/lib/ButtonHtV1";
import ModularKitchenForm from "./ModularKitchenForm";
import ResponsiveModal from "components/Modal";
import { connect } from "react-redux";
import { sendData, getData } from "redux/modules/services";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";

const check = require("../../../static/new-home/check.svg");
const styles = require("./ModularKitchen.scss");

@connect(
  ({ services, modularkitchen }) => ({
    modularkitchen,
    ...services.modularkitchen,
    speakourkitchenexperts:
      modularkitchen.data.items.text.speakourkitchenexperts
  }),
  { sendFormData: sendData, loadPincodeDetails: getData }
)
class KitchenExperts extends React.Component {
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
    const { speakourkitchenexperts } = this.props;
    return (
      <div>
        <Box className={styles.main} style={{ marginTop: "60px" }}>
          <Image
            data-src={speakourkitchenexperts.image}
            alt="topbanner"
            width="80%"
            height="700px"
            marginLeft="10%"
            marginRight="10%"
            // style={{ objectFit: "cover" }}
          />
          <Box
            style={{ height: "90%", width: "450px", opacity: "0.8" }}
            className={styles.boxTwo}
          >
            <ModularKitchenForm
              handleModalWithSave={this.handleModalWithSave}
              handleScript={this.handleScript}
            />
          </Box>
        </Box>
        <Section p="0" mb="0">
          <Box>
            {!loading && loaded ? (
              <ResponsiveModal
                classNames={{ modal: "modularKitchenModel" }}
                onCloseModal={() => this.setState({ open: false })}
                open={this.state.open}
              >
                <Box style={{ width: "100%" }}>
                  <Flex>
                    <img
                      data-src="https://www.hometown.in/media/cms/D/Top-Image-Living1.jpg"
                      style={{
                        width: "50%",
                        height: "90vh",
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px"
                      }}
                    />
                    <Box
                      style={{
                        width: "50%",
                        height: "90vh",
                        backgroundColor: "#FBF2ED",
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px"
                      }}
                    >
                      <Box p="20px 5px" mt="20px">
                        <Box>
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
                        </Box>
                        <img
                          src={check}
                          style={{
                            width: "60px",
                            height: "60x",
                            margin: "30px auto",
                            display: "block"
                          }}
                        />
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </ResponsiveModal>
            ) : null}
          </Box>
        </Section>
      </div>
    );
  }
}
export default KitchenExperts;
