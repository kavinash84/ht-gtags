import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToCart from 'components/ProductDetails/AddtoCart';

const styles = require('./QuickView.scss');

export default class QuickView extends Component {
  state = {
    currentImage: 0,
    previousDisabled: true,
    nextDisabled: false,
    product: ''
  };

  componentWillMount() {
    this.getProductDetails(this.props.sku);
  }
  componentDidMount() {
    window.addEventListener('keyup', this.handleArrowKey, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleArrowKey, false);
  }

  getProductDetails = sku => {
    if (sku) {
      const product = this.props.products.filter(pdt => pdt.data.sku === sku);
      this.setState({
        product: product[0]
      });
    }
  };

  setDisable = () => {
    if (this.state.currentImage === this.state.product.images.length - 1) {
      this.setState({
        nextDisabled: true,
        previousDisabled: false
      });
    } else if (this.state.currentImage === 0) {
      this.setState({
        previousDisabled: true,
        nextDisabled: false
      });
    } else {
      this.setState({
        previousDisabled: false,
        nextDisabled: false
      });
    }
  };

  setImage = e => {
    this.setState({ currentImage: parseInt(e.target.id, 10) }, this.setDisable);
  };

  changeImage = e => {
    if (e.target.name === 'previous' && !this.state.previousDisabled > 0) {
      this.setState(
        {
          currentImage: this.state.currentImage - 1
        },
        this.setDisable
      );
    }
    if (e.target.name === 'next' && !this.state.nextDisabled) {
      this.setState(
        {
          currentImage: this.state.currentImage + 1
        },
        this.setDisable
      );
    }
  };

  handleArrowKey = e => {
    const keys = {
      37: () => {
        if (!this.state.previousDisabled) {
          this.setState(
            {
              currentImage: this.state.currentImage - 1
            },
            this.setDisable
          );
        }
      },
      39: () => {
        if (!this.state.nextDisabled) {
          this.setState(
            {
              currentImage: this.state.currentImage + 1
            },
            this.setDisable
          );
        }
      }
    };
    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };

  render() {
    const { images, data } = this.state.product;
    const { currentImage } = this.state;
    const { sku } = this.props;
    const {
      name, price, special_price: discPrice, max_saving_percentage: saving
    } = data;
    return (
      <div className={styles.quickView}>
        <button name="previous" className={styles.previous} onClick={this.changeImage}>
          PREVIOUS
        </button>
        <div className={styles.imageContainer}>
          <img src={images[currentImage].zoom_image} alt="" />
        </div>
        <button name="next" className={styles.next} onClick={this.changeImage}>
          NEXT
        </button>
        {/* DATA CONTAINER */}
        <div className={styles.dataContainer}>
          <p>{name || null}</p>
          <p>{price || null}</p>
          <p>{discPrice || null}</p>
          <p>{saving || null} %</p>
          <div className={styles.childImagesSlider}>
            {images.map((image, index) => (
              <button onClick={this.setImage} id={index} key={String(index)}>
                <img className={styles.sliderImage} src={image.path} alt="" id={index} />
              </button>
            ))}
          </div>
          <AddToCart skuId={sku} />
        </div>
      </div>
    );
  }
}

QuickView.propTypes = {
  sku: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired
};
