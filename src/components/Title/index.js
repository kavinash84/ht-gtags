import React from 'react';
import PropTypes from 'prop-types';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
// import Text from 'hometown-components-dev/lib/Text';
// import Div from 'hometown-components-dev/lib/Div';

const Title = ({ title, subTitle, ...rest }) => (
  <BoxHtV1 mb="24px" {...rest}>
    <TextHtV1 variant="heading.regular" textAlign="center" mb={subTitle && 10}>
      {title}
    </TextHtV1>
    {subTitle !== '' && <TextHtV1 textAlign="center">{subTitle}</TextHtV1>}
  </BoxHtV1>
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
