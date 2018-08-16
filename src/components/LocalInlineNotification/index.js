import React from 'react';
import PropTypes from 'prop-types';

const LocalInlineNotification = ({ msg }) => <div>{msg}</div>;
export default LocalInlineNotification;

LocalInlineNotification.propTypes = {
  msg: PropTypes.string
};
LocalInlineNotification.defaultProps = {
  msg: 'Some Error Occured !'
};
