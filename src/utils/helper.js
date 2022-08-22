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
export const calculateTotalSavings = (price, discPrice) => {
  const value = Math.round(parseInt(price, 10) - parseInt(discPrice, 10));
  return value;
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
    try {
      obj64 = JSON.parse(atob(b64));
    } catch (e) {
      return obj64.category;
    }
  }
  if (name === 'Category') {
    let query;
    const splitLink = key.split('?');
    const paramLink = splitLink[0].split('/').filter(z => z !== '');
    if (paramLink.length >= 4) {
      paramLink.splice(1, 1);
    }
    query = paramLink;
    query = query.join('/');
    [query] = cleanColor(query);
    query = cleanTail(query);
    query = query.replace('catalog/', '');
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
    const [, material] = key.split('main_material=');
    const materialparameters = material ? `&main_material=${material}` : null;
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
  let x;
  try {
    x = JSON.parse(atob(filter));
  } catch (e) {
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
  data.emi.map(item => {
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

export const titleCase = str => {
  if (str) {
    return str
      .replace(/<(?:.|\n)*?>/gm, '')
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  return '';
};
export const urlKeyResults = results => {
  if (results && typeof results === 'object' && results.constructor === Object) return [];
  const searchResults = results
    .filter(result => result.url_key !== '')
    .map(x => {
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
    .replace('&', 'and')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .split(' ')
    .join('-')
    .toLowerCase();
  return `/${productname}/sku/${sku}`;
};

export const filterCategoryDetails = data => data.filter(item => item !== null);

export const checkRedirection = path => {
  const pattern = /^\/(login|signup|forgot-password)/;
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
  return url.replace(/(-product_500.jpg|-catalog_360.jpg|-catalog.jpg|-zoom.jpg)/, `-${size}.jpg`);
};

export const allowNChar = (value, n) => {
  if (value.length <= n) {
    return true;
  }
  return false;
};

// GST Number will be of 15 digits having below validations:
// state code - ( 2 digit )
// pan card - ( 10 digit RRPKN9894K)
// entity code - ( 2 digit )
// blank - ( 2 digit )
// check digit ( 2 digit )

// ex - 29 ABCD E 1234 F 2Z5

export const isGSTNumber = value => {
  const isGST = /^([0-9]){2}([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}([0-9]){1}([a-zA-Z]){1}([a-zA-Z0-9]){1}?$/.test(value);
  if (isGST) {
    return true;
  }
  return false;
};

export const allowTypeOf = (value, type) => {
  if (type === 'number') {
    return /^\d+$/.test(value);
  }
};

export const smoothScroll = speed => {
  if (!window) return;
  let pageoffset = window.pageYOffset;
  const scroller = pset =>
    new Promise(resolve => {
      window.setTimeout(() => {
        window.scroll(0, pset);
        resolve();
      }, 2);
    });
  (async () => {
    while (pageoffset > 0) {
      pageoffset -= speed ** 2;
      /* eslint-disable no-await-in-loop */
      await scroller(pageoffset);
    }
  })();
};

export const redirectionHelper = url => {
  if (url) {
    const hasForwardSlash = url[url.length - 1] === '/';
    if (hasForwardSlash) return url;
    return `${url}/`;
  }
  return '';
};
export const deg2rad = deg => deg * (Math.PI / 180);
export const getDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + //eslint-disable-line
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); //eslint-disable-line
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};
// export const getVideoID = url => {
//   if (url.indexOf('youtube') >= 1 || url.indexOf('youtu') >= 1) {
//     const [, id] = url.split('?v=');
//     return id;
//   }
// };
export const getVideoID = url => url;
export const getDateFilters = config => {
  const days = config.days || [];
  const months = config.months || [];
  const years = config.years || 0;
  const currentDate = new Date();
  const daysFilters = days.map(val => {
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() - val);
    const pastDate = new Date(dateNow);
    pastDate.setHours(0);
    pastDate.setMinutes(0);
    pastDate.setSeconds(0);
    return {
      value: `Last ${val} Days`,
      label: `Last ${val} Days`,
      start: pastDate.toString(),
      end: currentDate.toString()
    };
  });
  const monthsFilters = months.map(val => {
    const dateNow = new Date();
    dateNow.setMonth(dateNow.getMonth() - val);
    const pastDate = new Date(dateNow);
    pastDate.setHours(0);
    pastDate.setMinutes(0);
    pastDate.setSeconds(0);
    return {
      value: `Last ${val} Months`,
      label: `Last ${val} Months`,
      start: pastDate.toString(),
      end: currentDate.toString()
    };
  });
  const yearsFilter = [];
  for (let i = 0; i < years; i += 1) {
    const latest = new Date();
    const val = latest.getFullYear() - i;
    latest.setFullYear(latest.getFullYear() - i);
    const lastDate = new Date(latest);
    lastDate.setMonth(0);
    lastDate.setDate(1);
    lastDate.setHours(0);
    lastDate.setMinutes(0);
    lastDate.setSeconds(0);
    const tillDate = new Date();
    tillDate.setFullYear(tillDate.getFullYear() - i);
    if (i) {
      tillDate.setMonth(11);
      tillDate.setDate(31);
      tillDate.setHours(23);
      tillDate.setMinutes(59);
      tillDate.setSeconds(59);
    }
    yearsFilter.push({
      value: val,
      label: val,
      start: lastDate.toString(),
      end: tillDate.toString()
    });
  }
  const allFilters = [...daysFilters, ...monthsFilters, ...yearsFilter];
  return allFilters;
};
