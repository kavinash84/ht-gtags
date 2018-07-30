import btoa from 'btoa';

export const encodeCategory = obj => {
  const values = obj && Object.values(obj).filter(x => x !== undefined);
  return btoa(JSON.stringify({ params: values }));
};
export const encodeUrlQuery = obj => btoa(JSON.stringify(obj));

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

export const formFilterLink2 = (key, name, b64, category) => {
  const cleanTail = url => {
    if (url[url.length - 1] === '/') {
      return url.substring(0, url.length - 1);
    }
    return url;
  };

  const x = JSON.parse(atob(category)).params.join('/');
  console.log(x);
  let urlquery;
  let obj64 = {
    category: `/${x}`,
    colors: '',
    queryparameters: '',
    sortby: ''
  };
  if (b64) {
    obj64 = JSON.parse(atob(b64));
  }

  if (name === 'Category') {
    [urlquery] = key.split('?');
    urlquery = cleanTail(urlquery);
    return urlquery;
  } else if (name === 'Color') {
    let u;
    [, u] = key.split('color');
    [u] = u.split('/');
    const obj = {
      ...obj64,
      colors: u
    };
    console.log(obj);
    b64 = encodeUrlQuery(obj);
    console.log(b64);

    return `${obj.category}/?filters=${b64}`;
  }
};

export const calculateDiscount = (price, discPrice) => {
  const formatPrice = parseInt(price, 10);
  const formatDiscPrice = parseInt(discPrice, 10);
  const discount = (formatPrice - formatDiscPrice) / formatPrice;
  return Math.round(discount * 100);
};

export const calculateSavings = (price, discPrice) => Math.round(parseInt(price, 10) - parseInt(discPrice, 10));
