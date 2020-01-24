import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

/**
 * Icons
 */
const creditcardIcon = require('../../../static/credit-card.png');
const debitcardIcon = require('../../../static/debit-card.png');
const intBankingIcon = require('../../../static/net-banking-icon.png');
const emiIcon = require('../../../static/emi.png');
const walletIcon = require('../../../static/wallet.png');

const initial = {
  CreditCard: {
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: '',
    type: 'other'
  },
  DebitCard: {
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: '',
    type: 'other'
  },
  Emi: {
    nameOnCard: '',
    cardNumber: '',
    type: 'other',
    cvv: '',
    expMonth: '',
    expYear: '',
    emiBank: '',
    emiCode: ''
  },
  NetBanking: {
    bankCode: ''
  },
  Wallet: {
    walletName: ''
  },
  EasyEmi: {
    cardNumber: '',
    type: 'other',
    is_seamless: 1,
    session: '',
    easyemi_otp_code: '',
    easyEmiConfig: '',
    gateway: ''
  }
};

const PaymentInputRadio = props => (
  <Box
    as="input"
    type="radio"
    name="paymentOption"
    display="none"
    sx={{
      '&:checked + label': {
        color: 'primary',
        boxShadow: '0px 1px #fff',
        borderTop: 'heading',
        borderLeft: 'heading',
        borderRight: 'heading'
      }
    }}
    {...props}
  />
);

const PaymentTab = ({ title, imageUrl, ...props }) => (
  <Label
    htmlFor="CreditCard"
    alignItems="center"
    display="flex"
    variant="small"
    py={12}
    px={16}
    sx={{
      textTransform: 'uppercase',
      cursor: 'pointer',
      borderTop: 'transparent',
      borderLeft: 'transparent',
      borderRight: 'transparent'
    }}
    {...props}
  >
    <Image height="20px" mr="10px" src={imageUrl} alt={title} />
    {title}
  </Label>
);

PaymentTab.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

const onChangeGateway = (dispatcher, value, session) => () => {
  // Disabling this api call under api migration as this api has no use in backend
  dispatcher(value, initial[value], session);
};

const CommonPayments = (paymentType, onChange, selectedGateway, session, resetEasyEmi) => {
  switch (paymentType) {
    case 'CreditCard':
      return (
        <Fragment key={paymentType}>
          <PaymentInputRadio
            value="CreditCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <PaymentTab
            title="Credit Card"
            imageUrl={creditcardIcon}
            htmlFor="CreditCard"
            onClick={onChangeGateway(onChange, paymentType, session)}
          />
        </Fragment>
      );
    case 'DebitCard':
      return (
        <Fragment key={paymentType}>
          <PaymentInputRadio
            value="DebitCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <PaymentTab
            title="Debit Card"
            imageUrl={debitcardIcon}
            htmlFor="DebitCard"
            onClick={onChangeGateway(onChange, paymentType, session)}
          />
        </Fragment>
      );
    case 'NetBanking':
      return (
        <Fragment key={paymentType}>
          <PaymentInputRadio
            value="NetBanking"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <PaymentTab
            title="Internet Banking"
            imageUrl={intBankingIcon}
            htmlFor="paymentIB"
            onClick={onChangeGateway(onChange, paymentType, session)}
          />
        </Fragment>
      );
    case 'Emi':
      return (
        <Fragment key={paymentType}>
          <PaymentInputRadio
            value="Emi"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <PaymentTab
            title="EMI"
            imageUrl={emiIcon}
            htmlFor="paymentEmi"
            onClick={onChangeGateway(onChange, paymentType, session)}
          />
        </Fragment>
      );
    case 'Wallet':
      return (
        <Fragment key={paymentType}>
          <PaymentInputRadio
            value="Wallet"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <PaymentTab
            title="Wallet"
            imageUrl={walletIcon}
            htmlFor="paymentWallet"
            onClick={onChangeGateway(onChange, paymentType, session)}
          />
        </Fragment>
      );
    case 'EasyEmi':
      return (
        <Fragment key={paymentType}>
          <PaymentInputRadio
            value="EasyEmi"
            checked={selectedGateway === paymentType}
            onChange={() => {
              resetEasyEmi();
              onChangeGateway(onChange, paymentType, session)();
            }}
          />
          <PaymentTab
            title="Bajaj Finance EMI"
            imageUrl={emiIcon}
            htmlFor="paymentEasyEmi"
            onClick={onChangeGateway(onChange, paymentType, session)}
          />
        </Fragment>
      );
    default:
      return null;
  }
};

export default CommonPayments;
