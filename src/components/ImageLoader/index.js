import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    this.fetchImage = this.fetchImage.bind(this);
  }
  state = {
    currentImage: this.props.lowImage,
    loading: true
  };
  componentDidMount() {
    this.fetchImage(this.props.highImage);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.highImage !== this.props.highImage) {
      this.setState({ currentImage: nextProps.lowImage, loading: true }, () => {
        this.fetchImage(nextProps.highImage);
      });
    }
  }
  componentWillUnmount() {
    if (this.loadingImage) {
      this.loadingImage.onload = null;
    }
  }
  fetchImage = src => {
    const image = new Image();
    image.onload = () => this.setState({ currentImage: this.loadingImage.src, loading: false });
    image.src = src;
    this.loadingImage = image;
  };
  style = loading => ({
    transition: '0.5s filter linear',
    filter: loading ? 'blur(50px)' : ''
  });
  render() {
    const { currentImage, loading } = this.state;
    const { children } = this.props;
    const style = this.style(loading);
    return <Fragment>{children(currentImage, style)}</Fragment>;
  }
}

ProgressiveImage.defaultProps = {
  lowImage: '',
  highImage: '',
  defaultImage: ''
};
ProgressiveImage.propTypes = {
  children: PropTypes.func.isRequired,
  lowImage: PropTypes.string,
  highImage: PropTypes.string,
  defaultImage: PropTypes.string //eslint-disable-line
};
