import React from 'react';
import PropTypes from 'prop-types';

/* ====== Components ====== */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const Step = ({
 value, variant, text, sx, sxContainer
}) => (
  <Box
    sx={{
      position: 'relative',
      '&:before': {
        content: "''",
        width: '100%',
        height: 1,
        bg: variant === 'active' ? 'primary' : 'inputBorder',
        position: 'absolute',
        left: 40,
        top: 11,
        ...sxContainer
      }
    }}
  >
    <Flex
      variant={`timeline.${variant}`}
      mx="auto"
      mb={5}
      sx={{
        position: 'relative',
        zIndex: 1,
        ...sx
      }}
    >
      {value}
    </Flex>
    <Text
      fontSize={12}
      width={60}
      sx={{
        // position: 'relative',
        // left: -15,
        // top: 5,
        textAlign: 'center',
        lineHeight: 1.3
      }}
    >
      {text}
    </Text>
  </Box>
);

Step.defaultProps = {
  variant: 'default',
  sx: {},
  sxContainer: {}
};

Step.propTypes = {
  variant: PropTypes.string,
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  sx: PropTypes.objectOf(PropTypes.any),
  sxContainer: PropTypes.objectOf(PropTypes.any)
};

export default Step;
