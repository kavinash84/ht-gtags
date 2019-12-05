import React from 'react';
import Div from 'hometown-components-dev/lib/Div';
import { Label } from 'hometown-components-dev/lib/Label';
import { connect } from 'react-redux';
import { getEmiBanks } from 'selectors/payments';
import PropTypes from 'prop-types';
import BankCard from './BankCard';

import CardForm from './CardForm';

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
    <Div col="12" p="3rem 2rem">
      <Div col="12" mb="1rem">
        <Label for="bankOptions1" color="textLight">
          Choose From Preferred Bank (Available On Credit Cards Only)
        </Label>
      </Div>
      {emiBankDetails.map(bank => (
        <BankCard
          setPaymentDetails={setPaymentDetails}
          gateway={selectedGateway}
          detailkey="emiBank"
          name={bank.bank}
          img={`https://static.hometown.in/media/cms/BankLOGO/${bank.bank}.gif`}
          currentSelection={currentSelection}
          key={bank.bank}
        />
      ))}
      {currentBankDetails && (
        <Div col="12" mb="0" mt="1rem">
          <table border="1" className={`table table-border ${styles.emiTable}`}>
            <tbody>
              <tr>
                <th />
                <th width="85px">Tenure</th>
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
                  <td>
                    Rs.
                    {Math.round(item.emiInterest)}
                  </td>
                  <td>
                    Rs.
                    {Math.round(item.totalAmount)}
                  </td>
                  <td>
                    Rs.
                    {Math.round(item.EMI)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Div col="12" mb="1rem" mt="1rem">
            <CardForm setPaymentDetails={setPaymentDetails} gateway={selectedGateway} padding="1rem 0rem 0" />
          </Div>
        </Div>
      )}
    </Div>
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
