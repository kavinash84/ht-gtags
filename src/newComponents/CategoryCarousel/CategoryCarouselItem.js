import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components/lib/ImageHtV1';
import TextHtV1 from 'hometown-components/lib/TextHtV1';

const CategoryItem = ({ image, name, url }) => {
  if (url) {
    return (
      <BoxHtV1 variant="section.catSliderItem">
        <Link to={url || '/'}>
          {image && <ImageHtV1 src={image} alt={name} />}
          <TextHtV1 variant="catSliderTitle" mt={12}>
            {name}
          </TextHtV1>
        </Link>
      </BoxHtV1>
    );
  }
  return (
    <BoxHtV1 variant="section.catSliderItem">
      {image && <ImageHtV1 src={image} alt={name} />}
      <TextHtV1 variant="catSliderTitle" mt={20}>
        {name}
      </TextHtV1>
    </BoxHtV1>
  );
};

CategoryItem.defaultProps = {
  image: '',
  name: '',
  url: ''
};

CategoryItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string
};

export default CategoryItem;
