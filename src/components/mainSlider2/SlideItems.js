import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Image from "hometown-components-dev/lib/ImageHtV1";

/* TO DO Add ProgressiveImage */
const SliderItem = ({ image, url, onClick, target, onImageClick }) => {
  if (!target && !url) {
    return (
      <Link
        onClick={() => {
          sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
        }}
        to={url}
      >
        <Image
          mt="15px"
          src={image}
          style={{
            width: "100%",
            alignItems: "center"
          }}
        />
      </Link>
    );
  } else if (target) {
    return (
      <Link
        onClick={() => {
          sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
        }}
        to={url}
      >
        <Image
          mt="15px"
          src={image}
          style={{
            width: "100%",
            alignItems: "center"
          }}
        />
      </Link>
    );
  }
  return (
    <Link
      onClick={() => {
        sessionStorage.setItem("HtscrollPosition", window.pageYOffset);
      }}
      to={url}
    >
      <Image
        mt="15px"
        src={image}
        style={{
          width: "100%",
          alignItems: "center"
        }}
      />
    </Link>
  );
};

SliderItem.defaultProps = {
  image: "",
  target: "",
  url: "",
  onImageClick: () => {}
};

SliderItem.propTypes = {
  image: PropTypes.string,
  url: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func
};

export default SliderItem;
