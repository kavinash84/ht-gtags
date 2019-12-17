import React from 'react';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import InputFieldHtV1 from 'hometown-components-dev/lib/InputFieldHtV1';

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
  // Disabling this api call under api migration as this api has no use in backend
  dispatcher(value, initial[value], session);
};

const CommonPayments = (paymentType, onChange, selectedGateway, session, resetEasyEmi) => {
  switch (paymentType) {
    case 'CreditCard':
      return (
        <BoxHtV1 col="12" key={paymentType} className={styles.paymentOptions}>
          <InputFieldHtV1
            type="radio"
            name="paymentOption"
            value="CreditCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <LabelHtV1
            htmlFor="CreditCard"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <ImageHtV1
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
          </LabelHtV1>
        </BoxHtV1>
      );
    case 'DebitCard':
      return (
        <BoxHtV1 col="12" key={paymentType} className={styles.paymentOptions}>
          <InputFieldHtV1
            type="radio"
            name="paymentOption"
            value="DebitCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <LabelHtV1
            htmlFor="DebitCard"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <ImageHtV1
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
          </LabelHtV1>
        </BoxHtV1>
      );
    case 'NetBanking':
      return (
        <BoxHtV1 col="12" key={paymentType} className={styles.paymentOptions}>
          <InputFieldHtV1
            type="radio"
            name="paymentOption"
            value="NetBanking"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <LabelHtV1
            htmlFor="paymentIB"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <ImageHtV1
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
          </LabelHtV1>
        </BoxHtV1>
      );
    case 'Emi':
      return (
        <BoxHtV1 col="12" key={paymentType} className={styles.paymentOptions}>
          <InputFieldHtV1
            type="radio"
            name="paymentOption"
            value="Emi"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <LabelHtV1
            htmlFor="paymentEmi"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <ImageHtV1
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
          </LabelHtV1>
        </BoxHtV1>
      );
    case 'Wallet':
      return (
        <BoxHtV1 col="12" key={paymentType} className={styles.paymentOptions}>
          <InputFieldHtV1
            type="radio"
            name="paymentOption"
            value="Wallet"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <LabelHtV1
            htmlFor="paymentWallet"
            pl="0"
            color="textLight"
            mt="0"
            mb="0"
            onClick={onChangeGateway(onChange, paymentType, session)}
          >
            <ImageHtV1
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
          </LabelHtV1>
        </BoxHtV1>
      );
    case 'EasyEmi':
      return (
        <BoxHtV1 col="12" key={paymentType} className={styles.paymentOptions}>
          <InputFieldHtV1
            type="radio"
            name="paymentOption"
            value="EasyEmi"
            checked={selectedGateway === paymentType}
            onChange={() => {
              resetEasyEmi();
              onChangeGateway(onChange, paymentType, session)();
            }}
          />
          <LabelHtV1
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
            <ImageHtV1
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
          </LabelHtV1>
        </BoxHtV1>
      );
    default:
      return null;
  }
};

export default CommonPayments;
