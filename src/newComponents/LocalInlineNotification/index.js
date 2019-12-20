import React from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';

const errorIcon = require('../../../static/warning.svg');

const LocalInlineNotification = ({ msg }) => (
  <BoxHtV1 mt="0.3125rem" className="error">
    <ImageHtV1 width="15px" float="left" mr="0.625rem" src={errorIcon} alt="" />
    {msg}
  </BoxHtV1>
);
export default LocalInlineNotification;

LocalInlineNotification.propTypes = {
  msg: PropTypes.string
};
LocalInlineNotification.defaultProps = {
  msg: 'Some Error Occured !'
};
