import React from 'react';
import PropTypes from 'prop-types';

import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

const styles = require('./PdpStripe.scss');

const Warranty = require('../../../static/pdp-icons/36-months-warranty.png');
const Emi = require('../../../static/pdp-icons/EMI-icon.png');
const Safe = require('../../../static/pdp-icons/Free-&-Safe-delivery-icon.png');
const Noquestion = require('../../../static/pdp-icons/No-questions-asked-returns.png');
const ServiceCamp = require('../../../static/pdp-icons/service-camp-icon.png');

const Stripes = ({
 emi, isEmiAvailable, warrantyPeriod, fkCatalogSupplier, brand, freeVisit, children
}) => {
  console.log('fkCatalogSupplier brand', fkCatalogSupplier, brand);
  const isFurnitureCategory = fkCatalogSupplier === '38';
  const noQuestionsAsked = isFurnitureCategory && brand === 'HomeTown';
  return (
    <Box>
      <Box className={styles.dots} />
      <Flex justifyContent="flex-start" alignItems="baseline">
        {isEmiAvailable ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={Emi} />
            <Text fontSize=" 10px" lineHeight="13px" textAlign="center">
              EMI from ₹{emi}
              <a href>{children}</a>{' '}
            </Text>
          </Col>
        ) : null}
        {warrantyPeriod ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={Warranty} />
            <Text fontSize=" 10px" lineHeight="13px" textAlign="center">
              {warrantyPeriod} Warranty
            </Text>
          </Col>
        ) : null}
        {noQuestionsAsked ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={Noquestion} />
            <Text fontSize=" 10px" lineHeight="13px" textAlign="center">
              No Questions asked Cancellation
            </Text>
          </Col>
        ) : null}
        <Col variant="col-2" m="5px auto" px="0" alignItems="center">
          <Image className={styles.pdpStripeIcons} src={Safe} />
          <Text fontSize=" 10px" lineHeight="13px" textAlign="center">
            Free and Safe Delivery
          </Text>
        </Col>
        {freeVisit === 'yes' ? (
          <Col variant="col-2" m="5px auto" px="0" alignItems="center">
            <Image className={styles.pdpStripeIcons} src={ServiceCamp} />
            <Text fontSize=" 10px" lineHeight="13px" textAlign="center">
              4 Free Service Visits
            </Text>
          </Col>
        ) : null}
      </Flex>
      <Box className={styles.dots} />
    </Box>
  );
};

Stripes.propTypes = {
  emi: PropTypes.string,
  fkCatalogSupplier: PropTypes.number.isRequired,
  brand: PropTypes.string,
  isEmiAvailable: PropTypes.bool,
  warrantyPeriod: PropTypes.string,
  children: PropTypes.object.isRequired,
  freeVisit: PropTypes.string
};

Stripes.defaultProps = {
  emi: 0,
  brand: '',
  isEmiAvailable: false,
  warrantyPeriod: '',
  freeVisit: 'no'
};

export default Stripes;
