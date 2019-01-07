import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import Span from 'hometown-components/lib/Span';
// import { Label } from 'hometown-components/lib/Label';
import Theme from 'hometown-components/lib/Theme';
import LocalInlineNotification from 'components/LocalInlineNotification';
import { applyCoupon, removeCoupon } from 'redux/modules/coupon';
import { toggleCouponList } from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';
import Notifs from '../../components/Notifs';
// import CouponList from './CouponList';

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
  render() {
    const {
      cart,
      notifs,
      coupon: {
        loading
        // coupons, getingcoupon, unapplicablecoupons
      }
      // pincode,
      // sessionId
    } = this.props;
    const {
      summary: { coupon: appliedCoupon, coupon_discount: couponDiscount }
      // couponlistToggle
    } = cart;
    return (
      <div>
        <Div className={styles.applyCoupon}>
          {appliedCoupon ? (
            <div>
              <div className={styles.appliedCouponWrapper}>
                <Button
                  display="block"
                  btnType="link"
                  fontFamily="Light"
                  pl="5px"
                  pr="20px"
                  fontSize="1rem"
                  ta="left"
                  color={Theme.colors.primary}
                  onClick={() => this.removeCoupon(appliedCoupon)}
                >
                  <Img src={DiscountSuccessIcon} float="left" mr="0.625rem" mb="1rem" mt="3px" alt="" />
                  Applied: <b>{appliedCoupon}</b> <br />
                  <Span fontSize="0.875em" color={Theme.colors.primary}>
                    Save <b>Rs. {formatAmount(couponDiscount)}</b>
                  </Span>
                  <Img
                    src={EditCouponIcon}
                    display="inline"
                    float="none"
                    va="sub"
                    width="18px"
                    ml="0.625rem"
                    alt="Change"
                  />
                </Button>
              </div>
              {/* <Label ta="center" color="primary" display="block" mt="5px" mb="0.9375rem">
                <Button onClick={this.toggleMoreCoupons} p="0" color="primary" size="block" btnType="link" ta="right">
                  {couponlistToggle ? 'Hide Coupons' : ' View Applicable Coupons'}
                </Button>
              </Label> */}
            </div>
          ) : (
            <div>
              <Heading fontSize="0.875em" mb="0.625rem" color="secondary">
                Have a Coupon Code?
              </Heading>
              <div className={`${styles.applyCouponWrapper}`}>
                <form onSubmit={this.handleApply}>
                  <input
                    className={styles.applyCopupnField}
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.coupon}
                    placeholder="Enter coupon code"
                  />
                  <Button
                    className={styles.applyCouponBtn}
                    btnType="primary"
                    color="#f98d29"
                    p="9px 20px"
                    fontSize="0.75rem"
                    disabled={loading}
                    fontFamily="regular"
                    borderRadius="0"
                    onClick={this.handleApply}
                  >
                    Apply
                  </Button>
                </form>
                {notifs.coupon && (
                  <Notifs namespace="coupon" NotifComponent={props => <LocalInlineNotification {...props} />} />
                )}
              </div>

              {/* <Label ta="center" color="primary" display="block" mt="5px" mb="0.9375rem">
                <Button onClick={this.toggleMoreCoupons} p="0" color="primary" size="block" btnType="link" ta="right">
                  {couponlistToggle ? 'Hide Coupons' : ' View Applicable Coupons'}
                </Button>
              </Label> */}
            </div>
          )}
          {/* {couponlistToggle && (
            <CouponList
              coupons={coupons}
              appliedCoupon={appliedCoupon}
              pincode={pincode}
              sessionId={sessionId}
              handleClick={this.handleClick}
              loading={getingcoupon}
              unapplicablecoupons={unapplicablecoupons}
            />
          )} */}
        </Div>
      </div>
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
