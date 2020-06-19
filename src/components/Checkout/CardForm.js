import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { setCardType } from 'redux/modules/paymentoptions';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

/**
 * Icons
 */
const aeIcon = require('../../../static/american-express.svg');
const dcIcon = require('../../../static/diners-club.svg');
const discoverIcon = require('../../../static/discover.svg');
const maestroIcon = require('../../../static/maestro.svg');
const mastercardIcon = require('../../../static/mastercard.svg');
const visaIcon = require('../../../static/visa.svg');
const cardIcon = require('../../../static/cardDefault.svg');

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const YEARS = [...Array(21)];

const CardImage = props => (
  <Image
    height={32}
    {...props}
    sx={{
      position: 'absolute',
      top: 30,
      right: 24
    }}
  />
);

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
  sessionId
}) => (
  <Box>
    <Flex alignItems="center">
      <Image src={visaIcon} alt="Visa Card" mr={16} height={40} />
      <Image src={maestroIcon} alt="Maestro" mr={16} height={40} />
      <Image src={mastercardIcon} alt="Master Card" mr={16} height={40} />
      <Image src={aeIcon} alt="Amex" mr={16} height={40} />
    </Flex>
    <Box mb={20}>
      <Text variant="small" color="blackLight">
        All Domestic & International cards accepted.
      </Text>
    </Box>
    <Row>
      <Col sx={{ position: 'relative' }} width={1}>
        <FormInput
          label="Card number"
          type="text"
          placeholder=""
          name="cardNumber"
          value={cardNumber}
          variant="input"
          onChange={onChangeDetails(setPaymentDetails, gateway)}
          onBlur={onGetCardType(getCardType, sessionId, gateway)}
        />
        {cardType === 'visa' && <CardImage src={visaIcon} alt="visaCard" />}
        {cardType === 'mast' && <CardImage src={mastercardIcon} alt="Master Card" />}
        {cardType === 'maestro' && <CardImage src={maestroIcon} alt="Maestro" />}
        {cardType === 'amex' && <CardImage src={aeIcon} alt="Amex" />}
        {cardType === 'discover' && <CardImage src={discoverIcon} alt="Discover Card" />}
        {cardType === 'diners' && <CardImage src={dcIcon} alt="Diners Club" />}
        {cardType === 'other' && <CardImage src={cardIcon} alt="Others" />}
      </Col>
    </Row>
    <Row>
      <Col variant="col-6" maxWidth="43%">
        <FormInput
          label="Name on card"
          type="text"
          placeholder=""
          value={nameOnCard}
          name="nameOnCard"
          variant="input"
          onChange={onChangeDetails(setPaymentDetails, gateway)}
        />
      </Col>
      <Col>
        <Label fontSize={14} mb={2}>
          Expiry Date
        </Label>
        <Row>
          <Col>
            <Box
              as="select"
              variant="input"
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
            </Box>
          </Col>
          <Col>
            <Box
              as="select"
              variant="input"
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
            </Box>
          </Col>
        </Row>
      </Col>
      <Col width="18%">
        <FormInput
          label="CVV"
          type="password"
          placeholder=""
          name="cvv"
          value={cvv}
          variant="input"
          onChange={onChangeDetails(setPaymentDetails, gateway)}
        />
      </Col>
    </Row>
  </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
