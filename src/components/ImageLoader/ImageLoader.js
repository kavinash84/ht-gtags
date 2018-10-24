import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TestComponent extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    title: PropTypes.string,
    url: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    lowImage: PropTypes.string,
    highImage: PropTypes.string,
    defaultImage: PropTypes.string
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
  }
  componentWillUnmount() {
    if (this.smallImage) {
      this.smallImage.onLoad = null;
      this.smallImage.onError = null;
    }
    if (this.originalImage) {
      this.originalImage.onLoad = null;
      this.originalImage.onError = null;
    }
    if (this.defaultImage) {
      this.defaultImage.onLoad = null;
      this.defaultImage.onError = null;
    }
  }
  onLowImageLoad() {
    this.setState({ isLowImageLoaded: true });
    this.loadHighImage();
  }
  onLowImageError() {
    this.setState({
      isLowImageLoaded: false,
      error: true
    });
    this.loadDefaultImage();
  }
  onHighImageLoad() {
    this.setState({ isHighImageLoaded: true });
  }
  onHighImageError() {
    this.setState({
      isHighImageLoaded: false,
      error: true
    });
    this.loadDefaultImage();
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
    const { lowImage } = this.props;
    const src = lowImage;
    if (this.smallImage) {
      this.smallImage.onload = null;
      this.smallImage.onerror = null;
    }
    const smallImage = new Image();
    smallImage.onload = this.onLowImageLoad.bind(this);
    smallImage.onerror = this.onLowImageError.bind(this);
    smallImage.src = src;
    this.smallImage = smallImage;
  }
  loadHighImage() {
    const { highImage } = this.props;
    const src = highImage;
    if (this.originalImage) {
      this.originalImage.onload = null;
      this.originalImage.onerror = null;
    }
    const originalImage = new Image();
    originalImage.onload = this.onHighImageLoad.bind(this);
    originalImage.onerror = this.onHighImageError.bind(this);
    originalImage.src = src;
    this.originalImage = originalImage;
  }
  loadDefaultImage() {
    const { defaultImage } = this.props;
    const src = defaultImage;
    if (this.errorImage) {
      this.errorImage.onload = null;
      this.errorImage.onerror = null;
    }
    const errorImage = new Image();
    errorImage.onload = this.onDefaultImageLoad.bind(this);
    errorImage.onerror = this.onDefaultImageError.bind(this);
    errorImage.src = src;
    this.errorImage = errorImage;
  }
  render() {
    const {
      children,
      title,
      url,
      lowImage,
      highImage,
      defaultImage,
      onClick
    } = this.props;
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
        {!isLowImageLoaded && !error && children(lowImage, title, url, onClick, true)}
        {isLowImageLoaded && !error && children(highImage, title, url, onClick, false)}
        {error && children(defaultImage, title, url, onClick, false)}
      </React.Fragment>
    );
  }
}
TestComponent.defaultProps = {
  title: '',
  url: '',
  lowImage: '',
  highImage: '',
  defaultImage: '',
};
TestComponent.propTypes = {
  children: PropTypes.func.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  lowImage: PropTypes.string,
  highImage: PropTypes.string,
  defaultImage: PropTypes.string
};

export default TestComponent;
