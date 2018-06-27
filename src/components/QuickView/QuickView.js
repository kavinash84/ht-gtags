import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToCart from 'components/AddtoCart';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Span from 'hometown-components/lib/Span';
import Text from 'hometown-components/lib/Text';

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
    const { sku, simpleSku } = this.props;
    const {
      name, price, special_price: discPrice, max_saving_percentage: saving
    } = data;
    return (
      <div className={styles.quickView}>
        <Row ml="0" mr="0">
          <Div col="7">
            <div className={styles.imgSliderContainer}>
              <button name="previous" className={styles.previous} onClick={this.changeImage}>
                &#8249;
              </button>
              <div className={styles.imageContainer}>
                <img src={images[currentImage].zoom_image} alt="" />
              </div>
              <button name="next" className={styles.next} onClick={this.changeImage}>
                &#8250;
              </button>
            </div>
          </Div>
          <Div col="5" pl="1.5rem" pr="2rem">
            <Div pt="1rem" className={styles.content}>
              <Heading color="rgba(0, 0, 0, 0.75)" ellipsis={false} fontSize="1.375em" lh="1.7" mt="0" mb="1rem">
                {name}
              </Heading>
              <Text>
                <Span color="rgba(0, 0, 0, 0.6)" fontWeight="600" fontSize="1.5em" mr="1rem">
                  Rs. {price}
                </Span>
                <Span fontWeight="400" color="rgba(0, 0, 0, 0.6)" fontSize="1.125em">
                  <s>Rs. {discPrice}</s>
                </Span>
              </Text>
              <Text color="rgba(0, 0, 0, 0.6)" fontWeight="700" fontSize="0.857rem" mb="0">
                Savings:{' '}
                <Span color="rgba(0, 0, 0, 0.6)" fontSize="0.857rem" va="bottom">
                  Rs. 2,000 ({saving}%)
                </Span>
              </Text>
              <Text color="rgba(0, 0, 0, 0.6)" fontWeight="700" fontSize="0.857rem" mb="2rem" mt="0.3125rem">
                EMI:{' '}
                <Span color="rgba(0, 0, 0, 0.6)" fontSize="0.857rem" va="bottom">
                  starting from Rs.2,419{' '}
                </Span>
              </Text>
              <AddToCart simpleSku={simpleSku} sku={sku} />
            </Div>
            <Div className={styles.thumb}>
              {images.map((image, index) => (
                <button onClick={this.setImage} id={index} key={String(index)}>
                  <img className={styles.sliderImage} src={image.path} alt="" id={index} />
                </button>
              ))}
            </Div>
          </Div>
        </Row>
      </div>
    );
  }
}

QuickView.propTypes = {
  sku: PropTypes.string.isRequired,
  simpleSku: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired
};
