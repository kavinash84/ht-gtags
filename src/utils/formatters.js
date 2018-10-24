export const formatAmount = amount => {
  const amt = amount.toString();
  const newAmt = Math.floor(amt).toString();
  const lastThree = newAmt.substring(newAmt.length - 3);
  const otherNumbers = newAmt.substring(0, newAmt.length - 3);
  const newlastThree = otherNumbers !== '' ? `,${lastThree}` : lastThree;
  const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + newlastThree;
  return res;
};

export const formatNumber = number => formatAmount((number && number) || 0);

export const formatDate = date => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return new Date(date).toLocaleDateString('en-us', options);
};

export const formatDateOnly = date => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString('en-us', options);
};

export const formatYear = date => {
  const options = {
    year: 'numeric'
  };
  return new Date(date).toLocaleDateString('en-us', options);
};
