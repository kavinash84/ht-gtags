import React from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import { loadCoupons } from 'redux/modules/coupon';

import styles from './Coupon.scss';

const NotificationText = props => (
  <Box px={10} py={10} bg="#fff7f0" sx={{ border: 'primary' }}>
    <Text variant="heading.small" {...props} />
  </Box>
);

NotificationText.propTypes = {
  text: PropTypes.string.isRequired
};

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
      <Box py={10}>
        {loading && <NotificationText>Coupons Loading......</NotificationText>}
        {!loading && coupons.length === 0 && unapplicablecoupons.length !== 0 && (
          <NotificationText>No Coupons applicable for this order.</NotificationText>
        )}
        {!loading && coupons.length === 0 && unapplicablecoupons.length === 0 && (
          <NotificationText>No Coupons Valid for this order</NotificationText>
        )}
        {!loading && coupons.length > 0 && (
          <Box>
            <Text fontSize={14} fontFamily="medium" mb={10}>
              Choose a Valid Coupon
            </Text>
            <Box sx={{ border: 'dividerLight' }}>
              {coupons.map((item, index) => (
                <Box
                  className={`${item.couponCode === appliedCoupon ? styles.active : ''}`}
                  key={item.couponCode}
                  px={10}
                  py={10}
                  sx={{ orderBottom: 'dividerLight' }}
                >
                  <Label
                    htmlFor={`coupon-${String(index)}`}
                    onClick={() => {
                      handleClick(item.couponCode);
                    }}
                  >
                    <Flex alignItems="center">
                      <input
                        checked={item.couponCode.toLowerCase() === appliedCoupon.toLowerCase()}
                        type="radio"
                        name="coupons"
                        id={`coupon-${String(index)}`}
                      />
                      <Text
                        variant="small"
                        as="span"
                        mx={10}
                        px={8}
                        py={8}
                        sx={{
                          border: '1px dashed #d5d5d5',
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.couponCode}
                      </Text>
                      <Text as="span" variant="small">
                        Flat{' '}
                        <b>
                          {item.discount_type === 'fixed'
                            ? `Rs. ${parseInt(item.discount_amount, 10)}`
                            : `${parseInt(item.discount_percentage, 10)} %`}
                        </b>{' '}
                        OFF
                      </Text>
                    </Flex>
                    <Text pt={10} pl={28}>
                      {item.description}
                    </Text>
                  </Label>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {!loading && unapplicablecoupons.length > 0 && (
          <Box>
            <Text fontSize={14} fontFamily="medium" mb={10}>
              Other Offers
            </Text>
            <Box sx={{ border: 'dividerLight' }}>
              {unapplicablecoupons.map((item, index) => (
                <Box
                  className={`${item.couponCode === appliedCoupon ? styles.active : ''}`}
                  key={item.couponCode}
                  px={10}
                  py={10}
                  sx={{ orderBottom: 'dividerLight' }}
                >
                  <Label
                    htmlFor={`coupon-${String(index)}`}
                    onClick={() => {
                      handleClick(item.couponCode);
                    }}
                  >
                    <Flex alignItems="center">
                      <input
                        checked={item.couponCode.toLowerCase() === appliedCoupon.toLowerCase()}
                        type="radio"
                        name="coupons"
                        id={`coupon-${String(index)}`}
                      />
                      <Text
                        variant="small"
                        as="span"
                        mx={10}
                        px={8}
                        py={8}
                        sx={{
                          border: '1px dashed #d5d5d5',
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.couponCode}
                      </Text>
                      <Text as="span" variant="small">
                        Flat{' '}
                        <b>
                          {item.discount_type === 'fixed'
                            ? `Rs. ${parseInt(item.discount_amount, 10)}`
                            : `${parseInt(item.discount_percentage, 10)} %`}
                        </b>{' '}
                        OFF
                      </Text>
                    </Flex>
                    <Text pt={10} pl={28}>
                      {item.description}
                    </Text>
                  </Label>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
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
