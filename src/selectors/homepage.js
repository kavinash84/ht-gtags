import { createSelector } from 'reselect';

/* Stores */
export const storesList = stores => stores.data || [];

export const selectedCity = stores => stores.selectedCity;

export const getAllCities = createSelector([storesList], items => items.map(item => item.city.toLowerCase())) || [];

export const getCities = createSelector([getAllCities], cities =>
  cities.filter((item, i, arr) => arr.indexOf(item) === i).map(city => city.toUpperCase()));

export const filterStoreList = createSelector([storesList, selectedCity], (stores, city) =>
  stores.filter(store => store.city.toUpperCase() === city));
