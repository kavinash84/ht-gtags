import { createSelector } from 'reselect';

export const items = locationObject =>
  locationObject.results && locationObject.results.length ? locationObject.results[0] : [];

export const getLocationComponents = createSelector(
  [items],
  itemList => itemList.address_components || []
);

export const getCurrentCity = createSelector(
  [getLocationComponents],
  components => {
    let city = '';
    components.forEach(value => {
      const { types = [] } = value;
      if (types.indexOf('locality') !== -1) {
        city = value.long_name || '';
      }
    });
    return city;
  }
);
