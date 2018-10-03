import React from 'react';
import Div from 'hometown-components/lib/Div';
import Img from 'hometown-components/lib/Img';
import { Label } from 'hometown-components/lib/Label';

// import CardForm from './CardForm';
// import BankCard from './BankCard';
// import Emi from './Emi';

const styles = require('./CommonPayments.scss');

const creditcardIcon = require('../../../static/credit-card.svg');
const debitcardIcon = require('../../../static/debit-card.svg');
const intBankingIcon = require('../../../static/net-banking.png');
const emiIcon = require('../../../static/emi.svg');
const walletIcon = require('../../../static/wallet.svg');
const codIcon = require('../../../static/cod.svg');

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
  }
};

const onChangeGateway = (dispatcher, value, session) => () => {
  dispatcher(value, initial[value], session);
};

// const onChangeDetails = (dispatcher, gateway) => e => {
//   const { name, value } = e.target;
//   dispatcher({ gateway, data: { [name]: value } });
// };

const CommonPayments = (paymentType, onChange, selectedGateway, setPaymentDetails, data, session) => {
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
            ml="0.9375rem"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img
              width="30px"
              float="left"
              mr="10px"
              top="-5px"
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
            ml="0.9375rem"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img
              width="30px"
              float="left"
              mr="10px"
              top="-5px"
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
            ml="0.9375rem"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img
              width="30px"
              float="left"
              mr="10px"
              top="-5px"
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
            ml="0.9375rem"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img width="30px" float="left" mr="10px" top="-5px" position="relative" src={emiIcon} alt="EMI" />
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
            ml="0.9375rem"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <Img width="30px" float="left" mr="10px" top="-5px" position="relative" src={walletIcon} alt="Wallet" />
            Wallet
          </Label>
        </Div>
      );
    case 'CashOnDelivery':
      return (
        <Div col="12" key={paymentType} className={styles.paymentOptions}>
          <input
            type="radio"
            name="paymentOption"
            id="paymentCD"
            value="CashOnDelivery"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <Label htmlFor="paymentCD" pl="0" color="textLight" ml="0.9375rem">
            <Img width="30px" float="left" mr="10px" top="-5px" position="relative" src={codIcon} alt="Wallet" />
            Cash On Delivery
          </Label>
        </Div>
      );
    default:
      return null;
  }
};

export default CommonPayments;
