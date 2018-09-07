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

export const formFilterLink2 = (key, name, b64, category, value, selected, urlquery = '') => {
  const cleanTail = url => {
    if (url[url.length - 1] === '/') {
      return url.substring(0, url.length - 1);
    }
    return url;
  };
  const cleanColor = url => url.split('color');

  const x = JSON.parse(atob(category)).params.join('/');
  if (urlquery) urlquery = `q=${urlquery}&`;
  let obj64 = {
    category: `/${x}`,
    colors: '',
    price: '',
    discount: '',
    material: '',
    pageno: '',
    urlquery,
    sortby: ''
  };
  if (b64) {
    [b64] = b64.split('&page=');
    obj64 = JSON.parse(atob(b64));
  }
  if (name === 'Category') {
    let query;
    const splitLink = key.split('?');
    const paramLink = splitLink[0].split('/').filter(z => z !== '');
    if (selected) {
      query = paramLink.filter(param => param !== paramLink[1]);
    } else query = paramLink;
    query = query.join('/');
    [query] = cleanColor(query);
    query = cleanTail(query);
    return `/${query}`;
  }
  if (name === 'Color') {
    let colors;
    [, colors] = key.split('color');
    if (colors) [colors] = colors.split('/');
    obj64 = {
      ...obj64,
      colors,
      pageno: ''
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?${urlquery}filters=${b64}`;
  }
  if (name === 'Price') {
    const [, price] = key.split('price=');
    const priceparameters = price ? `&price=${price}` : null;
    obj64 = {
      ...obj64,
      price: priceparameters,
      pageno: ''
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?${urlquery}filters=${b64}`;
  }
  if (name === 'Discount') {
    const [, discount] = key.split('discount_percent=');
    const discountparameters = discount ? `&discount_percent=${discount}` : null;
    obj64 = {
      ...obj64,
      discount: discountparameters,
      pageno: ''
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?${urlquery}filters=${b64}`;
  }
  if (name === 'Material') {
    const [, material] = key.split('z_main_material=');
    const materialparameters = material ? `&z_main_material=${material}` : null;
    obj64 = {
      ...obj64,
      material: materialparameters,
      pageno: ''
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?${urlquery}filters=${b64}`;
  }
  if (name === 'SortBy') {
    const sortby = `&${key}` || '&sort=popularity&dir=desc';
    const sortBy = value || 'Popularity';
    obj64 = {
      ...obj64,
      sortby,
      sortBy
    };
    b64 = encodeUrlQuery(obj64);
    return `${obj64.category}/?${urlquery}filters=${b64}`;
  }
  if (name === 'Pagination') {
    const pageno = `&page=${key}` || null;
    obj64 = {
      ...obj64,
      pageno
    };
    b64 = encodeUrlQuery(obj64);
    return `?${urlquery}filters=${b64}${pageno}`;
  }
  if (name === 'reset') {
    return obj64.category;
  }
  if (name === 'resetsearch') {
    return `/search/?q=${key}`;
  }
  if (name === 'searchPagination') {
    const pageno = `&page=${value}` || null;
    obj64 = {
      ...obj64,
      pageno
    };
    b64 = encodeUrlQuery(obj64);
    return `/search/?q=${key}&${urlquery}filters=${b64}${pageno}`;
  }
};

export const getParamsDetailFromLink = (query, filter) => {
  let modifiedQuery = query;
  if (!filter) {
    return {
      modifiedQuery,
      urlquery: '',
      price: '',
      discount: '',
      material: '',
      sortby: '',
      sortBy: '',
      pageno: ''
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
    urlquery, material, price, discount, sortby, sortBy, pageno
  } = x;
  return {
    query,
    modifiedQuery,
    urlquery,
    price,
    discount,
    material,
    sortby,
    sortBy,
    pageno
  };
};

export const calculateDiscount = (price, discPrice) => {
  const formatPrice = parseInt(price, 10);
  const formatDiscPrice = parseInt(discPrice, 10);
  const discount = (formatPrice - formatDiscPrice) / formatPrice;
  return Math.round(discount * 100);
};

export const calculateSavings = (price, discPrice) => Math.round(parseInt(price, 10) - parseInt(discPrice, 10));

export const calculateLowestEmi = (data, price) => {
  let lowest = Number(price);
  data.map(item => {
    item.slabs.map(slab => {
      if (slab.slab_keys.emi && slab.slab_keys.emi < lowest) {
        lowest = slab.slab_keys.emi;
      }
      return 0;
    });
    return 0;
  });
  return lowest;
};

export const titleCase = str =>
  str
    .replace(/<(?:.|\n)*?>/gm, '')
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const urlKeyResults = results => {
  if (results && typeof results === 'object' && results.constructor === Object) return [];
  const searchResults = results.filter(result => result.url_key !== '').map(x => {
    const { url_key: urlKey } = x;
    if (urlKey.indexOf('/') !== 0) return x;
    return {
      ...x,
      url_key: urlKey.slice(1)
    };
  });
  return searchResults;
};

export const formatProductURL = (name, sku) => {
  const productname = name
    .replace(/[^a-zA-Z0-9]/g, '-')
    .split(' ')
    .join('-')
    .toLowerCase();
  return `/${productname}/sku/${sku}`;
};

export const filterCategoryDetails = data => data.filter(item => item !== null);

export const checkRedirection = path => {
  const pattern = /^\/(login|signup)\/$/;
  if (pattern.test(path)) return '/';
  return path;
};

export const isKeyExists = (obj, nesting) => {
  const value = nesting.split('.').reduce((a, b) => (a || {})[b], obj);
  if (!value) return false;
  return value;
};

export const getImageURL = (url, size) => {
  if (!url) return null;
  const urlCheck = url.replace(/(beta.|stage.)/, 'static');
  const [first] = urlCheck.split('.jpg');
  if (first) {
    const rp = first.replace(/(-product_500|-catalog|-catalog_360|-zoom)/, '');
    const imageurl = `${rp}-${size}.jpg`;
    return imageurl;
  }
  return null;
};
