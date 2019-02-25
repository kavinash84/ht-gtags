import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ id }) => <iframe width="100%" height="300" title="youtube Video" frameBorder="0" src={id} />;

Video.defaultProps = {
  id: ''
};

Video.propTypes = {
  id: PropTypes.string
};

export default Video;
