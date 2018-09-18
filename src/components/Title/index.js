import React from 'react';
import PropTypes from 'prop-types';
import Text from 'hometown-components/lib/Text';
import Div from 'hometown-components/lib/Div';

const Title = ({ title, subTitle, ta }) => (
  <Div mb="1.25rem">
    <Text fontSize="1.25rem" color="rgba(0, 0, 0, 0.75)" mt="0" mb="0" lh="1.4" ta={ta} fontFamily="regular">
      {title}
    </Text>
    {subTitle !== '' && (
      <Text fontSize="1rem" color="rgba(0, 0, 0, 0.6)" mt="0" mb="0" ta="center" fontFamily="regular">
        {subTitle}
      </Text>
    )}
  </Div>
);

Title.defaultProps = {
  title: '',
  subTitle: '',
  ta: 'center'
};

Title.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  ta: PropTypes.string
};

export default Title;
