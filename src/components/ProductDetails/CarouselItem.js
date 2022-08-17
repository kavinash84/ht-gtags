import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ReactImageMagnify from "react-image-magnify";
import Image from "hometown-components-dev/lib/ImageHtV1";
// import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageShimmer from "hometown-components-dev/lib/ImageShimmerHtV1";

const getLowResolution = url =>
  url.replace("-zoom.jpg", ".jpg?mode=fill&h=576&w=576");
const getHighResolution = url =>
  url.replace(".jpg", ".jpg?mode=fill&h=576&w=576");

const CategoryItem = ({ image, name, id }) => {
  return (
    <div id={`shimmerId_${id}`}>
      <ImageShimmer
        src={getHighResolution(image)}
        height={[300, 300, 400, 545]}
        overflow="hidden"
        style={{ maxHeight: "576px" }}
      >
        {(imageURL, error) => {
          if (error)
            return (
              <Image alt={name} src={imageURL} height={[300, 300, 400, 545]} />
            );
          return (
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: name,
                  isFluidWidth: true,
                  src: getLowResolution(imageURL)
                },
                largeImage: {
                  src: imageURL,
                  alt: name,
                  width: 1100,
                  height: 1100
                },
                enlargedImagePortalId: "portal",
                enlargedImageContainerDimensions: {
                  width: "105%",
                  height: "100%"
                },
                enlargedImageContainerClassName: "enlarge"
              }}
            />
          );
        }}
      </ImageShimmer>
    </div>
  );
};

CategoryItem.defaultProps = {
  name: ""
};

CategoryItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string
};

export default CategoryItem;
