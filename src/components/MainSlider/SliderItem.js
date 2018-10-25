import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Img from 'hometown-components/lib/Img';
import ProgressiveImage from '../ImageLoader/ProgressiveImage';

const SliderItem = ({
  title, image, url, onClick
}) => (
  <ProgressiveImage
    lowImage="https://static.hometown.in/media/cms/hometownv2/compressed/hp-2_tn.jpg"
    highImage={image}
    defaultImage="https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/default.jpg"
  >
    {(imageURL, style) => (
      <Link to={url} onClick={onClick}>
        <Img style={style} src={imageURL} alt={title} width="100%" />
      </Link>
    )}
  </ProgressiveImage>
);

SliderItem.defaultProps = {
  title: '',
  image: ''
};

SliderItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SliderItem;
