import { createSelector } from 'reselect';

export const getLocationComponents = locationObject => {
  const { results = [] } = locationObject;
  const item = results.length ? results[0] : {};
  const components = item.address_components || [];
  return components;
};

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
