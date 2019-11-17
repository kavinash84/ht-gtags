import React from 'react';
import PropTypes from 'prop-types';
import TextHtV1 from 'hometown-components/lib/TextHtV1';
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
// import Text from 'hometown-components/lib/Text';
// import Div from 'hometown-components/lib/Div';

const Title = ({ title, subTitle }) => (
  <BoxHtV1 mb="1rem">
    <TextHtV1 variant="text.catSliderHeading">{title}</TextHtV1>
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
