import React from 'react';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';
import CardForm from './CardForm';
import BankCard from './BankCard';

const styles = require('./Checkout.scss');

const onChangeGateway = (dispatcher, value) => () => {
  dispatcher(value);
};

const CommonPayments = (paymentType, onChange, selectedGateway) => {
  console.log(selectedGateway);
  switch (paymentType) {
    case 'CreditCard':
      return (
        <Div col="12" mt="1.5rem">
          <input
            type="radio"
            name="paymentOption"
            value="DebitCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType)}
          />
          <Label for="DebitCard" pl="1rem" color="textLight" ml="0.9375rem">
            Credit Card
          </Label>
          <Div col="12" mt="0.625rem" pl="1.75rem" hide={!(selectedGateway === paymentType)}>
            <CardForm />
          </Div>
        </Div>
      );
    case 'DebitCard':
      return (
        <Div col="12" mt="1.5rem">
          <input
            type="radio"
            name="paymentOption"
            value="CreditCard"
            checked={selectedGateway === paymentType}
            onChange={onChangeGateway(onChange, paymentType)}
          />
          <Label for="DebitCard" pl="1rem" color="textLight" ml="0.9375rem">
            Debit Card
          </Label>
          <Div col="12" mt="0.625rem" pl="1.75rem" hide={!(selectedGateway === paymentType)}>
            <CardForm />
          </Div>
        </Div>
      );
    case 'NetBanking':
      return (
        <div>
          <Div col="12" mt="1.5rem">
            <input
              type="radio"
              name="paymentOption"
              value="NetBanking"
              checked={selectedGateway === paymentType}
              onChange={onChangeGateway(onChange, paymentType)}
            />
            <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
              Internet Banking
            </Label>
          </Div>
          <Div col="12" mt="0.625rem" pl="1.75rem" hide={!(selectedGateway === paymentType)}>
            <Div className={styles.paymentBlock}>
              <Div col="12" mb="1rem">
                <Label for="bankOptions1" pl="1rem" color="textLight">
                  Choose From Preferred Bank
                </Label>
              </Div>

              <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/citi.gif" />
              <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/hdfc.gif" />
              <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/hsbc.gif" />
              <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/icici.gif" />

              <Div col="12" mt="1rem">
                <select className={`${styles.dropDown} ${styles.selectBank}`}>
                  <option>Select Bank</option>
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                </select>
              </Div>
            </Div>
          </Div>
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
              onChange={onChangeGateway(onChange, paymentType)}
            />
            <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
              EMI
            </Label>
          </Div>
          <Div col="12" mt="0.625rem" pl="1.75rem" hide={!(selectedGateway === paymentType)}>
            <Div className={styles.paymentBlock}>
              <Div col="12" mb="1rem">
                <Label for="bankOptions1" pl="1rem" color="textLight">
                  Choose From Preferred Bank
                </Label>
              </Div>

              <BankCard name="citibank" img="https://static.hometown.in/media/cms/BankLOGO/citi.gif" />
              <BankCard name="hdfc" img="https://static.hometown.in/media/cms/BankLOGO/hdfc.gif" />
              <BankCard name="hsbc" img="https://static.hometown.in/media/cms/BankLOGO/hsbc.gif" />
              <BankCard name="icici" img="https://static.hometown.in/media/cms/BankLOGO/icici.gif" />
            </Div>
          </Div>
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
              onChange={onChangeGateway(onChange, paymentType)}
            />
            <Label for="paymentDC" pl="1rem" color="textLight" ml="0.9375rem">
              Wallet
            </Label>
          </Div>
          <Div col="12" mt="0.625rem" pl="1.75rem" mb="0.625rem" hide={!(selectedGateway === paymentType)}>
            <Div className={styles.paymentBlock}>
              <Div col="12" mb="1rem">
                <Label for="bankOptions1" pl="1rem" color="textLight">
                  Select From your preferred Wallet
                </Label>
              </Div>
              <BankCard name="payTm" img="https://www.hometown.in/images/local_v2/onestepcheckout/logo/paytm.jpg" />
              <BankCard name="payu" img="https://www.hometown.in/images/local_v2/onestepcheckout/logo/payu.jpg" />
              <BankCard
                name="mobikwik"
                img="https://www.hometown.in/images/local_v2/onestepcheckout/logo/mobikwik.jpg"
              />
            </Div>
          </Div>
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
            onChange={onChangeGateway(onChange, paymentType)}
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
