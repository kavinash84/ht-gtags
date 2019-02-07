import { createSelector } from 'reselect';

const allowedOptions = () => ['CreditCard', 'DebitCard', 'NetBanking', 'Emi', 'CashOnDelivery', 'Wallet', 'EasyEmi'];

export const getPaymentState = options =>
  options.data.paymentData
    ? options.data.paymentData
    : {
      paymentOSCConfig: {},
      paymentConfig: {}
    };

export const getPaymentConfig =
  createSelector(
    [getPaymentState],
    options => options.paymentOSCConfig
  ) || {};

export const getPaymentConfigNew =
  createSelector(
    [getPaymentState],
    options => options.paymentConfig
  ) || {};

export const getPaymentOptions = createSelector(
  [getPaymentConfig, allowedOptions],
  (options, allowed) => {
    if (options) {
      return allowed
        .map(allow => ({ paymentType: allow, ...options[allow] }))
        .filter(payOption => payOption.isEnable === true);
    }
    return [];
  }
);

export const getAllEMIBanks = createSelector(
  [getPaymentOptions],
  items => items.filter(item => item.paymentType === 'Emi')[0] || []
);

export const getEasyEmiConfig = createSelector(
  [getPaymentOptions],
  items => items.filter(item => item.paymentType === 'EasyEmi')[0] || {}
);

export const getEmiBanks = createSelector(
  [getAllEMIBanks],
  banks => Object.values(banks.bankDetails).map(x => ({ bank: x.bank, values: Object.values(x.emiOptions) }))
);
