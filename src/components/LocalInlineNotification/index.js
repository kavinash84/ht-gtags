import React from 'react';
import PropTypes from 'prop-types';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

const errorIcon = require('../../../static/warning.svg');

const LocalInlineNotification = ({ msg }) => (
  <Flex mb={0} pb={10} className="error" sx={{ alignItems: 'center' }}>
    <Image width={15} mr={10} src={errorIcon} alt="" />
    {msg}
  </Flex>
);
export default LocalInlineNotification;

LocalInlineNotification.propTypes = {
  msg: PropTypes.string
};
LocalInlineNotification.defaultProps = {
  msg: 'Some Error Occured !'
};
