import React from "react";
import PropTypes from "prop-types";

import Box from "hometown-components-dev/lib/BoxHtV1";
import Text from "hometown-components-dev/lib/TextHtV1";
import Flex from "hometown-components-dev/lib/FlexHtV1";
import Col from "hometown-components-dev/lib/ColHtV1";
import Image from "hometown-components-dev/lib/ImageHtV1";

const styles = require("./PdpStripe.scss");

const Warranty = require("../../../static/pdp-icons/36-months-warranty.png");
const Emi = require("../../../static/pdp-icons/EMI-icon.png");
const Safe = require("../../../static/pdp-icons/Free-&-Safe-delivery-icon.png");
const Noquestion = require("../../../static/pdp-icons/No-questions-asked-returns.png");
// const Noquestion = require('../../../static/pdp-icons/No-questions-asked-returns.png');
const ServiceCamp = require("../../../static/pdp-icons/service-camp-icon.png");
const freeinstallation = require("../../../static/pdp-icons/free-installation.png");

const Stripes = ({
  emi,
  isEmiAvailable,
  warrantyPeriod,
  // fkCatalogSupplier,
  // brand,
  freeVisit,
  children,
  freeInstallation,
  isFurnitureStripe
}) => (
    // console.log('fkCatalogSupplier brand', fkCatalogSupplier, brand);
    // const isFurnitureCategory = fkCatalogSupplier === '38';
    // const noQuestionsAsked = isFurnitureCategory && brand === 'HomeTown';
    <Box>
      <Flex justifyContent="flex-start" alignItems="baseline" marginLeft="10px">
        {isEmiAvailable ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={Emi} />
            <Text fontSize=" 10px" lineHeight="13px" textAlign="center" mt="5px">
              EMI from ₹{emi}
              <a href>{children}</a>{" "}
            </Text>
          </Col>
        ) : null}
        {warrantyPeriod && warrantyPeriod !== "None" ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={Warranty} />
            <Text fontSize=" 10px" lineHeight="13px" textAlign="center" mt="5px">
              {warrantyPeriod} Warranty
          </Text>
          </Col>
        ) : null}
        {/* {noQuestionsAsked ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={Noquestion} />
            <Text fontSize=" 10px" lineHeight="13px" textAlign="center">
              No Questions asked Cancellation
            </Text>
          </Col>
        ) : null} */}
        {isFurnitureStripe ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={Safe} />
            <Text fontSize=" 10px" lineHeight="13px" textAlign="center" mt="5px">
              Free and Safe Delivery
          </Text>
          </Col>
        ) : null}
        {freeInstallation === "Yes" ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={Noquestion} />
            <Text fontSize="10px" textAlign="center" lineHeight="13px" mt="5px">
              Free Installation
          </Text>
          </Col>
        ) : null}
        {freeVisit === "Yes" ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={ServiceCamp} />
            <Text fontSize=" 10px" lineHeight="13px" textAlign="center" mt="5px">
              4 Free Service Visits
          </Text>
          </Col>
        ) : null}
      </Flex>
    </Box>
  );
Stripes.propTypes = {
  emi: PropTypes.string,
  // fkCatalogSupplier: PropTypes.number.isRequired,
  // brand: PropTypes.string,
  isEmiAvailable: PropTypes.bool,
  warrantyPeriod: PropTypes.string,
  children: PropTypes.object.isRequired,
  freeVisit: PropTypes.string,
  freeInstallation: PropTypes.string,
  isFurnitureStripe: PropTypes.bool
};

Stripes.defaultProps = {
  emi: 0,
  // brand: '',
  isEmiAvailable: false,
  warrantyPeriod: "",
  freeVisit: "no",
  freeInstallation: "no",
  isFurnitureStripe: false
};

export default Stripes;
