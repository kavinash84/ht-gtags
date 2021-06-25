import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';

const HtExclusiveContainer = ({ children }) => (
  <Box width="70%" margin="0 auto">
    {children}
  </Box>
);

HtExclusiveContainer.propTypes = {
  children: PropTypes.object.isRequired
};

export default HtExclusiveContainer;
