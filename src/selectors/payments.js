import { createSelector } from 'reselect';

const allowedOptions = () => ['CreditCard', 'DebitCard', 'NetBanking', 'Emi', 'CashOnDelivery', 'Wallet'];

export const getPaymentState = options =>
  options.data.paymentData
    ? options.data.paymentData
    : {
      paymentOSCConfig: {}
    };

export const getPaymentConfig = createSelector([getPaymentState], options => options.paymentOSCConfig) || {};

export const getPaymentOptions = createSelector([getPaymentConfig, allowedOptions], (options, allowed) => {
  if (options) {
    return allowed
      .map(allow => ({ paymentType: allow, ...options[allow] }))
      .filter(payOption => payOption.isEnable === true);
  }
  return [];
});
