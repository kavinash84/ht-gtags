import React from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';

const Step = ({
 value, variant, sx, sxContainer
}) => (
  <Box
    width={100}
    sx={{
      position: 'relative',
      '&:before': {
        content: "''",
        width: '100%',
        height: 1,
        bg: variant === 'active' ? 'primary' : 'inputBorder',
        position: 'absolute',
        left: 0,
        top: '50%',
        ...sxContainer
      }
    }}
  >
    <Flex
      variant={`timeline.${variant}`}
      sx={{
        position: 'relative',
        zIndex: 1,
        ...sx
      }}
    >
      {value}
    </Flex>
  </Box>
);

Step.defaultProps = {
  variant: 'default',
  sx: {},
  sxContainer: {}
};

Step.propTypes = {
  variant: PropTypes.string,
  value: PropTypes.number.isRequired,
  sx: PropTypes.objectOf(PropTypes.any),
  sxContainer: PropTypes.objectOf(PropTypes.any)
};

export default Step;
