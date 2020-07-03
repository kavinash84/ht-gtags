import React from 'react';
import PropTypes from 'prop-types';
/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

const ThankYouIcon = require('../../../static/thankyou.png');

const ThankYou = ({ title, subTitle }) => (
  <Box py={60}>
    {title !== null && <Image src={ThankYouIcon} sx={{ display: 'flex' }} width="initial" m="auto" alt="Thank you!" />}
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
