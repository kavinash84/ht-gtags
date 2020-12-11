import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

const CategoryItem = ({
 image, name, url, discount
}) => {
  if (url) {
    return (
      <Box variant="section.catSliderItem">
        <Link to={url}>
          {image && <Image src={image} alt={name} />}
          {discount && (
            <Text variant="catSliderDiscount" mt={16}>
              {discount}
            </Text>
          )}
          {name && (
            <Text variant="catSliderTitle" mt={12} pb={5}>
              {name}
            </Text>
          )}
        </Link>
      </Box>
    );
  }
  return (
    <Box variant="section.catSliderItem">
      {image && <Image src={image} alt={name} />}
      {discount && (
        <Text variant="catSliderDiscount" mt={16}>
          {discount}
        </Text>
      )}
      {name && (
        <Text variant="catSliderTitle" mt={12} pb={5}>
          {name}
        </Text>
      )}
    </Box>
  );
};

CategoryItem.defaultProps = {
  image: '',
  name: '',
  url: '',
  discount: ''
};

CategoryItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  discount: PropTypes.string
};

export default CategoryItem;
