import React from 'react';
import PropTypes from 'prop-types';
import Button from 'hometown-components/lib/Buttons';
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
        {loading && <span>Loading......</span>}
        {!loading && !coupons.length > 0 && <span>Sorry No Coupon Found ! </span>}
        {!loading &&
          coupons.length > 0 && (
          <ul>
            {coupons.map(item => (
              <li className={`${item.couponCode === appliedCoupon ? styles.active : ''}`} key={item.couponCode}>
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
                    <div className={styles.coupon}>
                      <Label htmlFor="checkbox" className={styles.couponCode}>
                        {item.couponCode}
                      </Label>
                      {item.discount_type === 'fixed' ? (
                        <Label htmlFor="checkbox" className={styles.saveRs}>
                            Flat{' '}
                          <span>
                            <b>Rs. {parseInt(item.discount_amount, 10)}</b>
                          </span>{' '}
                            OFF
                        </Label>
                      ) : (
                        <Label htmlFor="checkbox" className={styles.saveRs}>
                            Flat{' '}
                          <span>
                            <b>{parseInt(item.discount_percentage, 10)} %</b>
                          </span>{' '}
                            Off
                        </Label>
                      )}
                    </div>
                    <p htmlFor="checkbox" className={styles.offerDetails}>
                      {item.description}
                    </p>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        )}

        {!loading &&
          unapplicablecoupons.length > 0 && (
          <div>
            <Label ta="center" display="block" mt="1.5rem" mb="1.5rem">
                NON APPLICABLE COUPONS PLEASE UPGRADE YOUR CART
            </Label>
            <div className={`${styles.offerList} `}>
              <ul>
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
            </div>
          </div>
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
