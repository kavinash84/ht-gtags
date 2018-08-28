import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';

const LocalInlineNotification = ({ msg }) => (
  <Div mt="0.3125rem" className="error">
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
