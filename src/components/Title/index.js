import React from 'react';
import PropTypes from 'prop-types';
import Text from 'hometown-components-dev/lib/Text';
import Div from 'hometown-components-dev/lib/Div';

const Title = ({
  title, subTitle, ta, titleColor
}) => (
  <Div mb="1rem">
    <Text fontSize="1.5rem" color={titleColor} mt="0" mb="0.3125rem" lh="1.4" ta={ta} fontFamily="light">
      {title}
    </Text>
    {subTitle !== '' && (
      <Text fontSize="1rem" color="rgba(0, 0, 0, 0.6)" mt="0" mb="0" ta="center" fontFamily="light">
        {subTitle}
      </Text>
    )}
  </Div>
);

Title.defaultProps = {
  title: '',
  subTitle: '',
  ta: 'center',
  titleColor: 'rgba(0, 0, 0, 0.75)'
};

Title.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  ta: PropTypes.string,
  titleColor: PropTypes.string
};

export default Title;
