import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Heading from 'hometown-components/lib/Heading';
import { Label } from 'hometown-components/lib/Label';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import { applyCoupon, removeCoupon } from 'redux/modules/coupon';
import { updateCartSummary } from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';

const EditCouponIcon = require('../../../static/edit.svg');

const styles = require('./Coupon.scss');

@connect(({
  pincode, app, coupon, cart
}) => ({
  pincode: pincode.selectedPincode,
  sessionId: app.sessionId,
  coupon,
  cart
}))
class Coupon extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    coupon: '',
    // error: false,
    // errorMessage: '',
    applycoupon: false
  };
  componentWillReceiveProps(nextProps) {
    const { coupon } = nextProps;
    console.log(coupon);
    if (this.props.coupon.appliedCoupon !== coupon.appliedCoupon) {
      const { error, loaded, summary } = coupon;
      if (error && loaded) {
        // const { error_message: errorMsg } = errorMessage;
        console.log('setting Error');
        this.setState({
          // error: true
        });
      }
      if (!error && loaded) {
        const { dispatch } = this.context.store;
        this.setState({
          applycoupon: false
        });
        dispatch(updateCartSummary(summary));
      }
    }
  }

  handleChange = e => {
    this.setState({
      // error: false,
      coupon: e.target.value
    });
  };

  handleApply = () => {
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(applyCoupon(this.state.coupon, sessionId, pincode));
  };

  toggleCouponBox = () => {
    this.setState({
      applycoupon: true
    });
  };
  removeCoupon = coupon => {
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(removeCoupon(coupon, sessionId, pincode));
  };

  render() {
    const { cart, coupon } = this.props;
    const { summary: { coupon: appliedCoupon, coupon_discount: couponDiscount } } = cart;
    const { error, errorMessage: { error_message: errorMsg } } = coupon;

    const { applycoupon } = this.state;
    console.log(error, coupon);
    return (
      <div>
        <Div className={styles.applyCoupon}>
          {appliedCoupon && !applycoupon ? (
            <div className={`${styles.appliedCouponWrapper}`}>
              <p className={styles.appliedCoupon}>
                <span>{appliedCoupon}</span> Applied
                <button className={styles.couponEdit} onClick={this.toggleCouponBox}>
                  <img src={EditCouponIcon} alt="" />
                </button>
              </p>
              <p className={styles.appliedSaveRs}>
                Save <span>Rs. {formatAmount(couponDiscount)}</span>
              </p>
              <button onClick={() => this.removeCoupon(appliedCoupon)}>X</button>
            </div>
          ) : (
            <div>
              <Heading fontSize="0.875em" mb="0.625rem" color="secondary">
                APPLY COUPON
              </Heading>
              <div className={`${styles.applyCouponWrapper}`}>
                <input
                  className={styles.applyCopupnField}
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.coupon}
                  placeholder="Enter coupon code"
                />
                <Button
                  className={styles.applyCouponBtn}
                  btnType="link"
                  color="#ae8873"
                  fontWeight="semibold"
                  pl="0"
                  pr="0"
                  fontSize="0.75rem"
                  onClick={this.handleApply}
                >
                  Apply
                </Button>
                {error && <div>{errorMsg}</div>}
              </div>
            </div>
          )}
          <Label ta="center" display="block" mt="0.625rem" mb="0.625rem">
            OR
          </Label>
          <div className={`${styles.offerList} ${styles.active}`}>
            <ul>
              <li>
                <div className={styles.couponWrapper}>
                  <div className={styles.coupon}>
                    {/* eslint-disable */}
                    <div className="checkbox">
                      <input type="radio" id="checkbox" />
                      <label htmlFor="checkbox" />
                    </div>
                    <label htmlFor="checkbox" className={styles.couponCode}>
                      FURNROOMAA500
                    </label>
                    <label htmlFor="checkbox" className={styles.saveRs}>
                      Save <span>Rs. 383</span>
                    </label>
                  </div>
                  <p htmlFor="checkbox" className={styles.offerDetails}>
                    Rs.500 off on minimum purchase of Rs.1499.0
                  </p>
                  <p htmlFor="checkbox" className={styles.offerDetails}>
                    valid till 31st december,2018 Details
                  </p>
                  <ul className={styles.offerCondition}>
                    <li>This is special coupon and can be applied on select style only</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className={styles.couponWrapper}>
                  <div className={styles.coupon}>
                    {/* eslint-disable */}
                    <div className="checkbox">
                      <input type="radio" id="checkbox" />
                      <label htmlFor="checkbox" />
                    </div>
                    <label className={styles.couponCode}>FURNROOMAA500</label>
                    <label className={styles.saveRs}>
                      Save <span>Rs. 383</span>
                    </label>
                  </div>
                  <p className={styles.offerDetails}>Rs.500 off on minimum purchase of Rs.1499.0</p>
                  <p className={styles.offerDetails}>valid till 31st december,2018 Details</p>
                  <ul className={styles.offerCondition}>
                    <li>This is special coupon and can be applied on select style only</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className={styles.couponWrapper}>
                  <div className={styles.coupon}>
                    {/* eslint-disable */}
                    <div className="checkbox">
                      <input type="radio" id="checkbox" />
                      <label htmlFor="checkbox" />
                    </div>
                    <label className={styles.couponCode}>FURNROOMAA500</label>
                    <label className={styles.saveRs}>
                      Save <span>Rs. 383</span>
                    </label>
                  </div>
                  <p className={styles.offerDetails}>Rs.500 off on minimum purchase of Rs.1499.0</p>
                  <p className={styles.offerDetails}>valid till 31st december,2018 Details</p>
                  <ul className={styles.offerCondition}>
                    <li>This is special coupon and can be applied on select style only</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className={styles.couponWrapper}>
                  <div className={styles.coupon}>
                    {/* eslint-disable */}
                    <div className="checkbox">
                      <input type="radio" id="checkbox" />
                      <label htmlFor="checkbox" />
                    </div>
                    <label className={styles.couponCode}>FURNROOMAA500</label>
                    <label className={styles.saveRs}>
                      Save <span>Rs. 383</span>
                    </label>
                  </div>
                  <p className={styles.offerDetails}>Rs.500 off on minimum purchase of Rs.1499.0</p>
                  <p className={styles.offerDetails}>valid till 31st december,2018 Details</p>
                  <ul className={styles.offerCondition}>
                    <li>This is special coupon and can be applied on select style only</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </Div>
      </div>
    );
  }
}

Coupon.propTypes = {
  pincode: PropTypes.string,
  sessionId: PropTypes.string.isRequired,
  coupon: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired
};
Coupon.defaultProps = {
  pincode: ''
};
export default Coupon;
