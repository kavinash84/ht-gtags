import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Div from "hometown-components-dev/lib/BoxHtV1";
import Heading from "hometown-components-dev/lib/HeadingHtV1";
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Label from "hometown-components-dev/lib/LabelHtV1";
import LocalInlineNotification from 'components/LocalInlineNotification';
import { applyCoupon, removeCoupon, loadCoupons } from 'redux/modules/coupon';
import { formatAmount } from 'utils/formatters';
import Notifs from '../../components/Notifs';

@connect(({ pincode, app, coupon, cart, notifs }) => ({
  pincode: pincode.selectedPincode,
  sessionId: app.sessionId,
  coupon,
  cart,
  notifs
}))
class Coupon extends Component {
  constructor(props) {
    super(props);
    this.couponInput = React.createRef();
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    coupon: ''
  };

  handleChange = e => {
    this.setState({
      coupon: e.target.value
    });
  };

  handleApply = () => {
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(applyCoupon(this.state.coupon, sessionId, pincode));
  };

  removeCoupon = coupon => {
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(removeCoupon(coupon, sessionId, pincode));
  };
  handleClick = coupon => {
    this.setState(
      {
        coupon
      },
      () => this.handleApply()
    );
  };
  componentDidMount() {
    if (this.couponInput.current) {
      this.couponInput.current.focus();
    }
    const { pincode, sessionId } = this.props;
    const { dispatch } = this.context.store;
    dispatch(loadCoupons(sessionId, pincode));
  }
  render() {
    const {
      cart,
      notifs,
      coupon: { loading, coupons, unapplicablecoupons }
    } = this.props;
    const {
      summary: { coupon: appliedCoupon, coupon_discount: couponDiscount }
    } = cart;
    const styles = require('./Coupon.scss');
    return (
      <Div type="block" mt="-1px">
        <div style={{ background: '#F2F2F2', paddingBottom: '23px' }}>
          <div className={`${styles.applyCouponWrapper}`}>
            {appliedCoupon && (
              <Label color="success" lh="1.5" ml="15px">
                {` Coupon code ${appliedCoupon} Applied Successfully, Discount Rs.${formatAmount(couponDiscount)}`}
              </Label>
            )}
            <form onSubmit={this.handleApply}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 15px' }}
              >
                <input
                  className={styles.applyCopupnField}
                  type="text"
                  placeholder="Enter coupon code"
                  onChange={this.handleChange}
                  value={this.state.coupon.toUpperCase() || appliedCoupon.toUpperCase()}
                  readOnly={!!appliedCoupon}
                  ref={this.couponInput}
                />
                <Button
                  className={styles.applyCouponBtn}
                  btnType="link"
                  color="#f98d29"
                  fontFamily="semibold"
                  pl="0"
                  pr="0"
                  fontSize="0.875rem"
                  disabled={loading || (notifs.coupon && notifs.coupon.length > 0)}
                  onClick={appliedCoupon ? () => this.removeCoupon(appliedCoupon) : this.handleApply}
                >
                  {appliedCoupon ? 'X Remove' : 'Apply'}
                </Button>
              </div>
              <div style={{ marginLeft: '25px', background: 'rgb(242, 242, 242)' }}>
                {notifs.coupon && (
                  <Notifs namespace="coupon" NotifComponent={props => <LocalInlineNotification {...props} />} />
                )}
              </div>
            </form>

            {/* {error && <div>{errorMsg}</div>} */}
          </div>
          {coupons.length > 0 && (
            <Div style={{ background: '#F2F2F2' }}>
              <Label
                ta="left"
                display="block"
                mt="0px"
                mb="10px"
                ml="15px"
                style={{ color: '#999999', fontSize: '14px' }}
              >
                Available Coupons
              </Label>
            </Div>
          )}
        </div>
        <Section pt="0.625rem" pb="4rem" mb="0" display="flex" height="calc(100vh - 94px)" of="auto">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <div className={styles.acSidebarDetails}>
              <Div col="12" mt="0" mb="2rem">
                <Div className={styles.applyCoupon}>
                  {
                    <Div className={`${styles.offerList} `}>
                      {coupons.length > 0 && (
                        <Div className={styles.applicableCouponsWrapper}>
                          <ul className={styles.applicableCoupons} style={{ border: 'none' }}>
                            {coupons.map((item, index) => (
                              <li key={String(index)}>
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    margin: '10px 0px'
                                  }}
                                >
                                  <div
                                    style={{
                                      border: '1px solid #707070',
                                      borderRadius: '5px',
                                      padding: '10px 15px',
                                      background: '#FFF8F4',
                                      color: '#707070',
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      textTransform: 'uppercase'
                                    }}
                                  >
                                    {item.couponCode}
                                  </div>
                                  <div
                                    style={{ color: '#F47020', fontSize: '14px' }}
                                    onClick={() => {
                                      this.handleClick(item.couponCode);
                                    }}
                                  >
                                    {item.couponCode.toLowerCase() === appliedCoupon.toLowerCase()
                                      ? 'Applied'
                                      : 'Apply'}
                                  </div>
                                </div>
                                <p className={styles.offerDetails}>{item.description}</p>
                              </li>
                            ))}
                          </ul>
                        </Div>
                      )}

                      {unapplicablecoupons.length > 0 && (
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
                            Other Offers
                          </Label>
                          <ul className={styles.unapplicableCoupons}>
                            {unapplicablecoupons.map(item => (
                              <li
                                className={`${item.couponCode === appliedCoupon ? styles.active : ''}`}
                                key={item.couponCode}
                              >
                                <div className={styles.couponWrapper}>
                                  <div className={styles.coupon}>
                                    <Label htmlFor={item.couponCode} className={styles.couponCode} ml="0.625rem">
                                      {item.couponCode}
                                    </Label>
                                    {item.discount_type === 'fixed' ? (
                                      <Label htmlFor={item.couponCode} className={styles.saveRs}>
                                        Flat{' '}
                                        <span>
                                          <b>Rs.{parseInt(item.discount_amount, 10)}</b>
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
                    </Div>
                  }
                </Div>
              </Div>
            </div>
          </Container>
        </Section>
      </Div>
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
