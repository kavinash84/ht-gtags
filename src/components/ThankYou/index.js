import React from 'react';
import PropTypes from 'prop-types';
/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const ThankYou = ({ title, subTitle }) => (
  <Box py={60}>
    {title !== null && (
      <Text fontSize={80} fontFamily="light" color="primary" textAlign="center">
        {title}
      </Text>
    )}
    {subTitle !== null && (
      <Text mt={20} color="textLight" textAlign="center" width={1} fontSize={20} fontWeight={500}>
        {subTitle}
      </Text>
    )}
  </Box>
);

ThankYou.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
};

ThankYou.defaultProps = {
  title: 'Thank You!',
  subTitle: 'Your order has been placed successfully.'
};

export default ThankYou;
