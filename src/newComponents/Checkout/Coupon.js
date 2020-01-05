import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * modules / formatters
 */
import { applyCoupon, removeCoupon } from 'redux/modules/coupon';
import { toggleCouponList, hideCouponList } from 'redux/modules/cart';
import { formatAmount } from 'utils/formatters';

/**
 * Components
 */
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import InputField from 'hometown-components-dev/lib/InputFieldHtV1';
import LocalInlineNotification from '../../newComponents/LocalInlineNotification';
import CouponList from './CouponList';
import Notifs from '../../newComponents/Notifs';

/**
 * Icons
 */
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
      <Box className={styles.applyCoupon}>
        {appliedCoupon ? (
          <Box py={15}>
            <Button variant="link" onClick={() => this.removeCoupon(appliedCoupon)}>
              <Text display="flex" alignItems="center">
                <Image src={DiscountSuccessIcon} alt={appliedCoupon} mr={8} />
                Applied:{' '}
                <Text as="b" pl={4}>
                  {appliedCoupon}
                </Text>
              </Text>
              <Text color="primary" display="flex" alignItems="center" pl={28} pt={5}>
                Save <b>Rs. {formatAmount(couponDiscount)}</b>
                <Image
                  src={EditCouponIcon}
                  display="inline"
                  float="none"
                  va="sub"
                  width="18px"
                  ml="0.625rem"
                  alt="Change"
                />
              </Text>
            </Button>
          </Box>
        ) : (
          <Box pt={20}>
            <Heading fontSize={14} mb={4} color="primary">
              Have a Coupon Code?
            </Heading>
            <Box>
              <form onSubmit={this.handleApply}>
                <Flex alignItems="center">
                  <InputField
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.coupon.toUpperCase()}
                    placeholder="Enter here"
                    height={36}
                    width="80%"
                  />
                  <Button disabled={loading || (notifs.coupon && notifs.coupon.length > 0)} onClick={this.handleApply}>
                    Apply
                  </Button>
                </Flex>
              </form>
              {notifs.coupon && (
                <Notifs namespace="coupon" NotifComponent={props => <LocalInlineNotification {...props} />} />
              )}
            </Box>
          </Box>
        )}
        <Box textAlign="right" pb={10}>
          <Button
            onClick={this.toggleMoreCoupons}
            p="0"
            color="primary"
            variant="link"
            sx={{ textDecoration: 'underline' }}
          >
            {couponlistToggle ? 'Hide Coupons' : ' View Applicable Coupons'}
          </Button>
        </Box>
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
      </Box>
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
