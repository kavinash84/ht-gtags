import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

const offerIcon = require('../../../static/offer.svg');

class CoupensContainer extends Component {
  render() {
    return (
      <Box width={767} px={10}>
        <Row>
          <Label>
          ACTIVE
          </Label>
          <Label ml={16}>
          MISSED
          </Label>
        </Row>
        <Col mt={55}>
          <Row
            width={1}
            sx={{
              boxShadow: '3px 3px 4px 0 rgba(0, 0, 0, 0.1)',
              border: 'solid 0.5px #979797',
              bg: '#ffffff',
              padding: '24px 0 22px 23px',
              position: 'relative'
          }}
          >
            <Image
              src={offerIcon}
            />
            <Col>
              <Label width={1} pb={2} fontSize={16} color="#474747" variant="profileDashBoard">
              On minimum purchase of Rs. 500
              </Label>
              <Label width={1} pb={2} fontSize={16} color="#474747" variant="profileDashBoard">
              Reason for Cancellation
              </Label>
              <Label width={1} pb={2} fontSize={16} fontWeight="bold" color="#474747" variant="profileDashBoard">
              Expired on 20th January 2020 
              </Label>
            </Col>
            <Col 
            sx={{
              position: 'absolute',
              right: '0',
              textAlign: 'right'
            }}>
              <Label fontSize={13} color="#474747" variant="profileDashBoard">
              COUPEN CODE
              </Label>
              <Label fontSize={21} mt={14} color="#7a7d7d" variant="profileDashBoard">
              HTOFF30
              </Label>
            </Col>
          </Row>
        </Col>
        <Col mt={55}>
          <Row
            width={1}
            sx={{
              boxShadow: '3px 3px 4px 0 rgba(0, 0, 0, 0.1)',
              border: 'solid 0.5px #979797',
              bg: '#ffffff',
              padding: '24px 0 22px 23px',
              position: 'relative'
          }}
          >
            <Image
              src={offerIcon}
            />
            <Col>
              <Label width={1} pb={2} fontSize={16} color="#474747" variant="profileDashBoard">
              On minimum purchase of Rs. 500
              </Label>
              <Label width={1} pb={2} fontSize={16} color="#474747" variant="profileDashBoard">
              Reason for Cancellation
              </Label>
              <Label width={1} pb={2} fontSize={16} fontWeight="bold" color="#474747" variant="profileDashBoard">
              Expired on 20th January 2020 
              </Label>
            </Col>
            <Col
            sx={{
              position: 'absolute',
              right: '0',
              textAlign: 'right'
            }}>
              <Label fontSize={13} color="#474747" variant="profileDashBoard">
              COUPEN CODE
              </Label>
              <Label fontSize={21} mt={14} color="#7a7d7d" variant="profileDashBoard">
              HTOFF30
              </Label>
            </Col>
          </Row>
        </Col>
        <Col mt={55}>
          <Row
            width={1}
            sx={{
              boxShadow: '3px 3px 4px 0 rgba(0, 0, 0, 0.1)',
              border: 'solid 0.5px #979797',
              bg: '#ffffff',
              padding: '24px 0 22px 23px',
              position: 'relative'
          }}
          >
            <Image
              src={offerIcon}
            />
            <Col>
              <Label width={1} pb={2} fontSize={16} color="#474747" variant="profileDashBoard">
              On minimum purchase of Rs. 500
              </Label>
              <Label width={1} pb={2} fontSize={16} color="#474747" variant="profileDashBoard">
              Reason for Cancellation
              </Label>
              <Label width={1} pb={2} fontSize={16} fontWeight="bold" color="#474747" variant="profileDashBoard">
              Expired on 20th January 2020 
              </Label>
            </Col>
            <Col
              sx={{
                position: 'absolute',
                right: '0',
                textAlign: 'right'
              }}
              >
              <Label fontSize={13} color="#474747" variant="profileDashBoard">
              COUPEN CODE
              </Label>
              <Label fontSize={21} mt={14} color="#7a7d7d" variant="profileDashBoard">
              HTOFF30
              </Label>
            </Col>
          </Row>
        </Col>
      </Box>
    );
  }
}

export default CoupensContainer;
