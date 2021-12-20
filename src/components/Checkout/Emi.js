import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * Components
 */
import Box from "hometown-components-dev/lib/BoxHtV1";
import Label from "hometown-components-dev/lib/LabelHtV1";
import Row from "hometown-components-dev/lib/RowHtV1";

/**
 * Page Components
 */
import { getEmiBanks } from "selectors/payments";
import BankCard from "./BankCard";
import CardForm from "./CardForm";

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
  selectedGateway,
  setPaymentDetails,
  emiBankDetails,
  details,
  currentSelection
}) => {
  const currentBankDetails = emiBankDetails.filter(
    item => item.bank === details.emiBank
  )[0];
  return (
    <Box>
      <Box pb={20}>
        <Label>
          Choose From Preferred Bank (Available On Credit Cards Only)
        </Label>
      </Box>
      <Row pb={20}>
        {emiBankDetails.map(bank => (
          <BankCard
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            detailkey="emiBank"
            name={bank.bank}
            img={
              ["citibank", "AMEX", "IndusInd", "Bob", "Yes"].includes(bank.bank)
                ? `https://www.hometown.in/media/cms/BankLogos/${bank.bank}.png`
                : `https://static.hometown.in/media/cms/BankLOGO/${bank.bank}.gif`
            }
            currentSelection={currentSelection}
            key={bank.bank}
          />
        ))}
      </Row>
      {currentBankDetails && (
        <Box>
          <Box sx={{ overflow: "auto" }}>
            <Box
              as="table"
              width={1}
              mb={20}
              sx={{
                borderCollapse: "collapse",
                border: "secondary",
                "& tr": {
                  border: "secondary"
                },
                "& td": {
                  border: "secondary",
                  p: "5px 8px",
                  fontSize: 14
                },
                "& th": {
                  border: "secondary",
                  p: "10px 10px",
                  fontSize: 14
                }
              }}
            >
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
                        onChange={onChangeDetails(
                          setPaymentDetails,
                          selectedGateway
                        )}
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
            </Box>
          </Box>
          <Box>
            <CardForm
              setPaymentDetails={setPaymentDetails}
              gateway={selectedGateway}
              padding="1rem 0rem 0"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default connect(mapStateToProps, null)(EMI);

EMI.propTypes = {
  selectedGateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  emiBankDetails: PropTypes.array.isRequired,
  details: PropTypes.object.isRequired,
  currentSelection: PropTypes.string.isRequired
};
