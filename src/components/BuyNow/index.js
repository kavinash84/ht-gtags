import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import Span from 'hometown-components/lib/Span';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/cart';
import { getCartListSKU } from 'selectors/cart';
import { PINCODE, CART_URL } from 'helpers/Constants';
import { withRouter } from 'react-router';

const checkSKUInCart = (list, sku) => list.includes(sku);
const styles = require('./BuyNow.scss');
const LoaderIcon = require('../../../static/refresh.svg');

const mapStateToProps = ({
  app: { sessionId }, pincode, cart, cart: { addingToCart, addedToCart, key }
}) => ({
  session: sessionId,
  pincode: pincode.selectedPincode ? pincode.selectedPincode : PINCODE,
  addingToCart,
  addedToCart,
  stateId: key,
  cartSKUs: getCartListSKU(cart)
});

@withRouter
class BuyNow extends React.Component {
  state = {
    buynow: false
  };
  componentWillReceiveProps(nextProps) {
    if (this.state.buynow && nextProps.addedToCart && nextProps.addedToCart !== this.props.addedToCart) {
      const { history } = this.props;
      history.push(CART_URL);
    }
  }

  handleClick = (key, skuId, simpleSku, session, pincode) => dispatcher => e => {
    e.preventDefault();
    this.setState({ buynow: true });
    dispatcher(key, skuId, simpleSku, session, pincode);
  };
  render() {
    const {
      session,
      simpleSku,
      sku,
      addToCart,
      pincode,
      cartSKUs,
      addingToCart,
      itemId,
      stateId,
      size,
      isSoldOut,
      btnType
    } = this.props;
    const checkStatus = checkSKUInCart(cartSKUs, sku);
    const addLoading = addingToCart && stateId === itemId;
    return (
      <div>
        {!isSoldOut && (
          <div>
            {!checkStatus ? (
              <Button
                btnType={btnType}
                border="1px solid"
                bc="#f98d29"
                color="#FFF"
                p="7px 15px 2px"
                size={size}
                disabled={addLoading}
                onClick={this.handleClick(itemId, sku, simpleSku, session, pincode)(addToCart)}
                className={styles.buyNowBtn}
              >
                {addLoading && <Img width="24px" className="spin" src={LoaderIcon} display="inline" />}
                <Span ml="0.625rem" fontSize="14px" fontFamily="regular" color="#FFF" va="top">
                  Buy Now
                </Span>
              </Button>
            ) : (
              <Div display="block" mb="0.625rem">
                <Link className={styles.buyNowBtn} to={CART_URL}>
                  <Span ml="0.625rem" fontSize="14px" fontFamily="regular" color="#FFF" va="middle">
                    Buy Now
                  </Span>
                </Link>
              </Div>
            )}
          </div>
        )}
      </div>
    );
  }
}

BuyNow.defaultProps = {
  cartSKUs: [],
  addingToCart: false,
  itemId: '',
  stateId: '',
  size: 'default',
  btnType: 'default',
  isSoldOut: false
};

BuyNow.propTypes = {
  simpleSku: PropTypes.string.isRequired,
  cartSKUs: PropTypes.array,
  sku: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired,
  pincode: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
  addingToCart: PropTypes.bool,
  itemId: PropTypes.string,
  stateId: PropTypes.string,
  size: PropTypes.string,
  btnType: PropTypes.string,
  isSoldOut: PropTypes.bool,
  addedToCart: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { ...actionCreators }
)(BuyNow);
