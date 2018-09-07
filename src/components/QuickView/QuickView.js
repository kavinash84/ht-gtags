import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Span from 'hometown-components/lib/Span';
import Text from 'hometown-components/lib/Text';
import AddToCart from 'components/AddToCart';
import { calculateSavings, calculateDiscount, getImageURL, formatProductURL } from 'utils/helper';
import { formatAmount } from 'utils/formatters';
// import { loadEmiOptions } from 'redux/modules/emioptions';
import SlickSlider from '../SlickSlider';

const styles = require('./QuickView.scss');

const adjustSlides = length => ({
  slidesToShow: length >= 3 ? 3 : length,
  slidesToScroll: 3,
  autoplay: false,
  infinite: false
});

@connect(({ emioptions }) => ({
  emidata: emioptions.data
}))
export default class QuickView extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.quickViewSlider = React.createRef();
  }
  state = {
    currentImage: 0,
    previousDisabled: true,
    nextDisabled: false,
    product: ''
  };

  componentWillMount() {
    this.getProductDetails(this.props.sku);
    // const { dispatch } = this.context.store;
    // dispatch(loadEmiOptions(this.props.sku));
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
    this.quickViewSlider.current.slider.current.slickGoTo(this.state.currentImage);
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
    e.preventDefault();
    this.setState({ currentImage: parseInt(e.target.id, 10) }, this.setDisable);
  };

  setCurrentImage = name => {
    if (name === 'previous' && !this.state.previousDisabled > 0) {
      this.setState(
        {
          currentImage: this.state.currentImage - 1
        },
        this.setDisable
      );
    }
    if (name === 'next' && !this.state.nextDisabled) {
      this.setState(
        {
          currentImage: this.state.currentImage + 1
        },
        this.setDisable
      );
    }
  };
  changeImage = e => {
    const { name } = e.target;
    this.setCurrentImage(name);
  };

  handleArrowKey = e => {
    const keys = {
      37: () => {
        this.setCurrentImage('previous');
      },
      39: () => {
        this.setCurrentImage('next');
      }
    };
    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };

  render() {
    const { images, data } = this.state.product;
    const { currentImage } = this.state;
    const { sku, simpleSku, soldOut } = this.props;
    // const { emidata } = this.props;
    const {
      name, price, special_price: discPrice, max_saving_percentage: saving
    } = data;
    // const lowestEmi = calculateLowestEmi(emidata, discPrice);
    return (
      <div className={styles.quickView}>
        <Row ml="0" mr="0">
          <Div col="7">
            <div className={styles.imgSliderContainer}>
              <button name="previous" className={styles.previous} onClick={this.changeImage}>
                &#8249;
              </button>
              <div className={styles.imageContainer}>
                <img src={images[currentImage] && getImageURL(images[currentImage].path, 'product_500')} alt="" />
              </div>
              <button name="next" className={styles.next} onClick={this.changeImage}>
                &#8250;
              </button>
            </div>
          </Div>
          <Div col="5" pl="1.5rem" pr="1rem">
            <Div pt="1rem" className={styles.content}>
              <Heading
                color="rgba(0, 0, 0, 0.75)"
                ellipsis={false}
                fontSize="1.25rem"
                fontFamily="medium"
                lh="1.5"
                mt="0"
                mb="0.625rem"
              >
                <Link to={formatProductURL(name, sku)}>{name}</Link>
              </Heading>
              <Text>
                <Span color="rgba(0, 0, 0, 0.6)" fontFamily="medium" fontSize="1.325rem" mr="1rem">
                  Rs. {(discPrice && formatAmount(discPrice)) || (price && formatAmount(price))}
                </Span>
                {discPrice && (
                  <Span fontFamily="regular" color="rgba(0, 0, 0, 0.6)" fontSize="1rem">
                    <s>Rs. {formatAmount(price)}</s>
                  </Span>
                )}
              </Text>
              {saving && (
                <Text color="rgba(0, 0, 0, 0.6)" fontFamily="700" fontSize="0.857rem" mb="1rem">
                  Savings:{' '}
                  <Span color="rgba(0, 0, 0, 0.6)" fontSize="0.857rem" va="bottom">
                    Rs.
                    {formatAmount(calculateSavings(price, discPrice))} ({calculateDiscount(price, discPrice)}
                    %)
                  </Span>
                </Text>
              )}
              {/* <Text color="rgba(0, 0, 0, 0.6)" fontFamily="700" fontSize="0.857rem" mb="1rem" mt="0.3125rem">
                EMI:{' '}
                <Span color="rgba(0, 0, 0, 0.6)" fontSize="0.857rem" va="bottom">
                  starting from Rs.{formatAmount(lowestEmi)}{' '}
                </Span>
              </Text> */}
              <AddToCart simpleSku={simpleSku} sku={sku} isSoldOut={soldOut} />
            </Div>
            <Div className={`${styles.thumb} thumbCarousel`}>
              <SlickSlider
                settings={adjustSlides(images.length)}
                ref={this.quickViewSlider}

                // passedRef={quickViewSlider => {
                //   this.quickViewSlider = quickViewSlider;
                // }}
              >
                {images.map((image, index) => (
                  <div key={String(index)}>
                    <button
                      className={`${styles.thumbBtn} ${index === currentImage && styles.active}`}
                      onClick={this.setImage}
                      id={index}
                    >
                      <img className={styles.sliderImage} src={image.path} alt="" id={index} />
                    </button>
                  </div>
                ))}
              </SlickSlider>
            </Div>
          </Div>
        </Row>
      </div>
    );
  }
}
QuickView.defaultProps = {
  soldOut: false
};
QuickView.propTypes = {
  sku: PropTypes.string.isRequired,
  simpleSku: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  soldOut: PropTypes.bool
};
