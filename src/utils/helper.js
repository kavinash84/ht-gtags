import btoa from 'btoa';
import atob from 'atob';

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

export const formFilterLink2 = (key, name, b64, category, value) => {
  const cleanTail = url => {
    if (url[url.length - 1] === '/') {
      return url.substring(0, url.length - 1);
    }
    return url;
  };
  const cleanColor = url => url.split('color');
  const x = JSON.parse(atob(category)).params.join('/');

  let urlquery;
  let price;
  let discount;
  let material;
  let obj64 = {
    category: `/${x}`,
    colors: '',
    price: '',
    queryparameters: '',
    sortby: ''
  };
  if (b64) {
    [b64] = b64.split('&page=');
    obj64 = JSON.parse(atob(b64));
  }
  if (name === 'Category') {
    [urlquery] = key.split('?');
    [urlquery] = cleanColor(urlquery);
    urlquery = cleanTail(urlquery);
    return urlquery;
  }
  if (name === 'Color') {
    let colors;
    [, colors] = key.split('color');
    if (colors) [colors] = colors.split('/');
    obj64 = {
      ...obj64,
      colors
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?filters=${b64}`;
  }
  if (name === 'Price') {
    [, price] = key.split('?price=');
    const priceparameters = price ? `price=${price}` : null;
    obj64 = {
      ...obj64,
      price: priceparameters
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?filters=${b64}`;
  }
  if (name === 'Discount') {
    [, discount] = key.split('discount_percent=');
    const discountparameters = discount ? `discount_percent=${discount}` : null;
    obj64 = {
      ...obj64,
      discount: discountparameters
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?filters=${b64}`;
  }
  if (name === 'Material') {
    [, material] = key.split('z_main_material=');
    const materialparameters = material ? `z_main_material=${material}` : null;
    obj64 = {
      ...obj64,
      material: materialparameters
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?filters=${b64}`;
  }
  if (name === 'SortBy') {
    const sortby = key || 'sort=popularity&dir=desc';
    const sortBy = value || 'Popularity';
    obj64 = {
      ...obj64,
      sortby,
      sortBy
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?filters=${b64}`;
  }
  if (name === 'Pagination') {
    if (b64) {
      return `?filters=${b64}&page=${key}`;
    }
    return `?page=${key}`;
  }
};

export const getParamsDetailFromLink = (query, filter) => {
  let modifiedQuery = query;
  if (!filter) {
    return {
      modifiedQuery
    };
  }
  [filter] = filter.split('&page=');
  const x = JSON.parse(atob(filter));

  if (x.colors) {
    const colorLink = `color${x.colors}`;
    const q = JSON.parse(atob(query));
    q.params.push(colorLink);
    modifiedQuery = btoa(JSON.stringify(q));
  }

  const {
    queryparameters, material, price, discount, sortby, sortBy, page
  } = x;
  return {
    query,
    modifiedQuery,
    queryparameters,
    price,
    discount,
    material,
    sortby,
    sortBy,
    page
  };
};

export const calculateDiscount = (price, discPrice) => {
  const formatPrice = parseInt(price, 10);
  const formatDiscPrice = parseInt(discPrice, 10);
  const discount = (formatPrice - formatDiscPrice) / formatPrice;
  return Math.round(discount * 100);
};

export const calculateSavings = (price, discPrice) => Math.round(parseInt(price, 10) - parseInt(discPrice, 10));
