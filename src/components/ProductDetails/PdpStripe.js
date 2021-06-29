import React from 'react';
import PropTypes from 'prop-types';

import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

const styles = require('./PdpStripe.scss');

const Warranty = require('../../../static/pdp-icons/36-months-warranty.png');
const Emi = require('../../../static/pdp-icons/EMI-icon.png');
const Safe = require('../../../static/pdp-icons/Free-&-Safe-delivery-icon.png');
const Noquestion = require('../../../static/pdp-icons/No-questions-asked-returns.png');
const ServiceCamp = require('../../../static/pdp-icons/service-camp-icon.png');

const Stripes = ({
 emi, isEmiAvailable, warrantyPeriod, fkCatalogSupplier, brand, children
}) => {
  console.log('fkCatalogSupplier brand', fkCatalogSupplier, brand);
  const isFurnitureCategory = fkCatalogSupplier === '38';
  const noQuestionsAsked = isFurnitureCategory && brand === 'HomeTown';
  return (
    <Box>
      <Flex justifyContent="flex-start" alignItems="center">
        {isEmiAvailable ? (
          <Box className={styles.boxes}>
            <Image src={Emi} />
            <Text fontSize="8px" lineHeight="13px">
              EMI from ₹{emi}
              <a href> {children}</a>{' '}
            </Text>
          </Box>
        ) : null}
        {warrantyPeriod ? (
          <Box className={styles.boxes}>
            <Image src={Warranty} />
            <Text fontSize="8px" lineHeight="13px">
              {warrantyPeriod} Warranty
            </Text>
          </Box>
        ) : null}
        {noQuestionsAsked ? (
          <Box className={styles.boxes}>
            <Image src={Noquestion} />
            <Text fontSize="8px" lineHeight="13px">
              No Questions Asked Returns
            </Text>
          </Box>
        ) : null}
        <Box className={styles.boxes}>
          <Image src={Safe} />
          <Text fontSize="8px" lineHeight="13px">
            Free and Safe Delivery
          </Text>
        </Box>
        {isFurnitureCategory ? (
          <Box className={styles.boxes}>
            <Image src={ServiceCamp} />
            <Text fontSize="8px" lineHeight="13px">
              4 Free Service Camps
            </Text>
          </Box>
        ) : null}
      </Flex>
      <div className={styles.dots} />
    </Box>
  );
};

Stripes.propTypes = {
  emi: PropTypes.string,
  fkCatalogSupplier: PropTypes.number.isRequired,
  brand: PropTypes.string,
  isEmiAvailable: PropTypes.bool,
  warrantyPeriod: PropTypes.string,
  children: PropTypes.object.isRequired
};

Stripes.defaultProps = {
  emi: 0,
  brand: '',
  isEmiAvailable: false,
  warrantyPeriod: ''
};

export default Stripes;
