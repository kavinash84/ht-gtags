import React from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';
import { loadCoupons } from 'redux/modules/coupon';

import styles from './Coupon.scss';

class CouponList extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  componentWillMount() {
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(loadCoupons(sessionId, pincode));
  }
  render() {
    const {
      coupons, appliedCoupon, handleClick, loading, unapplicablecoupons
    } = this.props;
    return (
      <div className={`${styles.offerList} `}>
        <Div className={styles.couponMessage}>
          {loading && <span>Loading......</span>}
          {!loading &&
            coupons.length === 0 &&
            unapplicablecoupons.length === 0 && <span>Coupon not valid for this order</span>}
        </Div>
        {!loading &&
          coupons.length > 0 && (
          <Div className={styles.applicableCouponsWrapper}>
            <Label
              color="label"
              fontSize="0.75rem"
              fontFamily="medium"
              display="block"
              mt="0"
              mb="0.625rem"
              ta="left"
            >
                Choose a Valid Coupon
            </Label>
            <ul className={styles.applicableCoupons}>
              {coupons.map((item, index) => (
                <li className={`${item.couponCode === appliedCoupon ? styles.active : ''}`} key={item.couponCode}>
                  <Label display="block" mt="0" mb="0" htmlFor={`coupon-${String(index)}`}>
                    <Button
                      onClick={() => {
                        handleClick(item.couponCode);
                      }}
                      btnType="link"
                      size="block"
                      p="0"
                      ta="left"
                    >
                      <div className={styles.couponWrapper}>
                        <Label display="block" mt="0" mb="0">
                          <div className={styles.coupon}>
                            <input
                              checked={item.couponCode.toLowerCase() === appliedCoupon.toLowerCase()}
                              type="radio"
                              name="coupons"
                              id={`coupon-${String(index)}`}
                            />
                            <Label className={styles.couponCode} ml="0.625rem">
                              {item.couponCode}
                            </Label>
                            {item.discount_type === 'fixed' ? (
                              <Label className={styles.saveRs}>
                                  Flat{' '}
                                <span>
                                  <b>Rs. {parseInt(item.discount_amount, 10)}</b>
                                </span>{' '}
                                  OFF
                              </Label>
                            ) : (
                              <Label className={styles.saveRs}>
                                  Flat{' '}
                                <span>
                                  <b>{parseInt(item.discount_percentage, 10)} %</b>
                                </span>{' '}
                                  Off
                              </Label>
                            )}
                            <p className={styles.offerDetails}>{item.description}</p>
                          </div>
                        </Label>
                      </div>
                    </Button>
                  </Label>
                </li>
              ))}
            </ul>
          </Div>
        )}
        {!loading &&
          unapplicablecoupons.length > 0 && (
          <Div className={styles.unapplicableCouponsWrapper}>
            <Label
              color="primary"
              fontSize="0.75rem"
              fontFamily="medium"
              display="block"
              mt="0"
              mb="0.625rem"
              ta="left"
            >
                Coupon not valid for this order
            </Label>
            <ul className={styles.unapplicableCoupons}>
              {unapplicablecoupons.map(item => (
                <li className={`${item.couponCode === appliedCoupon ? styles.active : ''}`} key={item.couponCode}>
                  <div className={styles.couponWrapper}>
                    <div className={styles.coupon}>
                      <Label htmlFor={item.couponCode} className={styles.couponCode} ml="0.625rem">
                        {item.couponCode}
                      </Label>
                      {item.discount_type === 'fixed' ? (
                        <Label htmlFor={item.couponCode} className={styles.saveRs}>
                            Flat{' '}
                          <span>
                            <b>
                                Rs.
                              {parseInt(item.discount_amount, 10)}
                            </b>
                          </span>{' '}
                            OFF
                        </Label>
                      ) : (
                        <Label htmlFor={item.couponCode} className={styles.saveRs}>
                            Flat{' '}
                          <span>
                            <b>{parseInt(item.discount_percentage, 10)} %</b>
                          </span>{' '}
                            Off
                        </Label>
                      )}
                    </div>
                    <p htmlFor={item.couponCode} className={styles.offerDetails}>
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Div>
        )}
      </div>
    );
  }
}

CouponList.defaultProps = {
  coupons: [],
  appliedCoupon: '',
  loading: true,
  unapplicablecoupons: []
};
CouponList.propTypes = {
  coupons: PropTypes.array,
  appliedCoupon: PropTypes.string,
  pincode: PropTypes.string.isRequired,
  sessionId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  unapplicablecoupons: PropTypes.array
};
export default CouponList;
