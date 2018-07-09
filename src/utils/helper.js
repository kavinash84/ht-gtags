import btoa from 'btoa';

export const encodeCategory = obj => {
  const values = obj && Object.values(obj).filter(x => x !== undefined);
  return btoa(JSON.stringify({ params: values }));
};

export const formatData = data => {
  const x = data.toLowerCase();
  const pp = x.split(' ');
  return pp.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const filterStoresByCity = (stores, city) => {
  if (stores) {
    return stores.filter(store => store.city.toLowerCase() === city.toLowerCase());
  }
};

export const hyphenedString = name => name.split(' ').join('-');

export const formFilterLink = (key, selected) => {
  let query;
  const splitLink = key.split('?');
  const paramLink = splitLink[0].split('/').filter(x => x !== '');
  if (selected) {
    query = paramLink.filter(param => param !== paramLink[1]);
  } else query = paramLink;
  const encode = btoa(JSON.stringify({
    params: query
  }));
  return `${encode}/?${splitLink[1]}`;
};
