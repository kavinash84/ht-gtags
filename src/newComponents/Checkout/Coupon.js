import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import LocalInlineNotification from 'newComponents/LocalInlineNotification';
import { applyCoupon, removeCoupon } from 'redux/modules/coupon';
import { toggleCouponList, hideCouponList } from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';
import Notifs from '../../newComponents/Notifs';
import CouponList from './CouponList';

const EditCouponIcon = require('../../../static/edit.svg');
const DiscountSuccessIcon = require('../../../static/percentage-green.svg');

const styles = require('./Coupon.scss');

@connect(({
 pincode, app, coupon, cart, notifs
}) => ({
  pincode: pincode.selectedPincode,
  sessionId: app.sessionId,
  coupon,
  cart,
  notifs
}))
class Coupon extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    coupon: ''
  };

  handleApply = e => {
    if (e) {
      e.preventDefault();
    }
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(applyCoupon(this.state.coupon, sessionId, pincode));
    // this.toggleMoreCoupons();
    this.hideMoreCoupons();
  };

  removeCoupon = coupon => {
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(removeCoupon(coupon, sessionId, pincode));
  };
  handleClick = coupon => {
    this.setState(
      {
        coupon,
        showmorecoupons: false
      },
      () => this.handleApply()
    );
  };

  handleChange = e => {
    this.setState({
      coupon: e.target.value
    });
  };
  toggleMoreCoupons = () => {
    this.setState({
      showmorecoupons: !this.state.showmorecoupons
    });
    const { dispatch } = this.context.store;
    dispatch(toggleCouponList());
  };
  hideMoreCoupons = () => {
    const { dispatch } = this.context.store;
    dispatch(hideCouponList());
  };
  render() {
    const {
      cart,
      notifs,
      coupon: {
 loading, coupons, getingcoupon, unapplicablecoupons
},
      pincode,
      sessionId
    } = this.props;
    const {
      summary: { coupon: appliedCoupon, coupon_discount: couponDiscount },
      couponlistToggle
    } = cart;
    return (
      <BoxHtV1>
        <BoxHtV1 className={styles.applyCoupon}>
          {appliedCoupon ? (
            <BoxHtV1>
              <BoxHtV1 className={styles.appliedCouponWrapper}>
                <ButtonHtV1
                  display="block"
                  btnType="link"
                  fontFamily="Light"
                  pl="5px"
                  pr="20px"
                  fontSize="1rem"
                  textAlign="left"
                  color="#f98d29"
                  onClick={() => this.removeCoupon(appliedCoupon)}
                >
                  <ImageHtV1 src={DiscountSuccessIcon} float="left" mr="0.625rem" mb="1rem" mt="3px" alt="" />
                  Applied: <b>{appliedCoupon}</b> <br />
                  <BoxHtV1 fontSize="0.875em" color="#f98d29">
                    Save <b>Rs. {formatAmount(couponDiscount)}</b>
                  </BoxHtV1>
                  <ImageHtV1
                    src={EditCouponIcon}
                    display="inline"
                    float="none"
                    va="sub"
                    width="18px"
                    ml="0.625rem"
                    alt="Change"
                  />
                </ButtonHtV1>
              </BoxHtV1>
              <LabelHtV1 textAlign="center" color="#3cc0dc" display="block" mt="5px" mb="0.9375rem">
                <ButtonHtV1
                  onClick={this.toggleMoreCoupons}
                  p="0"
                  color="#3cc0dc"
                  size="block"
                  btnType="link"
                  textAlign="right"
                >
                  {couponlistToggle ? 'Hide Coupons' : ' View Applicable Coupons'}
                </ButtonHtV1>
              </LabelHtV1>
            </BoxHtV1>
          ) : (
            <BoxHtV1>
              <HeadingHtV1 fontSize="0.875em" mb="0.625rem" color="secondary">
                Have a Coupon Code?
              </HeadingHtV1>
              <BoxHtV1 className={`${styles.applyCouponWrapper}`}>
                <form onSubmit={this.handleApply}>
                  <input
                    className={styles.applyCopupnField}
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.coupon.toUpperCase()}
                    placeholder="Enter coupon code"
                  />
                  <ButtonHtV1
                    className={styles.applyCouponBtn}
                    btnType="primary"
                    color="#f98d29"
                    p="9px 20px"
                    fontSize="0.75rem"
                    disabled={loading || (notifs.coupon && notifs.coupon.length > 0)}
                    fontFamily="regular"
                    borderRadius="0"
                    onClick={this.handleApply}
                  >
                    Apply
                  </ButtonHtV1>
                </form>
                {notifs.coupon && (
                  <Notifs namespace="coupon" NotifComponent={props => <LocalInlineNotification {...props} />} />
                )}
              </BoxHtV1>

              <LabelHtV1 textAlign="center" color="#3cc0dc" display="block" mt="5px" mb="0.9375rem">
                <ButtonHtV1
                  onClick={this.toggleMoreCoupons}
                  p="0"
                  color="#3cc0dc"
                  size="block"
                  btnType="link"
                  textAlign="right"
                >
                  {couponlistToggle ? 'Hide Coupons' : ' View Applicable Coupons'}
                </ButtonHtV1>
              </LabelHtV1>
            </BoxHtV1>
          )}
          {couponlistToggle && (
            <CouponList
              coupons={coupons}
              appliedCoupon={appliedCoupon}
              pincode={pincode}
              sessionId={sessionId}
              handleClick={this.handleClick}
              loading={getingcoupon}
              unapplicablecoupons={unapplicablecoupons}
            />
          )}
        </BoxHtV1>
      </BoxHtV1>
    );
  }
}
Coupon.propTypes = {
  pincode: PropTypes.string,
  sessionId: PropTypes.string,
  coupon: PropTypes.object,
  cart: PropTypes.object,
  notifs: PropTypes.object
};
Coupon.defaultProps = {
  sessionId: '',
  pincode: '',
  cart: {},
  coupon: {},
  notifs: {}
};
export default Coupon;
