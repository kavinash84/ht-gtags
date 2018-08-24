import React from 'react';
import Div from 'hometown-components/lib/Div';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { setCardType } from 'redux/modules/paymentoptions';
import Img from 'hometown-components/lib/Img';
import { Label } from 'hometown-components/lib/Label';
import FormInput from 'hometown-components/lib/Forms/FormInput';

const styles = require('./Checkout.scss');

const aeIcon = require('../../../static/american-express.svg');
const dcIcon = require('../../../static/diners-club.svg');
const discoverIcon = require('../../../static/discover.svg');
const maestroIcon = require('../../../static/maestro.svg');
const mastercardIcon = require('../../../static/mastercard.svg');
const visaIcon = require('../../../static/visa.svg');
const cardIcon = require('../../../static/cardDefault.svg');

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const YEARS = [...Array(21)];

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const mapStateToProps = ({ paymentoptions, app }) => ({
  details: paymentoptions.paymentMethodDetails[paymentoptions.selectedGateway],
  sessionId: app.sessionId,
  cardType: paymentoptions.cardType,
  selectedGateway: paymentoptions.selectedGateway
});

const onGetCardType = (dispatcher, sessionId, gateway) => e => {
  console.log(e.target.value);
  const { value } = e.target;
  dispatcher(value, sessionId, gateway);
};

const mapDispatchToProps = dispatch => bindActionCreators({ getCardType: setCardType }, dispatch);

const CardForm = ({
  gateway,
  setPaymentDetails,
  details: {
    nameOnCard, cardNumber, cvv, expMonth, expYear
  },
  getCardType,
  cardType,
  sessionId
}) => (
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
        type="number"
        placeholder=""
        name="cardNumber"
        value={cardNumber}
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        onBlur={onGetCardType(getCardType, sessionId, gateway)}
      />
      {cardType === 'visa' && <Img src={visaIcon} alt="visaCard" />}
      {cardType === 'mast' && <Img src={mastercardIcon} alt="Master Card" />}
      {cardType === 'maestro' && <Img src={maestroIcon} alt="Maestro" />}
      {cardType === 'amex' && <Img src={aeIcon} alt="Amex" />}
      {cardType === 'discover' && <Img src={discoverIcon} alt="Discover Card" />}
      {cardType === 'diners' && <Img src={dcIcon} alt="Diners Club" />}
      {cardType === 'other' && <Img src={cardIcon} alt="Others" />}
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
      <select
        className={styles.dropDown}
        name="expMonth"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        value={expMonth}
      >
        <option key="month">MM</option>
        {MONTHS.map(month => <option key={month}>{month}</option>)}
      </select>
      <select
        className={styles.dropDown}
        name="expYear"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        value={expYear}
      >
        <option key="year">YYYY</option>
        {YEARS.map((v, i) => <option key={String(i)}>{new Date().getFullYear() + i}</option>)}
      </select>
    </Div>
  </Div>
);

CardForm.defaultProps = {
  cardType: 'other',
  sessionId: ''
};

CardForm.propTypes = {
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  getCardType: PropTypes.func.isRequired,
  sessionId: PropTypes.string,
  cardType: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardForm);
