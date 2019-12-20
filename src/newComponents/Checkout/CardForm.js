import React from 'react';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { setCardType } from 'redux/modules/paymentoptions';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';

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
  sessionId,
  padding
}) => (
  <BoxHtV1 className={styles.paymentBlock} p={padding}>
    <BoxHtV1 col="6" pr="1rem">
      <FormInput
        label="Name on card"
        type="text"
        placeholder=""
        value={nameOnCard}
        name="nameOnCard"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
      />
    </BoxHtV1>
    <BoxHtV1 col="6" pr="1rem" className={styles.cardFieldWrapper}>
      <FormInput
        label="Card number"
        type="text"
        placeholder=""
        name="cardNumber"
        value={cardNumber}
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        onBlur={onGetCardType(getCardType, sessionId, gateway)}
      />
      {cardType === 'visa' && <ImageHtV1 src={visaIcon} alt="visaCard" />}
      {cardType === 'mast' && <ImageHtV1 src={mastercardIcon} alt="Master Card" />}
      {cardType === 'maestro' && <ImageHtV1 src={maestroIcon} alt="Maestro" />}
      {cardType === 'amex' && <ImageHtV1 src={aeIcon} alt="Amex" />}
      {cardType === 'discover' && <ImageHtV1 src={discoverIcon} alt="Discover Card" />}
      {cardType === 'diners' && <ImageHtV1 src={dcIcon} alt="Diners Club" />}
      {cardType === 'other' && <ImageHtV1 src={cardIcon} alt="Others" />}
    </BoxHtV1>
    <BoxHtV1 col="3" pr="1rem">
      <FormInput
        label="CVV"
        type="password"
        placeholder=""
        name="cvv"
        value={cvv}
        onChange={onChangeDetails(setPaymentDetails, gateway)}
      />
    </BoxHtV1>
    <BoxHtV1 col="9">
      <LabelHtV1 color="secondary" mb="0.625rem">
        Expiry Date
      </LabelHtV1>
    </BoxHtV1>
    <BoxHtV1 col="7">
      <select
        className={styles.dropDown}
        name="expMonth"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        value={expMonth}
      >
        <option key="month" value="">
          MM
        </option>
        {MONTHS.map(month => (
          <option key={month}>{month}</option>
        ))}
      </select>
      <select
        className={styles.dropDown}
        name="expYear"
        onChange={onChangeDetails(setPaymentDetails, gateway)}
        value={expYear}
      >
        <option key="year" value="">
          YYYY
        </option>
        {YEARS.map((v, i) => (
          <option key={String(i)}>{new Date().getFullYear() + i}</option>
        ))}
      </select>
    </BoxHtV1>
    <BoxHtV1 col="12" mb="0" p="0">
      <TextHtV1 mt="1rem" fontSize="0.875rem" color="rgba(0,0,0,0.5)">
        International cards are also accepted.
      </TextHtV1>
    </BoxHtV1>
  </BoxHtV1>
);

CardForm.defaultProps = {
  cardType: 'other',
  sessionId: '',
  padding: '3.5rem 2rem'
};

CardForm.propTypes = {
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  getCardType: PropTypes.func.isRequired,
  sessionId: PropTypes.string,
  cardType: PropTypes.string,
  padding: PropTypes.string
};
export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
