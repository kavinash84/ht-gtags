import React from 'react';
import PropTypes from 'prop-types';
import Text from 'hometown-components/lib/Text';
import Div from 'hometown-components/lib/Div';

// const styles = require('./ProductCarousel.scss');

const ProductCarousel = ({ title, subTitle }) => (
  <Div mb="1.25rem">
    <Text fontSize="1.8rem" color="rgba(0, 0, 0, 0.75)" mt="0" mb="0" lh="1.4" ta="center" fontFamily="SFPDLight">
      {title}
    </Text>
    {subTitle !== '' && (
      <Text fontSize="1rem" color="rgba(0, 0, 0, 0.6)" mt="0" mb="0" ta="center" fontFamily="SFPDLight">
        {subTitle}
      </Text>
    )}
  </Div>
);

ProductCarousel.defaultProps = {
  title: '',
  subTitle: ''
};

ProductCarousel.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string
};

export default ProductCarousel;
