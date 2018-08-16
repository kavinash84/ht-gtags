import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import Span from 'hometown-components/lib/Span';
import Theme from 'hometown-components/lib/Theme';
import LocalInlineNotification from 'components/LocalInlineNotification';
import { applyCoupon, removeCoupon } from 'redux/modules/coupon';
import { updateCartSummary } from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';
import Notifs from '../../components/Notifs';

const EditCouponIcon = require('../../../static/edit.svg');
const DiscountSuccessIcon = require('../../../static/percentage-green.svg');
const CloseIcon = require('../../../static/close-icon.svg');

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
    coupon: '',
    // error: false,
    // errorMessage: '',
    applycoupon: false
  };
  componentWillReceiveProps(nextProps) {
    const { coupon } = nextProps;
    if (this.props.coupon.appliedCoupon !== coupon.appliedCoupon) {
      const { error, loaded, summary } = coupon;
      if (error && loaded) {
        // const { error_message: errorMsg } = errorMessage;
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
    const { cart, notifs } = this.props;
    const { summary: { coupon: appliedCoupon, coupon_discount: couponDiscount } } = cart;
    const { applycoupon } = this.state;

    return (
      <div>
        <Div className={styles.applyCoupon}>
          {appliedCoupon && !applycoupon ? (
            <div className={styles.appliedCouponWrapper}>
              <Button
                display="block"
                btnType="link"
                fontWeight="Light"
                pl="0"
                pr="0"
                fontSize="1rem"
                ta="left"
                color={Theme.colors.primary}
                onClick={this.toggleCouponBox}
              >
                <Img src={DiscountSuccessIcon} float="left" mr="0.625rem" mb="1rem" mt="3px" alt="" />
                Applied: <b>{appliedCoupon}</b> <br />
                <Span fontSize="0.875em" color={Theme.colors.primary}>
                  Save <b>Rs. {formatAmount(couponDiscount)}</b>
                </Span>
                <Img src={EditCouponIcon} display="inline" float="none" va="sub" width="18px" ml="0.3125rem" alt="" />
              </Button>

              <Button
                btnType="link"
                mt="30px"
                p="0"
                className="pull-right"
                onClick={() => this.removeCoupon(appliedCoupon)}
              >
                <Img src={CloseIcon} alt="Close" />
              </Button>
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
                  color="#f98d29"
                  fontWeight="semibold"
                  pl="0"
                  pr="0"
                  fontSize="0.75rem"
                  onClick={this.handleApply}
                >
                  Apply
                </Button>
                {notifs.coupon && (
                  <Notifs namespace="coupon" NotifComponent={props => <LocalInlineNotification {...props} />} />
                )}
                {/* {error && <div>{errorMsg}</div>} */}
              </div>
            </div>
          )}
          {/* <Label ta="center" display="block" mt="0.625rem" mb="0.625rem">
            OR
          </Label>
          <div className={`${styles.offerList} ${styles.active}`}>
            <ul>
              <li>
                <div className={styles.couponWrapper}>
                  <div className={styles.coupon}>
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
            </ul>
          </div> */}
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
