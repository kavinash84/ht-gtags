import { createSelector } from 'reselect';
import { isKeyExists } from 'utils/helper';

/* Stores */
export const storesData = stores =>
  stores.data || {
    items: {
      text: []
    }
  };

export const staticBlockData = blockData =>
  blockData.data || {
    items: {
      text: {}
    }
  };

export const storesList = createSelector([storesData], data => data.items.text) || [];

export const selectedCity = stores => stores.selectedCity;

export const getAllCities = createSelector([storesList], items => items.map(item => item.city.toLowerCase())) || [];

export const getCities = createSelector([getAllCities], cities =>
  cities.filter((item, i, arr) => arr.indexOf(item) === i).map(city => city.toUpperCase()));

export const filterStoreList = createSelector([storesList, selectedCity], (stores, city) =>
  stores.filter(store => store.city.toUpperCase() === city));

export const getOfferStripData = createSelector([staticBlockData], data => isKeyExists(data, 'items.text.offer_strip'));

export const getMiddleBannerData = createSelector([staticBlockData], data =>
  isKeyExists(data, 'items.text.middle_banner'));

export const getMetaDescription = createSelector([staticBlockData], data =>
  isKeyExists(data, 'items.meta_description'));

export const getTitle = createSelector([staticBlockData], data => isKeyExists(data, 'items.page_title'));

export const getText = createSelector([staticBlockData], data => isKeyExists(data, 'items.text'));
