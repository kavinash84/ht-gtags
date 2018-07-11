import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Span from 'hometown-components/lib/Span';
import Button from 'hometown-components/lib/Buttons';
import { Label } from 'hometown-components/lib/Label';
import { formatAmount } from 'utils/formatters';

const styles = require('./OrderSummary.scss');
const EditCouponIcon = require('../../../static/edit.svg');

const OrderSummary = ({
  itemsTotal, savings, shipping, totalCart
}) => (
  <Div col="3">
    <Div className={styles.orderSummary}>
      <Heading fontSize="0.875em" mb="0.625rem" color="secondary">
        ORDER SUMMARY
      </Heading>
      <Div col="12">
        <Text color="rgba(0, 0, 0, 0.8);">
          Items
          <Span float="right" color="#000000" fontWeight="500">
            Rs. {itemsTotal ? formatAmount(itemsTotal) : null}
          </Span>
        </Text>
        <Text color="rgba(0, 0, 0, 0.8);">
          Savings
          <Span float="right" color="#000000" fontWeight="500">
            Rs. {savings ? formatAmount(savings) : null}
          </Span>
        </Text>
        <Text color="rgba(0, 0, 0, 0.8);">
          Shipping
          <Span float="right" color="#000000" fontWeight="500">
            {shipping === 0 ? 'Free' : shipping}
          </Span>
        </Text>
        <Text color="rgba(0, 0, 0, 0.8);">
          Total
          <Span float="right" color="#000000" fontWeight="500">
            Rs. {totalCart ? formatAmount(totalCart) : null}
          </Span>
        </Text>
      </Div>
      <Div col="12" mt="0.625rem">
        <Heading fontSize="0.875em" mb="0.625rem" color="secondary">
          APPLY COUPON
        </Heading>
        <Div className={styles.applyCoupon}>
          <div className={`${styles.appliedCouponWrapper} hide`}>
            <p className={styles.appliedCoupon}>
              <span>FURNROOMAA500</span> Applied
              <button className={styles.couponEdit}>
                <img src={EditCouponIcon} alt="" />
              </button>
            </p>
            <p className={styles.appliedSaveRs}>
              Save <span>Rs. 339</span>
            </p>
          </div>
          <div className={`${styles.applyCouponWrapper}`}>
            <input className={styles.applyCopupnField} type="text" placeholder="Enter coupon code" />
            <Button
              className={styles.applyCouponBtn}
              btnType="link"
              color="#ae8873"
              fontWeight="semibold"
              pl="0"
              pr="0"
              fontSize="0.75rem"
            >
              Apply
            </Button>
          </div>
          <Label ta="center" display="block" mt="0.625rem" mb="0.625rem">
            OR
          </Label>
          <div className={`${styles.offerList} ${styles.active}`}>
            <ul>
              <li>
                <div className={styles.couponWrapper}>
                  <p className={styles.coupon}>
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
                  </p>
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
                  <p className={styles.coupon}>
                    {/* eslint-disable */}
                    <div className="checkbox">
                      <input type="radio" id="checkbox" />
                      <label htmlFor="checkbox" />
                    </div>
                    <label className={styles.couponCode}>FURNROOMAA500</label>
                    <label className={styles.saveRs}>
                      Save <span>Rs. 383</span>
                    </label>
                  </p>
                  <p className={styles.offerDetails}>Rs.500 off on minimum purchase of Rs.1499.0</p>
                  <p className={styles.offerDetails}>valid till 31st december,2018 Details</p>
                  <ul className={styles.offerCondition}>
                    <li>This is special coupon and can be applied on select style only</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className={styles.couponWrapper}>
                  <p className={styles.coupon}>
                    {/* eslint-disable */}
                    <div className="checkbox">
                      <input type="radio" id="checkbox" />
                      <label htmlFor="checkbox" />
                    </div>
                    <label className={styles.couponCode}>FURNROOMAA500</label>
                    <label className={styles.saveRs}>
                      Save <span>Rs. 383</span>
                    </label>
                  </p>
                  <p className={styles.offerDetails}>Rs.500 off on minimum purchase of Rs.1499.0</p>
                  <p className={styles.offerDetails}>valid till 31st december,2018 Details</p>
                  <ul className={styles.offerCondition}>
                    <li>This is special coupon and can be applied on select style only</li>
                  </ul>
                </div>
              </li>
              <li>
                <div className={styles.couponWrapper}>
                  <p className={styles.coupon}>
                    {/* eslint-disable */}
                    <div className="checkbox">
                      <input type="radio" id="checkbox" />
                      <label htmlFor="checkbox" />
                    </div>
                    <label className={styles.couponCode}>FURNROOMAA500</label>
                    <label className={styles.saveRs}>
                      Save <span>Rs. 383</span>
                    </label>
                  </p>
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
      </Div>
      <Div col="12" mt="0.625rem">
        <Button
          size="block"
          btnType="primary"
          height="42px"
          mt="0.625rem"
          fontWeight="Light"
          fontSize="0.875rem"
          ls="1px"
        >
          CONTINUE
        </Button>
      </Div>
    </Div>
    <Div className={styles.questions}>
      <Text color="rgba(0, 0, 0, 0.5)" fontSize="0.875rem" fontWeight="600">
        Do you have Questions about your Order?
      </Text>
      <Text color="#646464" fontWeight="300">
        Call us: 18002100004 <br />
        E Mail: care@hometown.in
      </Text>
    </Div>
  </Div>
);

OrderSummary.propTypes = {
  itemsTotal: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  shipping: PropTypes.number.isRequired,
  totalCart: PropTypes.number.isRequired
};

export default OrderSummary;
