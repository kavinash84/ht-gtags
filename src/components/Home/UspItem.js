import React from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const UspItem = ({ src, children }) => (
  <Box textAlign="center">
    <Image src={src} alt={children} sx={{ flexShrink: 0, height: [40, 40, 50, 60] }} />
    <Text variant="uspTitle" mt={16}>
      {children}
    </Text>
  </Box>
);

UspItem.defaultProps = {};

UspItem.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default UspItem;
