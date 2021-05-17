import { createSelector } from 'reselect';

const allowedOptions = () => [
  'EmiZero',
  'Emi',
  'CreditCard',
  'DebitCard',
  'NetBanking',
  'CashOnDelivery',
  'Wallet',
  'EasyEmi',
  'Upi'
];

export const getPaymentState = options =>
  options.data && options.data.paymentData
    ? options.data.paymentData
    : {
        paymentOSCConfig: {},
        paymentConfig: {}
      };

export const getPaymentConfig = createSelector([getPaymentState], options => options.paymentOSCConfig) || {};

export const getMethodPaymentGateways =
  createSelector([getPaymentState], options => options.methodPaymentGateways) || {};

export const getPaymentConfigNew = createSelector([getPaymentState], options => options.paymentConfig) || {};

export const getPaymentOptions = createSelector(
  [getPaymentConfig, allowedOptions, getMethodPaymentGateways],
  (options, allowed, gateways) => {
    if (options) {
      return allowed
        .map(allow => ({ paymentType: allow, ...options[allow] }))
        .filter(payOption => payOption.isEnable === true && gateways[payOption.paymentType]);
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

export const getEmiBanks = createSelector([getAllEMIBanks], banks =>
  // eslint-disable-next-line max-len
  Object.keys(banks).length
    ? Object.values(banks.bankDetails).map(x => ({ bank: x.bank, values: Object.values(x.emiOptions) }))
    : []);
