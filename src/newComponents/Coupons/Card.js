import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
// import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

// const offerIcon = require('../../../static/offer.svg');

class CouponsCard extends Component {
  splitDates = date => {
    const UtcDate = new Date(date);
    let month = UtcDate.getMonth();
    const day = UtcDate.getDate() + 1;
    const year = UtcDate.getFullYear();
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    month = monthNames[month];
    const dateReturn = {
      day,
      month,
      year
    };
    return dateReturn;
  };
  render() {
    const {
      status,
      code,
      discountAmount,
      // fromDate,
      toDate,
      subtotal,
      discountValue,
      type
    } = this.props;
    // const SplitedFromDate = this.splitDates(fromDate);
    const SplitedToDate = this.splitDates(toDate);
    return (
      <Row sx={{ boxShadow: 'profile', border: 'divider' }} mb={20}>
        <Col width={8 / 10}>
          <Row p={20}>
            {/* <Image src={offerIcon} /> */}
            <Text textAlign="center" color="textLight" variant="heading.medium">
              {type === 'percent' ? <b>{discountValue} %</b> : <b>₹ {discountAmount}</b>}
            </Text>
            <Box ml={15}>
              {subtotal && (
                <Text width={1} pb={5} variant="primary" fontFamily="light">
                  On minimum purchase of Rs. {subtotal}
                </Text>
              )}
              <Text width={1} pb={5} variant="primary" fontFamily="light">
                Reason for Cancellation
              </Text>
              {toDate && (
                <Text width={1} pb={5} variant="primary" fontFamily="medium">
                  {status === 'available' ? 'Expiring by ' : 'Expired on '}
                  {SplitedToDate.day} th {SplitedToDate.month} {SplitedToDate.year}
                </Text>
              )}
            </Box>
          </Row>
        </Col>
        <Col width={2 / 10} display="flex" alignItems="center" justifyContent="center" sx={{ borderLeft: 'divider' }}>
          <Text textAlign="center" fontFamily="light" color="heading" variant="xSmall" pb={15}>
            COUPON CODE
          </Text>
          {code && (
            <Text textAlign="center" color="textLight" variant="heading.medium">
              {code}
            </Text>
          )}
        </Col>
      </Row>
    );
  }
}
CouponsCard.defaultProps = {
  status: '',
  code: '',
  discountAmount: '',
  // fromDate: '',
  toDate: '',
  subtotal: '',
  discountValue: '',
  type: ''
};
CouponsCard.propTypes = {
  status: PropTypes.string,
  code: PropTypes.string,
  discountAmount: PropTypes.string,
  // fromDate: PropTypes.string,
  toDate: PropTypes.string,
  subtotal: PropTypes.string,
  discountValue: PropTypes.string,
  type: PropTypes.string
};
export default CouponsCard;
