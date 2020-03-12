import React, { Component } from 'react';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const offerIcon = require('../../../static/offer.svg');

class CouponsCard extends Component {
  render() {
    return (
      <Row sx={{ boxShadow: 'profile', border: 'divider' }} mb={20}>
        <Col width={8 / 10}>
          <Row p={20}>
            <Image src={offerIcon} />
            <Box ml={15}>
              <Text width={1} pb={5} variant="primary" fontFamily="light">
                On minimum purchase of Rs. 500
              </Text>
              <Text width={1} pb={5} variant="primary" fontFamily="light">
                Reason for Cancellation
              </Text>
              <Text width={1} pb={5} variant="primary" fontFamily="medium">
                Expired on 20th January 2020
              </Text>
            </Box>
          </Row>
        </Col>
        <Col width={2 / 10} display="flex" alignItems="center" justifyContent="center" sx={{ borderLeft: 'divider' }}>
          <Text textAlign="center" fontFamily="light" color="heading" variant="xSmall" pb={15}>
            COUPON CODE
          </Text>
          <Text textAlign="center" color="textLight" variant="heading.medium">
            HTOFF30
          </Text>
        </Col>
      </Row>
    );
  }
}

export default CouponsCard;
