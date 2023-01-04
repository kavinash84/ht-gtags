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

  render() {
    const { whyChooseUs, isLoggedIn, fullName, loading, loaded } = this.props;
    const { showScript } = this.state;
    const { speakourkitchenexperts } = this.props;
    return (
      <div>
        <Box className={styles.main} style={{ marginTop: "60px" }}>
          <Image
            data-src={speakourkitchenexperts.image}
            src={speakourkitchenexperts.image}
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
            />
          </Box>
        </Box>
      </div>
    );
  }
}
export default KitchenExperts;
