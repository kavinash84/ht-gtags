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
const mcIcon = require('../../../static/master-card.jpg');
const visaIcon = require('../../../static/visa.jpg');
const maestroIcon = require('../../../static/maestro.jpg');

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const YEARS = [...Array(21)];

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};
const mapStateToProps = ({ paymentoptions, app }) => ({
  details: paymentoptions.paymentMethodDetails.DebitCard,
  sessionId: app.sessionId,
  cardType: paymentoptions.cardType
});

const onGetCardType = (dispatcher, sessionId, gateway) => e => {
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
        onBlur={onGetCardType(getCardType, sessionId, gateway)}
      />
    </Div>
    <Div col="5" pr="1rem">
      <FormInput
        label="Card number"
        type="number"
        placeholder=""
        name="cardNumber"
        value={cardNumber}
        onChange={onChangeDetails(setPaymentDetails, gateway)}
      />
      {cardType === 'VISA' && <Img src={visaIcon} alt="visaCard" />}
      {cardType === 'MAST' && <Img src={mcIcon} alt="visaCard" />}
      {cardType === 'MAESTRO' && <Img src={maestroIcon} alt="visaCard" />}
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
        <option key="year">YY</option>
        {YEARS.map((v, i) => <option key={String(i)}>{new Date().getFullYear() + i}</option>)}
      </select>
    </Div>
  </Div>
);

CardForm.defaultProps = {
  cardType: 'visa',
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
