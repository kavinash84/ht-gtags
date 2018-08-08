import React from 'react';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';
import { connect } from 'react-redux';
import { getEmiBanks } from 'selectors/payments';
import PropTypes from 'prop-types';
import BankCard from './BankCard';

import EmiCreditCardForm from './EmiCreditCardForm';

const styles = require('./Checkout.scss');

const mapStateToProps = ({ paymentoptions }) => ({
  selectedGateway: paymentoptions.selectedGateway,
  emiBankDetails: getEmiBanks(paymentoptions),
  details: paymentoptions.paymentMethodDetails.Emi
});

const onChangeDetails = (dispatcher, gateway) => e => {
  const { name, value } = e.target;
  dispatcher({ gateway, data: { [name]: value } });
};

const EMI = ({
  selectedGateway, setPaymentDetails, emiBankDetails, details, currentSelection
}) => {
  const currentBankDetails = emiBankDetails.filter(item => item.bank === details.emiBank)[0];
  return (
    <div>
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
            detailkey="emiBank"
            name="citibank"
            img="https://static.hometown.in/media/cms/BankLOGO/citi.gif"
            currentSelection={currentSelection}
          />
          <BankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name="hdfc"
            img="https://static.hometown.in/media/cms/BankLOGO/hdfc.gif"
            currentSelection={currentSelection}
          />
          <BankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name="hsbc"
            img="https://static.hometown.in/media/cms/BankLOGO/hsbc.gif"
            currentSelection={currentSelection}
          />
          <BankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name="icici"
            img="https://static.hometown.in/media/cms/BankLOGO/icici.gif"
            currentSelection={currentSelection}
          />
          <BankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name="axis"
            img="https://static.hometown.in/media/cms/BankLOGO/axis.gif"
            currentSelection={currentSelection}
          />
          <BankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name="sbi"
            img="https://static.hometown.in/media/cms/BankLOGO/sbi.gif"
            currentSelection={currentSelection}
          />
          <BankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name="kotak"
            img="https://static.hometown.in/media/cms/BankLOGO/kotak.gif"
            currentSelection={currentSelection}
          />
          {currentBankDetails && (
            <Div col="12" mb="1rem" mt="1rem">
              <table border="1" className={`table table-border ${styles.emiTable}`}>
                <tr>
                  <th />
                  <th>Tenure</th>
                  <th>Annual Interest Rate</th>
                  <th>EMI Interest</th>
                  <th>Total Cost</th>
                  <th>Monthly Instalments</th>
                </tr>

                {currentBankDetails.values.map((item, index) => (
                  <tr key={String(index)}>
                    <td align="center">
                      <input
                        type="radio"
                        onChange={onChangeDetails(setPaymentDetails, selectedGateway)}
                        name="emiCode"
                        value={item.emiCode}
                      />
                    </td>
                    <td>{item.value} Months</td>
                    <td>{item.interestRate}%</td>
                    <td>Rs.{Math.round(item.emiInterest)}</td>
                    <td>Rs.{Math.round(item.totalAmount)}</td>
                    <td>Rs.{Math.round(item.EMI)}</td>
                  </tr>
                ))}
              </table>
              <Div col="12" mb="1rem" mt="1rem">
                <EmiCreditCardForm setPaymentDetails={setPaymentDetails} gateway={selectedGateway} />
              </Div>
            </Div>
          )}
        </Div>
      </Div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(EMI);

EMI.propTypes = {
  selectedGateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  emiBankDetails: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired,
  currentSelection: PropTypes.string.isRequired
};
