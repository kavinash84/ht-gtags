import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TestImage from './TestImage';
// import Img from 'hometown-components/lib/Img';

class TestComponent extends Component {
  static propTypes = {
    data: PropTypes.array
  };
  render() {
    const { data } = this.props;
    return data.map(img => (
      <TestImage img={img}>
        {(imageURL, error, isBlurred) => {
          const blurStyle = isBlurred ? { filter: 'blur(5px)' } : {};
          return <img style={blurStyle} src={imageURL} alt="" height="400" width="600" />;
        }}
      </TestImage>
    ));
  }
}
TestComponent.defaultProps = {
  data: []
};

TestComponent.propTypes = {
  data: PropTypes.array
};

export default TestComponent;
