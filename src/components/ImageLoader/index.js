import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImageLoader from './ImageLoader';
// import Img from 'hometown-components/lib/Img';

class TestComponent extends Component {
  static propTypes = {
    data: PropTypes.array
  };
  render() {
    const { data } = this.props;
    return data.map(img => (
      <ImageLoader
        title="testing blur images"
        url="/furniture/"
        lowImage={img.low}
        highImage={img.high}
        defaultImage={img.defaultImage}
        onClick={() => { console.log('clicked'); }}
      >
        {(imageURL, imageTitle, routeURL, onClickHandler, isBlurred) => {
          const blurStyle = isBlurred ? { filter: 'blur(5px)' } : {};
          return <img style={blurStyle} src={imageURL} alt="" height="400" width="600" />;
        }}
      </ImageLoader>
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
