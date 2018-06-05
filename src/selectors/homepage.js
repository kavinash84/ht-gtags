import { createSelector } from 'reselect';

export const storesList = state => state.data || [];

export const getAllCities = createSelector([storesList], items => items.map(item => item.city)) || [];

export const getCities = createSelector([getAllCities], cities =>
  cities.filter((item, i, arr) => arr.indexOf(item) === i).map(city => city.toUpperCase()));
