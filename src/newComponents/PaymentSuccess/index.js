import React from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmerHtV1';
import ShippedTo from 'hometown-components-dev/lib/ShippedToHtV1';
import { formatAmount } from 'utils/formatters';
import Oops from './Oops';

const styles = require('./PaymentSuccess.scss');
const PaymentSuccessIcon = require('../../../static/success.svg');

/* eslint-disable camelcase */
const PaymentSuccess = ({
  data: {
    order_no,
    order_date,
    shipping_address,
    cart_products,
    sub_total_amount,
    shipping_charges,
    discount_coupon_value,
    net_order_amount,
    set_discount
  },
  loaded,
  error
}) => {
  if (loaded && !error && shipping_address) {
    const {
 first_name, last_name, address1, city, postcode, state
} = shipping_address;
    return (
      <Box>
        <Row mx={0}>
          <Box col="12">
            <Img width="4.5rem" mr="1rem" float="left" src={PaymentSuccessIcon} alt="Test" />
            <Heading mt="0.625rem" mb="0.3125rem">
              Thank you for placing your order.
            </Heading>
            <Text fontSize="1rem" mb="0" mt="0">
              Your order number is <b>{order_no}</b> placed on &nbsp;
              <b>{order_date}</b>. You will shortly receive an e-mail and SMS confirming your order.
            </Text>
          </Box>
        </Row>
        <Row mx={0}>
          <Box col="3" pr="1.5rem" pt="0">
            <ShippedTo
              name={`${first_name || ''} ${last_name || ''}`}
              address={address1}
              city={city}
              pincode={postcode}
              state={state}
              edit={false}
            />
          </Box>
          <Row col="9" pt="0">
            <Row mr="0" ml="0" mb="1rem">
              <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="regular">
                Order Information
              </Heading>
            </Row>
            <Row mb={15}>
              <Box col="12">
                <table className="table">
                  <tbody>
                    <tr>
                      <th colSpan="2">Product</th>
                      <th>Delivery</th>
                      <th width="100px">Quantity</th>
                      <th width="150px" align="right">
                        Cost
                      </th>
                    </tr>
                    {cart_products.map((product, index) => (
                      <tr key={String(index)}>
                        <td>
                          <ImageShimmer src={product.image_url} height="60px">
                            {imageURL => <img className="thumb" src={imageURL} alt={product.name} />}
                          </ImageShimmer>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.delivery_text}</td>
                        <td>{product.qty}</td>
                        <td align="right">Rs. {formatAmount(product.total_price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Row>
            <Row mb={15}>
              <Box col="8" />
              <Box col="4" ta="right">
                <Box className={styles.totalAmountRow}>
                  Sub-Total Amount : Rs. <b>{formatAmount(sub_total_amount)}</b>
                </Box>
                <Box className={styles.totalAmountRow}>
                  Shipping Charges : Rs. <b>{formatAmount(shipping_charges)}</b>
                </Box>
                <Box className={styles.totalAmountRow}>
                  Discount / Coupon Value : Rs. <b>{formatAmount(discount_coupon_value)}</b>
                </Box>
                {set_discount ? (
                  <Box className={styles.totalAmountRow}>
                    Combo Discount : Rs. <b>{formatAmount(Math.abs(set_discount))}</b>
                  </Box>
                ) : (
                  ''
                )}
                <Box className={styles.totalAmountRow}>
                  Net Order Amount : Rs. <b>{formatAmount(net_order_amount)}</b>
                </Box>
              </Box>
            </Row>
          </Row>
        </Row>
      </Box>
    );
  }
  return <Oops />;
};

PaymentSuccess.defaultProps = {
  data: {
    order_date: '',
    shipping_address: {
      first_name: '',
      last_name: '',
      address1: '',
      city: '',
      postcode: '',
      state: ''
    },
    sub_total_amount: 0,
    shipping_charges: 0,
    discount_coupon_value: 0,
    set_discount: 0,
    net_order_amount: 0,
    cart_products: []
  },
  loaded: false,
  error: ''
};

PaymentSuccess.propTypes = {
  data: PropTypes.shape({
    order_no: PropTypes.string.isRequired,
    order_date: PropTypes.string,
    shipping_address: PropTypes.shape({
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      address1: PropTypes.string,
      city: PropTypes.string,
      postcode: PropTypes.string,
      state: PropTypes.string
    }),
    cart_products: PropTypes.array,
    sub_total_amount: PropTypes.number,
    shipping_charges: PropTypes.number,
    discount_coupon_value: PropTypes.number,
    set_discount: PropTypes.number,
    net_order_amount: PropTypes.number
  }),
  loaded: PropTypes.bool,
  error: PropTypes.string
};

export default PaymentSuccess;
