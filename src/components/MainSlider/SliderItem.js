import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CardHtV1 from 'hometown-components-dev/lib/CardHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';

/* TO DO Add ProgressiveImage */
const SliderItem = ({
 title, image, url, onClick, target, onImageClick
}) => {
  if (!target && !url) {
    return (
      <CardHtV1 title={title} rel="noopener noreferrer" as="a" onClick={onImageClick}>
        <ImageHtV1 src={image} alt={title || 'Banner-image'} variant="image" />
      </CardHtV1>
    );
  } else if (target) {
    return (
      <CardHtV1 href={url} title={title} target={target} rel="noopener noreferrer" onClick={onClick} as="a">
        <ImageHtV1 src={image} alt={title} variant="image" />
      </CardHtV1>
    );
  }
  return (
    <Link to={url} onClick={onClick}>
      <ImageHtV1 src={image} alt={title} variant="image" />
    </Link>
  );
};

SliderItem.defaultProps = {
  title: '',
  image: '',
  target: '',
  url: '',
  onImageClick: () => {}
};

SliderItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func
};

export default SliderItem;
