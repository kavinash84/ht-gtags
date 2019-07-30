import { createSelector } from 'reselect';

export const items = locationObject =>
  locationObject.address_components && locationObject.address_components.length
    ? locationObject.address_components
    : [];

export const getCurrentCity = createSelector(
  [items],
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
export const location = locationObject =>
  locationObject.geometry && locationObject.geometry.location ? locationObject.geometry.location : {};

export const getCurrentLocation = createSelector(
  [location],
  currentPosition => currentPosition
);
