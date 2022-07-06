import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ImageHtV1 from "hometown-components-dev/lib/ImageHtV1";
import CardHtV1 from "hometown-components-dev/lib/CardHtV1";
const MainSliderItem = ({
  title,
  image,
  url,
  onClick,
  target,
  onImageClick
}) => {
  if (!target && !url) {
    return (
      <CardHtV1
        title={title}
        rel="noopener noreferrer"
        as="a"
        onClick={onImageClick}
      >
        <ImageHtV1 data-src={image} src={`${image}?blur=30`} alt={title || "Banner-image"} variant="image" />
      </CardHtV1>
    );
  } else if (target) {
    return (
      <CardHtV1
        href={url}
        title={title}
        target={target}
        rel="noopener noreferrer"
        onClick={onClick}
        as="a"
      >
        <ImageHtV1 data-src={image} src={`${image}?blur=30`} alt={title || "Banner-image"} variant="image" />
      </CardHtV1>
    );
  }
  return (
    <Link to={url} onClick={onClick}>
      <ImageHtV1 data-src={image} src={`${image}?blur=30`} alt={title || "Banner-image"} variant="image" />
    </Link>
  );
};

MainSliderItem.defaultProps = {
  title: "",
  image: "",
  target: "",
  url: "",
  onImageClick: () => {}
};

MainSliderItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func
};

export default MainSliderItem;