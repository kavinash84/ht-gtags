import React from 'react';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Label } from 'hometown-components/lib/Label';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Img from 'hometown-components/lib/Img';

const styles = require('./Checkout.scss');
const mcIcon = require('../../../static/master-card.jpg');
// const visaIcon = require('../../../static/visa.jpg');
// const maestroIcon = require('../../../static/maestro.jpg');

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const YEARS = [...Array(21)];

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};
const mapStateToProps = ({ paymentoptions }) => ({
  details: paymentoptions.paymentMethodDetails.CreditCard
});

const CardForm = ({ gateway, setPaymentDetails, details: { nameOnCard, cardNumber, cvv } }) => (
  <Div className={styles.paymentBlock}>
    <Div col="5" pr="1rem">
      <FormInput
        label="Name on card"
        type="text"
        placeholder=""
        value={nameOnCard}
        name="nameOnCard"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
      />
    </Div>
    <Div col="5" pr="1rem" className={styles.cardFieldWrapper}>
      <FormInput
        label="Card number"
        type="text"
        placeholder=""
        name="cardNumber"
        value={cardNumber}
        onChange={onChangeDetails(setPaymentDetails, gateway)}
      />
      <Img src={mcIcon} alt="" />
    </Div>
    <Div col="2">
      <FormInput
        label="CVV"
        type="text"
        placeholder=""
        name="cvv"
        value={cvv}
        onChange={onChangeDetails(setPaymentDetails, gateway)}
      />
    </Div>
    <Div col="12">
      <Label color="secondary" mb="0.625rem">
        Expiration Date
      </Label>
    </Div>
    <Div col="5">
      <select className={styles.dropDown} name="expMonth" onChange={onChangeDetails(setPaymentDetails, gateway)}>
        <option key="month">MM</option>
        {MONTHS.map(month => <option key={month}>{month}</option>)}
      </select>
      <select className={styles.dropDown} name="expYear" onChange={onChangeDetails(setPaymentDetails, gateway)}>
        <option key="year">YY</option>
        {YEARS.map((v, i) => <option key={String(i)}>{new Date().getYear() + (i - 100)}</option>)}
      </select>
    </Div>
  </Div>
);

CardForm.propTypes = {
  gateway: PropTypes.func.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired
};
export default connect(
  mapStateToProps,
  null
)(CardForm);