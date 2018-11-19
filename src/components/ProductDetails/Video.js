import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ id }) => (
  <iframe
    width="460"
    height="300"
    title="youtube Video"
    src={`https://www.youtube.com/embed/${id}?wmode=transparent`}
  />
);

Video.defaultProps = {
  id: ''
};

Video.propTypes = {
  id: PropTypes.string
};

export default Video;
