import btoa from 'btoa';
import filterName from '../data/Filter.js';

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

export const getFilters = filters => filters.filter(item => filterName.includes(item.name));

export const getSelectedFilters = filters => {
  const newFilters = filters.map(item =>
    item.attributes.filter(value => value.isSelected).length >= 1
      ? item.attributes.filter(value => value.isSelected)
      : null);

  return newFilters.filter(item => item);
};
