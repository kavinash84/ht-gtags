import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProgressiveImage from './ProgressiveImage';

class ImgLoader extends Component {
  static propTypes = {
    data: PropTypes.array
  };
  render() {
    return (
      <ProgressiveImage
        lowImage="https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/small.jpg"
        highImage="https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/large.jpg"
        defaultImage="https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/default.jpg"
      >
        {(imageURL, style) => <img style={style} src={imageURL} alt="testing" />}
      </ProgressiveImage>
    );
  }
}
ImgLoader.defaultProps = {
  data: []
};

ImgLoader.propTypes = {
  data: PropTypes.array //eslint-disable-line
};

export default ImgLoader;
