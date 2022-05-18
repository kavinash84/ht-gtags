import React, { Component } from 'react';
import Div from "hometown-components-dev/lib/BoxHtV1";
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Coupon from './Coupon';
import { formatAmount } from 'utils/formatters';
import ResponsiveModal from "components/Modal";

const SaleIcon = require('../../../static/cart/sale.svg');
const Arrowforword = require('../../../static/cart/arrowForword.svg');
const BackIcon = require('../../../static/cart/back.svg');
const CloseIcon = require('../../../static/cart/close.svg');

const styles = require('./Coupon.scss');

class ApplyCoupon extends Component {
  state = {
    open: false,
    openModal: false
  };

  handleModal = () => {
    this.setState({
      openModal: !this.state.openModal
    });
  };

  // onClick = e => {
  //   e.preventDefault();
  //   this.setState(prevState => ({
  //     open: !prevState.open
  //   }));
  // };
  render() {
    const { price, coupon } = this.props;
    return (
      <Div col="12" p="22px 10px 15px" style={{ background: 'white' }}>
        <div
          style={{
            border: '1px solid #E3E3E3',
            borderRadius: '8px',
            padding: '10px 10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '15px',
            background: coupon ? '#FFF8F4' : '',
            cursor: 'pointer'
          }}
          onClick={this.handleModal}
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
        <ResponsiveModal
            classNames={{ modal: "couponmodal" }}
            onCloseModal={this.handleModal}
            open={this.state.openModal}
            style={{ padding: "0rem" }}
          >
          <div>
            <div>
              <div
                className={styles.back}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 50px',
                  background: '#F2F2F2',
                  margin: 0,
                  borderTopRightRadius:'20px',
                  borderTopLeftRadius:'20px'
                }}
              >
              </div>
              <Coupon />
            </div>
          </div>
          </ResponsiveModal>
      </Div>
    );
  }
}

export default ApplyCoupon;
