import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Img from 'hometown-components/lib/Img';
import ImageLoader from '../ImageLoader/ImageLoader';

const SliderItem = ({
  title, image, url, onClick
}) => (
  <ImageLoader
    image={image}
    title={title}
    lowImage="https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/small.jpg"
    highImage="https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/large.jpg"
    defautImage="https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/default.jpg"
    url={url}
    onClick={onClick}
  >
    {(imageURL, imageTitle, routeURL, onClickHandler, isBlurred) => (
      <Link to={routeURL} onClick={onClickHandler}>
        <Img style={isBlurred ? { filter: 'blur(5px)' } : {}}src={imageURL} alt={imageTitle} width="100%" />
      </Link>
    )}
  </ImageLoader>
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
