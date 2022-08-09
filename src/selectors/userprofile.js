import { createSelector } from 'reselect';

export const profileInfo = profile =>
  profile.data || {
    first_name: '',
    futurPayProfile: {}
  };

export const futurePayTransaction = transaction => transaction.transactionHistory || [];

export const getUserName = createSelector([profileInfo], username => username.first_name || '');

export const getUser = createSelector([profileInfo], user => user.futurPayProfile || {});

export const getFuturePayProfile = createSelector([getUser], futurePay =>
  futurePay.status === 'success'
    ? futurePay
    : {
      AvailableBalance: '',
      TopUpBalance: ''
    });

export const getTransactionHistory = createSelector([futurePayTransaction], transaction => {
  return transaction || [];
});
