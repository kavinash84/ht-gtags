import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';

const errorIcon = require('../../../static/warning.svg');

const LocalInlineNotification = ({ msg }) => (
  <Div mt="0.3125rem" className="error">
    <Img width="15px" float="left" mr="0.625rem" src={errorIcon} alt="" />
    {msg}
  </Div>
);
export default LocalInlineNotification;

LocalInlineNotification.propTypes = {
  msg: PropTypes.string
};
LocalInlineNotification.defaultProps = {
  msg: 'Some Error Occured !'
};
