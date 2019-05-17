import React from 'react';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import { Label } from 'hometown-components/lib/Label';

const styles = require('./CommonPayments.scss');

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

const onChangeGateway = (dispatcher, value, session) => () => {
  dispatcher(value, initial[value], session);
};

const CommonPayments = (paymentType, onChange, selectedGateway, session, resetEasyEmi) => {
  switch (paymentType) {
    case 'CreditCard':
      return (
        <Div col="12" key={paymentType} className={styles.paymentOptions}>
          <input
            type="radio"
            name="paymentOption"
            value="CreditCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <Label
            htmlFor="CreditCard"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img
              height="20px"
              width="auto"
              float="left"
              mr="10px"
              top="-2px"
              position="relative"
              src={creditcardIcon}
              alt="Credit Card"
            />
            Credit Card
          </Label>
        </Div>
      );
    case 'DebitCard':
      return (
        <Div col="12" key={paymentType} className={styles.paymentOptions}>
          <input
            type="radio"
            name="paymentOption"
            value="DebitCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <Label
            htmlFor="DebitCard"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img
              height="20px"
              width="auto"
              float="left"
              mr="10px"
              top="-2px"
              position="relative"
              src={debitcardIcon}
              alt="Debit Card"
            />
            Debit Card
          </Label>
        </Div>
      );
    case 'NetBanking':
      return (
        <Div col="12" key={paymentType} className={styles.paymentOptions}>
          <input
            type="radio"
            name="paymentOption"
            value="NetBanking"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <Label
            htmlFor="paymentIB"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img
              height="20px"
              width="auto"
              float="left"
              mr="10px"
              top="-2px"
              position="relative"
              src={intBankingIcon}
              alt="Internet Banking"
            />
            Internet Banking
          </Label>
        </Div>
      );
    case 'Emi':
      return (
        <Div col="12" key={paymentType} className={styles.paymentOptions}>
          <input
            type="radio"
            name="paymentOption"
            value="Emi"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <Label
            htmlFor="paymentEmi"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img
              height="20px"
              width="auto"
              float="left"
              mr="10px"
              top="-2px"
              position="relative"
              src={emiIcon}
              alt="EMI"
            />
            EMI
          </Label>
        </Div>
      );
    case 'Wallet':
      return (
        <Div col="12" key={paymentType} className={styles.paymentOptions}>
          <input
            type="radio"
            name="paymentOption"
            value="Wallet"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <Label
            htmlFor="paymentWallet"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img
              height="20px"
              width="auto"
              float="left"
              mr="10px"
              top="-2px"
              position="relative"
              src={walletIcon}
              alt="Wallet"
            />
            Wallet
          </Label>
        </Div>
      );
    case 'EasyEmi':
      return (
        <Div col="12" key={paymentType} className={styles.paymentOptions}>
          <input
            type="radio"
            name="paymentOption"
            value="EasyEmi"
            checked={selectedGateway === paymentType}
            onChange={() => {
              resetEasyEmi();
              onChangeGateway(onChange, paymentType, session)();
            }}
          />
          <Label
            htmlFor="paymentEasyEmi"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={() => {
              resetEasyEmi();
              onChangeGateway(onChange, paymentType, session)();
            }}
          >
            <Img
              height="20px"
              width="auto"
              float="left"
              mr="10px"
              top="-2px"
              position="relative"
              src={emiIcon}
              alt="EASYEMI"
            />
            Bajaj Finance EMI
          </Label>
        </Div>
      );
    default:
      return null;
  }
};

export default CommonPayments;
