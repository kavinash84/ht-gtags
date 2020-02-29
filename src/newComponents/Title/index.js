import React from 'react';
import PropTypes from 'prop-types';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';

const Title = ({ title, subTitle, ...rest }) => (
  <Box mb="24px" {...rest}>
    <Text variant="heading.regular" textAlign="center" mb={subTitle && 10}>
      {title}
    </Text>
    {subTitle !== '' && <Text textAlign="center">{subTitle}</Text>}
  </Box>
);

Title.defaultProps = {
  title: '',
  subTitle: ''
};

Title.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
};

export default Title;
