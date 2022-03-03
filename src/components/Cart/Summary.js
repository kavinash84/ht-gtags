import React from "react";
import { formatAmount } from "utils/formatters";

const styles = require("./Cart.scss");

const PriceSummary = ({ summaryPrice }) => {
  const {
    coupon_discount,
    items,
    savings,
    shipping_charges,
    total,
    gift_wrap_amount,
    is_gift_wrap_applied,
    combined_set_discount
  } = summaryPrice;
  return (
    <div className={styles.PriceSummary_comtaimer}>
      <div className={styles.PriceSummary}>
        <div className={styles.individualPrice}>
          <div className={styles.price_label}>MRP</div>
          <div className={styles.price}>₹{items ? formatAmount(items) : 0}</div>
        </div>
        <div className={styles.individualPrice}>
          <div className={styles.price_label}>Discount</div>
          <div className={styles.price}>
            {savings ? "-" : ""}₹{savings ? formatAmount(savings) : 0}
          </div>
        </div>
        <div className={styles.individualPrice}>
          <div className={styles.price_label}>Delivery Fee</div>
          <div className={styles.price}>
            ₹{shipping_charges ? formatAmount(shipping_charges) : 0}
          </div>
        </div>
        {is_gift_wrap_applied && (
          <div className={styles.individualPrice}>
            <div className={styles.price_label}>Gift Wrap Fee</div>
            <div className={styles.price}>
              ₹{gift_wrap_amount ? formatAmount(gift_wrap_amount) : 0}
            </div>
          </div>
        )}
        <div className={styles.devider} />
        {/* <div className={styles.individualPrice}>
          <div className={styles.price_label}>Final Price</div>
          <div className={styles.price}>
            ₹{total ? formatAmount(total + coupon_discount) : 0}
          </div>
        </div> */}
        {/* <div className={styles.devider} /> */}
        <div className={styles.individualPrice}>
          <div className={styles.price_label}>Coupon Discount</div>
          <div className={styles.price} style={{ color: "#F47020" }}>
            ₹{coupon_discount ? formatAmount(coupon_discount) : 0}
          </div>
        </div>
        {combined_set_discount ? (
          <div className={styles.individualPrice}>
            <div className={styles.price_label}>Combo Discount</div>
            <div className={styles.price} style={{ color: "#F47020" }}>
              ₹{combined_set_discount ? formatAmount(combined_set_discount) : 0}
            </div>
          </div>
        ) : null}
        <div className={styles.devider} />
        <div className={styles.individualPrice}>
          <div
            className={styles.price_label}
            style={{ color: "black", fontWeight: 600 }}
          >
            Final Price
          </div>
          <div className={styles.price}>₹{total ? formatAmount(total) : 0}</div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
