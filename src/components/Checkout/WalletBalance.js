/* eslint-disable radix */
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Div from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

// Helper & Selectors
import { setHtWallet, setFuturePayAmount, setSelectedGateway } from 'redux/modules/paymentoptions';
import { getFuturePayProfile } from 'selectors/userprofile';
import { PAYMENT_SUCCESS, PAYMENT_FAILURE } from 'helpers/Constants';
import { formatAmount } from 'utils/formatters';

const styles = require('./walletBalance.scss');

const initial = {
  FuturePay: {
    walletName: ''
  },
  CreditCard: {
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: '',
    type: 'other'
  }
};

const handleChange = (value, total, futurePayAmount) => {
  futurePayAmount(value, total);
};

const handleCheckBox = (checked, session, total, balance, toggleHtWallet, toggleGateway) => {
  const fullPayment = balance > total;

  if (checked) {
    toggleHtWallet(1);
    if (fullPayment) {
      toggleGateway('FuturePay', { walletName: 'futurepay' }, session);
    } else {
      toggleGateway('CreditCard', initial.CreditCard, session);
    }
  } else {
    toggleHtWallet(0);
    toggleGateway('CreditCard', initial.CreditCard, session);
  }

  // if (fullPayment) {
  //   toggleGateway('FuturePay', { walletName: 'futurepay' }, session);
  // } else {
  //   toggleGateway('CreditCard', initial.CreditCard, session);
  // }
};

@connect(({
 paymentoptions, profile, cart, app
}) => ({
  session: app.sessionId,
  futurPayProfile: getFuturePayProfile(profile),
  cartSummary: cart.summary,
  isPayFromHtWallet: paymentoptions.isPayFromHtWallet,
  futurePayRedeemAmount: paymentoptions.futurePayRedeemAmount,
  futurePayRedeemAmountError: paymentoptions.futurePayRedeemAmountError,
  futurePayRedeemAmountErrorMessage: paymentoptions.futurePayRedeemAmountErrorMessage,
  futurePay: paymentoptions.futurePay
}))
@withRouter
class WalletBalance extends Component {
  // TODO Full payment refresh the data on payment success page

  // TODO Prevent user from redirecting back

  // TODO error handling if order api failed

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      futurPayProfile: { AvailableBalance: balance },
      cartSummary: { total },
      session,
      futurePayAmount,
      toggleGateway,
      toggleHtWallet
    } = this.props;

    if (balance > total) {
      futurePayAmount(total, total);
      toggleGateway('FuturePay', 'futurepay', session);
      toggleHtWallet(1);
    } else {
      futurePayAmount(balance, total);
      toggleHtWallet(0);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props && this.props.futurePay && this.props.futurePay.futurePay) {
      const { futurePay, history } = this.props;
      if (futurePay.futurePay.status === 'success') {
        history.push(PAYMENT_SUCCESS);
      } else {
        history.push(PAYMENT_FAILURE);
      }
    }

    // If futurePayRedeemAmount is less than cart value
    if (prevProps.futurePayRedeemAmount !== this.props.futurePayRedeemAmount) {
      const {
        futurePayRedeemAmount,
        cartSummary: { total },
        toggleGateway,
        session
      } = this.props;

      if (futurePayRedeemAmount < total) {
        toggleGateway('CreditCard', initial.CreditCard, session);
      } else {
        toggleGateway('FuturePay', { walletName: 'futurepay' }, session);
      }
    }
  }

  render() {
    const {
      futurPayProfile: { AvailableBalance: balance },
      futurePayRedeemAmount,
      futurePayRedeemAmountErrorMessage,
      cartSummary: { total },
      session,
      toggleGateway,
      toggleHtWallet,
      futurePayAmount,
      isPayFromHtWallet
    } = this.props;
    console.log(balance, 'balance');
    return (
      <Div pl="5%">
        <Text ta="center" color="#323131" mb={20} fontSize="1.2rem">
          HomeTown Wallet Balance
        </Text>
        <Text ta="center" fontSize="24px" fontWeight="bold">
          <span>₹ </span>
          {formatAmount(balance) || 0}
        </Text>

        {parseInt(balance) ? (
          <Div>
            <Flex justifyContent="space-between" alignItems="center" ml={0} mr={0} className={styles.hometownWallet}>
              <Div col="7" className={styles.checkbox}>
                {/* FIXME: Change it to hometown component */}
                <input
                  type="checkbox"
                  id="check"
                  checked={isPayFromHtWallet}
                  onClick={({ target: { checked } }) =>
                    handleCheckBox(checked, session, total, balance, toggleHtWallet, toggleGateway)
                  }
                />
                <label htmlFor="checkbox" className={styles.label}>
                  Use Balance Amount:
                </label>
              </Div>
              <Div col="5" className={styles.amount}>
                {/* FIXME: Chenage it to hometown component */}
                <input
                  value={parseInt(futurePayRedeemAmount)}
                  type="number"
                  placeholder="Enter Amount"
                  disabled={!isPayFromHtWallet}
                  onChange={({ target: { value } }) => handleChange(parseInt(value), total, futurePayAmount)}
                />
              </Div>
            </Flex>
            <Flex justifyContent="center">
              <Text ta="center" fontSize="12px" color="red">
                {futurePayRedeemAmountErrorMessage}
              </Text>
            </Flex>
          </Div>
        ) : null}
      </Div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleGateway: setSelectedGateway,
      toggleHtWallet: setHtWallet,
      futurePayAmount: setFuturePayAmount
    },
    dispatch
  );

WalletBalance.propTypes = {
  futurPayProfile: PropTypes.object,
  futurePayRedeemAmount: PropTypes.number,
  futurePayRedeemAmountErrorMessage: PropTypes.string,
  cartSummary: PropTypes.object,
  session: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  futurePay: PropTypes.object,
  toggleGateway: PropTypes.func.isRequired,
  toggleHtWallet: PropTypes.func.isRequired,
  futurePayAmount: PropTypes.func.isRequired,
  isPayFromHtWallet: PropTypes.number
};

WalletBalance.defaultProps = {
  futurPayProfile: { AvailableBalance: '' },
  futurePayRedeemAmount: '',
  futurePayRedeemAmountErrorMessage: '',
  cartSummary: { total: '' },
  futurePay: { futurePay: {} },
  isPayFromHtWallet: 0
};
export default connect(null, mapDispatchToProps)(WalletBalance);
