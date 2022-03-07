import React, { Component } from 'react';
import Div from "hometown-components-dev/lib/BoxHtV1";
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Coupon from './Coupon';
import { formatAmount } from 'utils/formatters';

const SaleIcon = require('../../../static/cart/sale.svg');
const Arrowforword = require('../../../static/cart/arrowForword.svg');
const BackIcon = require('../../../static/cart/back.svg');
const CloseIcon = require('../../../static/cart/close.svg');

const styles = require('./Coupon.scss');

class ApplyCoupon extends Component {
  state = {
    open: false
  };
  onClick = e => {
    e.preventDefault();
    this.setState(prevState => ({
      open: !prevState.open
    }));
  };
  render() {
    const { price, coupon } = this.props;
    return (
      <Div col="12" p="22px 10px" style={{ background: 'white' }}>
        <div
          style={{
            border: '1px solid #E3E3E3',
            borderRadius: '8px',
            padding: '10px 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px',
            background: coupon ? '#FFF8F4' : ''
          }}
          onClick={this.onClick}
        >
          <img src={SaleIcon} alt="sale" />
          {!coupon ? (
            <span style={{ fontSize: '14px', color: '#999999' }}>Avail Offers/ Apply Coupon</span>
          ) : (
            <span style={{ fontSize: '14px', color: '#F47020' }}>
              <span style={{ textTransform: 'uppercase', fontSize: '14px', color: '#F47020' }}>{coupon}</span>{' '}
              <span style={{ fontSize: '14px', color: '#F47020' }}>Applied</span>
            </span>
          )}
          <img src={Arrowforword} alt="Arrow" />
        </div>
        {this.state.open && (
          <div className={`${styles.acSidebar} ${styles.show}`}>
            <div className={styles.acSidebarContainer}>
              <div
                className={styles.back}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px 20px',
                  background: '#F2F2F2',
                  margin: 0
                }}
              >
                <Button bg="transparent" border="none" onClick={this.onClick} p="0">
                  {' '}
                  <img src={BackIcon} alt="Close" />{' '}
                </Button>
                <Button bg="transparent" border="none" onClick={this.onClick} p="0">
                  {' '}
                  <img src={CloseIcon} alt="Close" />{' '}
                </Button>
              </div>
              <Coupon />
            </div>
          </div>
        )}
      </Div>
    );
  }
}

export default ApplyCoupon;
