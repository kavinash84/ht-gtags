import React from 'react';
import PropTypes from 'prop-types';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
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
      <BoxHtV1 className={`${styles.offerList} `}>
        {loading && (
          <LabelHtV1
            color="label"
            fontSize="0.875rem"
            fontFamily="medium"
            display="block"
            mt="0"
            mb="0.625rem"
            textAlign="left"
          >
            Loading......
          </LabelHtV1>
        )}
        {!loading && coupons.length === 0 && unapplicablecoupons.length !== 0 && (
          <BoxHtV1 className={styles.couponMessage} mb="1rem">
            <LabelHtV1
              color="label"
              fontSize="0.875rem"
              fontFamily="medium"
              display="block"
              mt="0"
              mb="0"
              textAlign="left"
            >
              No Coupons applicable for this order.
            </LabelHtV1>
          </BoxHtV1>
        )}
        {!loading && coupons.length === 0 && unapplicablecoupons.length === 0 && (
          <BoxHtV1 className={styles.couponMessage} mb="1rem">
            <LabelHtV1
              color="label"
              fontSize="0.875rem"
              fontFamily="medium"
              display="block"
              mt="0"
              mb="0"
              textAlign="left"
            >
              No Coupons Valid for this order
            </LabelHtV1>
          </BoxHtV1>
        )}
        {!loading && coupons.length > 0 && (
          <BoxHtV1 className={styles.applicableCouponsWrapper}>
            <LabelHtV1
              color="label"
              fontSize="0.75rem"
              fontFamily="medium"
              display="block"
              mt="0"
              mb="0.625rem"
              textAlign="left"
            >
              Choose a Valid Coupon
            </LabelHtV1>
            <ul className={styles.applicableCoupons}>
              {coupons.map((item, index) => (
                <li className={`${item.couponCode === appliedCoupon ? styles.active : ''}`} key={item.couponCode}>
                  <LabelHtV1 display="block" mt="0" mb="0" htmlFor={`coupon-${String(index)}`}>
                    <ButtonHtV1
                      onClick={() => {
                        handleClick(item.couponCode);
                      }}
                      btnType="link"
                      size="block"
                      p="0"
                      textAlign="left"
                    >
                      <BoxHtV1 className={styles.couponWrapper}>
                        <LabelHtV1 display="block" mt="0" mb="0">
                          <BoxHtV1 className={styles.coupon}>
                            <input
                              checked={item.couponCode.toLowerCase() === appliedCoupon.toLowerCase()}
                              type="radio"
                              name="coupons"
                              id={`coupon-${String(index)}`}
                            />
                            <LabelHtV1 className={styles.couponCode} ml="0.625rem">
                              {item.couponCode}
                            </LabelHtV1>
                            {item.discount_type === 'fixed' ? (
                              <LabelHtV1 className={styles.saveRs}>
                                Flat{' '}
                                <BoxHtV1>
                                  <b>Rs. {parseInt(item.discount_amount, 10)}</b>
                                </BoxHtV1>{' '}
                                OFF
                              </LabelHtV1>
                            ) : (
                              <LabelHtV1 className={styles.saveRs}>
                                Flat{' '}
                                <BoxHtV1>
                                  <b>{parseInt(item.discount_percentage, 10)} %</b>
                                </BoxHtV1>{' '}
                                Off
                              </LabelHtV1>
                            )}
                            <p className={styles.offerDetails}>{item.description}</p>
                          </BoxHtV1>
                        </LabelHtV1>
                      </BoxHtV1>
                    </ButtonHtV1>
                  </LabelHtV1>
                </li>
              ))}
            </ul>
          </BoxHtV1>
        )}
        {!loading && unapplicablecoupons.length > 0 && (
          <BoxHtV1 className={styles.unapplicableCouponsWrapper}>
            <LabelHtV1
              color="primary"
              fontSize="0.75rem"
              fontFamily="medium"
              display="block"
              mt="0"
              mb="0.625rem"
              textAlign="left"
            >
              Other Offers
            </LabelHtV1>
            <ul className={styles.unapplicableCoupons}>
              {unapplicablecoupons.map(item => (
                <li className={`${item.couponCode === appliedCoupon ? styles.active : ''}`} key={item.couponCode}>
                  <BoxHtV1 className={styles.couponWrapper}>
                    <BoxHtV1 className={styles.coupon}>
                      <LabelHtV1 htmlFor={item.couponCode} className={styles.couponCode} ml="0.625rem">
                        {item.couponCode}
                      </LabelHtV1>
                      {item.discount_type === 'fixed' ? (
                        <LabelHtV1 htmlFor={item.couponCode} className={styles.saveRs}>
                          Flat{' '}
                          <BoxHtV1>
                            <b>
                              Rs.
                              {parseInt(item.discount_amount, 10)}
                            </b>
                          </BoxHtV1>{' '}
                          OFF
                        </LabelHtV1>
                      ) : (
                        <LabelHtV1 htmlFor={item.couponCode} className={styles.saveRs}>
                          Flat{' '}
                          <BoxHtV1>
                            <b>{parseInt(item.discount_percentage, 10)} %</b>
                          </BoxHtV1>{' '}
                          Off
                        </LabelHtV1>
                      )}
                    </BoxHtV1>
                    <p htmlFor={item.couponCode} className={styles.offerDetails}>
                      {item.description}
                    </p>
                  </BoxHtV1>
                </li>
              ))}
            </ul>
          </BoxHtV1>
        )}
      </BoxHtV1>
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
