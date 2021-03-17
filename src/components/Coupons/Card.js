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
        <Col width={7.5 / 10}>
          <Row p={20} alignItems="center">
            <svg xmlns="http://www.w3.org/2000/svg" width="113" height="63" viewBox="0 0 113 63">
              <g fill="none" fillRule="evenodd">
                {/* eslint-disable max-len */}
                <path stroke="#f15a22" strokeWidth="1.5" d="M1 2.238C2.192 1.86 3.378 1.18 4.579 1.154c5.423-.118 10.855.062 16.276-.104 2.409-.073 4.323.44 5.75 2.458.575.81 1.205 1.58 1.692 2.214.623-.266.817-.284.89-.39 2.565-3.72 6.097-4.37 10.433-4.33 22.936.214 45.876.106 68.814.088 1.524-.001 2.992-.046 3.754 1.648V60.23c-1.012.545-2.023 1.56-3.037 1.564-24.752.09-49.504.081-74.257.024-.858-.002-1.86-.518-2.54-1.1-1.183-1.015-2.166-2.268-3.154-3.335-.387.113-.606.108-.672.206-2.737 4.07-6.675 4.649-11.173 4.34-4.339-.295-8.717.044-13.068-.14C3.172 61.743 2.095 60.776 1 60.23V2.238z" />
                <text fill="#f15a22" fontFamily="HelveticaNeue, Helvetica Neue" fontSize="21" transform="translate(1 1)">
                  <tspan x="40" y="27">
                    {type === 'percent' ? `${discountValue}%` : `₹${discountAmount}`}
                  </tspan>
                </text>
                <text fill="#f15a22" fontFamily="HelveticaNeue, Helvetica Neue" fontSize="18" transform="translate(1 1)">
                  <tspan x="40" y="47">
                    OFF
                  </tspan>
                </text>
                <path stroke="#f15a22" strokeDasharray="4" strokeLinecap="square" d="M28.5 5.5v51" />
              </g>
            </svg>
            <Box ml={15}>
              {subtotal && (
                <Text width={1} pb={10} variant="primary" fontFamily="light">
                  On minimum purchase of Rs. {subtotal}
                </Text>
              )}
              {toDate && (
                <Text width={1} pb={5} variant="primary" fontFamily="medium">
                  {status === 'available' ? 'Expiring by ' : 'Expired on '}
                  {SplitedToDate.day} th {SplitedToDate.month} {SplitedToDate.year}
                </Text>
              )}
            </Box>
          </Row>
        </Col>
        <Col width={2.5 / 10} display="flex" alignItems="center" justifyContent="center" sx={{ borderLeft: 'divider' }}>
          <Text textAlign="center" fontFamily="light" color="heading" variant="xSmall" pb={15}>
            COUPON CODE
          </Text>
          {code && (
            <Text textAlign="center" color="primary" variant="heading.medium">
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
