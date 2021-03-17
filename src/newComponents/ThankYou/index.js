import React from 'react';
import PropTypes from 'prop-types';
/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const ThankYou = ({ title, subTitle, orderNo }) => (
  <Box py={60}>
    <Text color="primary" textAlign="center" width={1} fontSize={80}>
      {title}
    </Text>
    {subTitle !== null && (
      <Text mt={20} color="textLight" textAlign="center" width={1} fontSize={20} fontWeight={500}>
        Your order {orderNo} has been placed successfully.
      </Text>
    )}
  </Box>
);

ThankYou.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  orderNo: PropTypes.string
};

ThankYou.defaultProps = {
  title: 'Thank You!',
  subTitle: 'Your order has been placed successfully.',
  orderNo: ''
};

export default ThankYou;
