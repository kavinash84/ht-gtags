import React from 'react';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';

import CardForm from './CardForm';
import BankCard from './BankCard';
import Emi from './Emi';

const styles = require('./Checkout.scss');

const initial = {
  CreditCard: {
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: '',
    type: 'visa'
  },
  DebitCard: {
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: '',
    type: 'visa'
  },
  Emi: {
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: '',
    emiBank: ''
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

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const CommonPayments = (paymentType, onChange, selectedGateway, setPaymentDetails, data, session, paymentDetails) => {
  switch (paymentType) {
    case 'CreditCard':
      return (
        <Div col="12" mt="1.5rem" key={paymentType}>
          <input
            type="radio"
            name="paymentOption"
            value="DebitCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <Label for="DebitCard" pl="1rem" color="textLight" ml="0.9375rem">
            Credit Card
          </Label>
          {selectedGateway === paymentType && (
            <Div col="12" mt="0.625rem" pl="1.75rem">
              <CardForm setPaymentDetails={setPaymentDetails} gateway={selectedGateway} />
            </Div>
          )}
        </Div>
      );
    case 'DebitCard':
      return (
        <Div col="12" mt="1.5rem" key={paymentType}>
          <input
            type="radio"
            name="paymentOption"
            value="DebitCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <Label for="DebitCard" pl="1rem" color="textLight" ml="0.9375rem">
            Debit Card
          </Label>
          {selectedGateway === paymentType && (
            <Div col="12" mt="0.625rem" pl="1.75rem">
              <CardForm setPaymentDetails={setPaymentDetails} gateway={selectedGateway} />
            </Div>
          )}
        </Div>
      );
    case 'NetBanking':
      return (
        <div>
          <Div col="12" mt="1.5rem" key={paymentType}>
            <input
              type="radio"
              name="paymentOption"
              value="NetBanking"
              checked={selectedGateway === paymentType}
              onChange={onChangeGateway(onChange, paymentType, session)}
            />
            <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
              Internet Banking
            </Label>
          </Div>
          {selectedGateway === paymentType && (
            <Div col="12" mt="0.625rem" pl="1.75rem">
              <Div className={styles.paymentBlock}>
                <Div col="12" mb="1rem">
                  <Label for="bankOptions1" pl="1rem" color="textLight">
                    Choose From Preferred Bank
                  </Label>
                </Div>

                <BankCard
                  setPaymentDetails={setPaymentDetails}
                  gateway={selectedGateway}
                  name="HDFB"
                  detailkey="bankCode"
                  img="https://static.hometown.in/media/cms/BankLOGO/hdfc.gif"
                  currentSelection={paymentDetails.NetBanking.bankCode}
                />
                <BankCard
                  setPaymentDetails={setPaymentDetails}
                  gateway={selectedGateway}
                  name="ICIB"
                  detailkey="bankCode"
                  img="https://static.hometown.in/media/cms/BankLOGO/icici.gif"
                  currentSelection={paymentDetails.NetBanking.bankCode}
                />
                <BankCard
                  setPaymentDetails={setPaymentDetails}
                  gateway={selectedGateway}
                  name="AXIB"
                  detailkey="bankCode"
                  img="https://static.hometown.in/media/cms/BankLOGO/axis.gif"
                  currentSelection={paymentDetails.NetBanking.bankCode}
                />
                <BankCard
                  setPaymentDetails={setPaymentDetails}
                  gateway={selectedGateway}
                  name="SBIB"
                  detailkey="bankCode"
                  img="https://static.hometown.in/media/cms/BankLOGO/sbi.gif"
                  currentSelection={paymentDetails.NetBanking.bankCode}
                />

                <Div col="12" mt="1rem">
                  <select
                    className={`${styles.dropDown} ${styles.selectBank}`}
                    name="bankCode"
                    onChange={onChangeDetails(setPaymentDetails, selectedGateway)}
                    value={paymentDetails.NetBanking.bankCode}
                  >
                    <option>Select Bank</option>
                    {Object.keys(data.netBankingBanks).map((k, i) => (
                      <option value={k}>{Object.values(data.netBankingBanks)[i]}</option>
                    ))}
                  </select>
                </Div>
              </Div>
            </Div>
          )}
        </div>
      );
    case 'Emi':
      return (
        <div>
          <Div col="12" mt="1.5rem">
            <input
              type="radio"
              name="paymentOption"
              value="Emi"
              checked={selectedGateway === paymentType}
              onChange={onChangeGateway(onChange, paymentType, session)}
            />
            <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
              EMI
            </Label>
          </Div>
          {selectedGateway === paymentType && (
            <Emi
              selectedGateway={selectedGateway}
              setPaymentDetails={setPaymentDetails}
              currentSelection={paymentDetails.Emi.emiBank}
            />
          )}
        </div>
      );
    case 'Wallet':
      return (
        <div>
          <Div col="12" mt="1.5rem">
            <input
              type="radio"
              name="paymentOption"
              value="Emi"
              checked={selectedGateway === paymentType}
              onChange={onChangeGateway(onChange, paymentType, session)}
            />
            <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
              Wallet
            </Label>
          </Div>
          {selectedGateway === paymentType && (
            <Div col="12" mt="0.625rem" pl="1.75rem" mb="0.625rem">
              <Div className={styles.paymentBlock}>
                <Div col="12" mb="1rem">
                  <Label for="bankOptions1" pl="1rem" color="textLight">
                    Select From your preferred Wallet
                  </Label>
                </Div>

                {data.isPaytmWalletEnable && (
                  <BankCard
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    name="Paytm"
                    detailkey="walletName"
                    img="https://www.hometown.in/images/local_v2/onestepcheckout/logo/paytm.jpg"
                  />
                )}
                {data.isPayuWalletEnable && (
                  <BankCard
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    name="Payu"
                    detailkey="walletName"
                    img="https://www.hometown.in/images/local_v2/onestepcheckout/logo/payu.jpg"
                  />
                )}
                {data.isMobikwikWalletEnable && (
                  <BankCard
                    setPaymentDetails={setPaymentDetails}
                    gateway={selectedGateway}
                    name="Mobikwik"
                    detailkey="walletName"
                    img="https://www.hometown.in/images/local_v2/onestepcheckout/logo/mobikwik.jpg"
                  />
                )}
              </Div>
            </Div>
          )}
        </div>
      );
    case 'CashOnDelivery':
      return (
        <Div col="12" mt="1.5rem">
          <input
            type="radio"
            name="paymentOption"
            value="CashOnDelivery"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType, session)}
          />
          <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
            Cash On Delivery
          </Label>
        </Div>
      );
    default:
      return <div>Test</div>;
  }
};

export default CommonPayments;
