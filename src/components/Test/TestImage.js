import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TestComponent extends Component {
  static propTypes = {
    img: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.loadLowImage = this.loadLowImage.bind(this);
    this.loadHighImage = this.loadHighImage.bind(this);
    this.loadDefaultImage = this.loadDefaultImage.bind(this);
  }
  state = {
    isLowImageLoaded: false,
    isHighImageLoaded: false,
    isDefaultImageLoaded: false,
    error: false
  };
  componentDidMount() {
    this.loadLowImage();
    this.loadHighImage();
    this.loadDefaultImage();
  }
  componentWillUnmount() {
    if (this.lowImage) {
      this.lowImage.onLoad = null;
      this.lowImage.onError = null;
    }
    if (this.highImage) {
      this.highImage.onLoad = null;
      this.highImage.onError = null;
    }
    if (this.defaultImage) {
      this.defaultImage.onLoad = null;
      this.defaultImage.onError = null;
    }
  }
  onLowImageLoad() {
    this.setState({ isLowImageLoaded: true });
  }
  onLowImageError() {
    this.setState({
      isLowImageLoaded: false,
      error: true
    });
  }
  onHighImageLoad() {
    this.setState({ isHighImageLoaded: true });
  }
  onHighImageError() {
    this.setState({
      isHighImageLoaded: false,
      error: true
    });
  }
  onDefaultImageLoad() {
    this.setState({ isDefaultImageLoaded: true });
  }
  onDefaultImageError() {
    this.setState({
      isDefaultImageLoaded: false,
      error: true
    });
  }
  loadLowImage() {
    const { img } = this.props;
    const src = img.low;
    if (this.lowImage) {
      this.lowImage.onload = null;
      this.lowImage.onerror = null;
    }
    const lowImage = new Image();
    lowImage.onload = this.onLowImageLoad.bind(this);
    lowImage.onerror = this.onLowImageError.bind(this);
    lowImage.src = src;
    this.lowImage = lowImage;
  }
  loadHighImage() {
    const { img } = this.props;
    const src = img.high;
    if (this.highImage) {
      this.highImage.onload = null;
      this.highImage.onerror = null;
    }
    const highImage = new Image();
    highImage.onload = this.onHighImageLoad.bind(this);
    highImage.onerror = this.onHighImageError.bind(this);
    highImage.src = src;
    this.highImage = highImage;
  }
  loadDefaultImage() {
    const { img } = this.props;
    const src = img.defaultImage;
    if (this.defaultImage) {
      this.defaultImage.onload = null;
      this.defaultImage.onerror = null;
    }
    const defaultImage = new Image();
    defaultImage.onload = this.onDefaultImageLoad.bind(this);
    defaultImage.onerror = this.onDefaultImageError.bind(this);
    defaultImage.src = src;
    this.defaultImage = defaultImage;
  }
  render() {
    const { children, img } = this.props;
    const {
      isLowImageLoaded,
      isHighImageLoaded, //eslint-disable-line
      isDefaultImageLoaded, //eslint-disable-line
      error
    } = this.state;
    if (!children || typeof children !== 'function') {
      console.log('ImageLoader requires a function as its only child');
    }
    return (
      <React.Fragment>
        {!isLowImageLoaded && !error && children(img.low, error, true)}
        {isLowImageLoaded && !error && children(img.high, error, false)}
        {error && children(img.defaultImage, error, false)}
      </React.Fragment>
    );
  }
}
TestComponent.propTypes = {
  children: PropTypes.func.isRequired,
  img: PropTypes.object.isRequired
};

export default TestComponent;
