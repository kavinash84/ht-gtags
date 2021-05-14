import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * modules / selectors / helpers
 */
import { setEmiPaymentType } from 'redux/modules/app';
/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
/**
 * Page Components
 */
import BankCardForZeroEmi from './BankCardForZeroEmi';
import CardForm from './CardForm';
import BajajFinance from './BajajFinance';

const mapStateToProps = ({ paymentoptions, cart }) => ({
  selectedGateway: paymentoptions.selectedGateway,
  details: paymentoptions.paymentMethodDetails.EmiZero,
  bflMinAmount: paymentoptions.bflMinAmount,
  cart
});

class EmiZero extends Component {
  componentDidMount() {
    const { dispatch } = this.context.store;
    const { setPaymentDetails } = this.props;
    dispatch(setEmiPaymentType('hdfc'));
    dispatch(setPaymentDetails({
        gateway: 'EmiZero',
        data: { emiCode: 'EMI3', emiBank: 'hdfc', cardType: 'credit' }
      }));
  }

  render() {
    const {
      selectedGateway,
      setPaymentDetails,
      details,
      cart: {
        summary: { total }
      },
      bflMinAmount
    } = this.props;
    return (
      <Box>
        {total > bflMinAmount ? <BajajFinance bflMinAmount={bflMinAmount} /> : null}
        <Box pb={20}>
          <Label for="bankOptions1" color="textLight">
            Choose From Preferred Bank (Available on debit/credit cards for order value &gt; Rs. 20000)
          </Label>
        </Box>
        <Box pb={20}>
          <BankCardForZeroEmi
            setPaymentDetails={setPaymentDetails}
            gateway={selectedGateway}
            details={details}
            detailkey="emiBank"
            name={'hdfc'}
            img={'https://static.hometown.in/media/cms/BankLOGO/hdfc.gif'}
            currentSelection={'hdfc'}
            key={'hdfc'}
          />
        </Box>
        <Box>
          <Box>
            <Box
              as="table"
              width={1}
              mb={20}
              sx={{
                borderCollapse: 'collapse',
                border: 'secondary',
                '& tr': {
                  border: 'secondary'
                },
                '& td': {
                  border: 'secondary',
                  p: '5px 8px',
                  fontSize: 14
                },
                '& th': {
                  border: 'secondary',
                  p: '10px 10px',
                  fontSize: 14
                }
              }}
            >
              <tbody>
                <tr>
                  <th width="85px">Tenure</th>
                  <th>Annual Interest Rate</th>
                  <th>Total Cost</th>
                  <th>Monthly Instalments</th>
                </tr>
                <tr>
                  <td> 3 Months</td>
                  <td>0%</td>
                  <td>Rs. {Math.round(total)}</td>
                  <td>Rs. {Math.round(total / 3)}</td>
                </tr>
              </tbody>
            </Box>
            <Box>
              <CardForm setPaymentDetails={setPaymentDetails} gateway={selectedGateway} padding="1rem 0rem 0" />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default connect(mapStateToProps, null)(EmiZero);

EmiZero.contextTypes = {
  store: PropTypes.object.isRequired
};

EmiZero.propTypes = {
  selectedGateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  cart: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
  bflMinAmount: PropTypes.number.isRequired
};
