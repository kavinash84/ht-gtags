import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/**
 * helper
 */
import { getImageURL } from 'utils/helper';

/**
 * Icons
 */
// const statusIcon = require('../../../static/status-pending.svg');
// const statusActiveIcon = require('../../../static/status-active.svg');
// const rectangleIcon = require('../../../static/rectangle.svg');
const statusIcon = require('../../../static/oval.svg');
const statusActiveIcon = require('../../../static/rightIcon.svg');
// const filledRectangleIcon = require('../../../static/filledRectangleIcon.svg');

const activeCircle = {
  bg: 'white',
  px: 3,
  py: 0.75
};

const firstStep = {
  left: 0
};

const otherSteps = {
  left: -21
};

class TrackingDetails extends Component {
  render() {
    const stylesModal = require('./index.scss');
    const { data, error } = this.props;
    return (
      <Box px={30} py={30}>
        <Row mx={0} justifyContent="center" mb={30}>
          <Heading color="heading" fontSize={28} variant="heading.regular">
            {error ? 'Error' : 'Track Order'}
          </Heading>
        </Row>
        <Row justifyContent="space-between" alignItems="center" mb={10} mx={0}>
          {/* TODO: add dynamic order no. */}
          <Text variant="heading.small">Order No. 1111</Text>
          <Text variant="heading.small" color="primary">
            TRACK ANOTHER ORDER
          </Text>
        </Row>
        <Box
          px={40}
          py={20}
          className={stylesModal.trackingModal}
          sx={{ boxShadow: 'profile', border: 'light', overflow: 'hidden' }}
        >
          {error ? (
            <Text style={{ color: 'red', padding: '10px' }}>{error}</Text>
          ) : (
            data.map((item, index) => {
              const {
                image,
                product_name: name,
                status,
                bill_of_landing: AWB,
                transport_id: transportId,
                quantity
              } = item;
              return (
                <Box
                  py={15}
                  sx={{
                    borderBottom: 'light',
                    ':last-child': {
                      borderBottom: 'none'
                    }
                  }}
                >
                  <Row key={String(index)} flexWrap="nowrap" alignItems="center">
                    <Col width={200}>
                      <ImageShimmer src={getImageURL(image, 'catalog_360')} height={120}>
                        {imageURL => (
                          <Image
                            src={imageURL}
                            alt={name}
                            width={120}
                            height={120}
                            sx={{
                              boxShadow: 'productThumb'
                            }}
                          />
                        )}
                      </ImageShimmer>
                    </Col>
                    <Flex
                      width="130%"
                      mr="-10%"
                      pl={30}
                      pr={10}
                      flexWrap="nowrap"
                      className={`${stylesModal.timeline} ${status.length === 3 ? stylesModal.homewareProduct : ''}`}
                    >
                      {status.map((statusDetails, i) => {
                        const { status: StatusKey, display: active } = statusDetails;
                        return (
                          <Flex
                            key={String(i)}
                            flexGrow="1"
                            className={`${stylesModal.trackBlock} ${active === 1 ? stylesModal.active : ''}`}
                          >
                            <Box
                              className={stylesModal.line}
                              sx={{
                                zIndex: active === 1 ? 2 : 1
                              }}
                            />
                            <Box
                              className={stylesModal.round}
                              sx={{
                                ...(active === 1 && activeCircle),
                                ...(i === 0 ? firstStep : otherSteps),
                                zIndex: 5
                              }}
                            >
                              <Image width="16px" height="16px" src={active === 1 ? statusActiveIcon : statusIcon} />
                            </Box>
                            <Text
                              variant="small"
                              color="label"
                              maxWidth={75}
                              textAlign="center"
                              pt={25}
                              sx={{
                                wordBreak: 'break-word',
                                lineHeight: 1.4,
                                transform:
                                  i === 0 ? 'translateX(-62%) translateY(0)' : 'translateX(-100%) translateY(0)'
                              }}
                            >
                              {StatusKey || 'NA'}
                            </Text>
                          </Flex>
                        );
                      })}

                      {/* <Image
                        width={1}
                        src={rectangleIcon}
                        sx={{ position: 'relative' }}
                      />
                      <Box sx={{ position: 'absolute' }}>
                        <Image
                          src={filledRectangleIcon}
                          sx={{ position: 'relative' }}
                        />
                        <Image
                          ml={-21}
                          mt={4}
                          width="16px"
                          height="16px"
                          src={OvalIcon}
                          sx={{ position: 'absolute' }}
                        />
                        <Image
                          ml={-18}
                          mt={9}
                          src={statusIcon}
                          sx={{ position: 'absolute' }}
                        />
                      </Box> */}
                    </Flex>
                    {/* <Row pt={14}>
                      {status.map((statusDetails, i) => {
                        const { status: StatusKey } = statusDetails;
                        return (
                          <Row key={String(i)}>
                            <Text
                              pr={50}
                              fontSize={15}
                              width={1}
                              fontWeight="500"
                              color="#474747"
                              variant="profileDashBoard"
                            >
                              {StatusKey || 'NA'}
                            </Text>
                          </Row>
                        );
                      })}
                    </Row> */}
                  </Row>
                  <Row pt={10}>
                    <Col>
                      <Text color="label" variant="small" lineHeight={1.2} pb={5}>
                        {name}
                      </Text>
                      <Text variant="small" color="label">
                        {`Qty-${quantity}`}
                      </Text>
                      {transportId && (
                        <Text variant="small" color="label">
                          {`Delivery Partner - ${transportId || '--'}`}
                        </Text>
                      )}
                      {AWB && (
                        <Text variant="small" color="label">
                          {`AWB Number - ${AWB || '--'}`}
                        </Text>
                      )}
                    </Col>
                  </Row>
                </Box>
              );
            })
          )}
        </Box>
      </Box>
    );
  }
}

TrackingDetails.propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired
};
export default TrackingDetails;
