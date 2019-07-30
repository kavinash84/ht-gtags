import axios from 'axios';
import { STATIC_BLOCK } from 'helpers/apiUrls';
import { mapKey } from 'helpers/Constants';

const LOAD_STORES_DATA = 'storelocator/LOAD_STORES_DATA';
const LOAD_STORES_DATA_SUCCESS = 'storelocator/LOAD_STORES_DATA_SUCCESS';
const LOAD_STORES_DATA_FAIL = 'storelocator/LOAD_STORES_DATA_FAIL';
const LOAD_LOCATION_DATA = 'storelocator/LOAD_LOCATION_DATA';
const LOAD_LOCATION_DATA_SUCCESS = 'storelocator/LOAD_LOCATION_DATA_SUCCESS';
const LOAD_LOCATION_DATA_FAIL = 'storelocator/LOAD_LOCATION_DATA_FAIL';
const MAP_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

const initialState = {
  loading: false,
  loaded: false,
  data: [],
  locationLoading: false,
  locationLoaded: false,
  locationData: {}
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_STORES_DATA:
      return {
        ...state,
        loading: true
      };
    case LOAD_STORES_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_STORES_DATA_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_LOCATION_DATA:
      return {
        ...state,
        locationLoading: true
      };
    case LOAD_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        locationLoading: false,
        locationLoaded: true,
        locationData: action.result.data.results[0] || {}
      };
    case LOAD_LOCATION_DATA_FAIL:
      return {
        ...state,
        locationLoading: false,
        locationLoaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const loadStoresData = () => ({
  types: [LOAD_STORES_DATA, LOAD_STORES_DATA_SUCCESS, LOAD_STORES_DATA_FAIL],
  promise: ({ client }) => client.get(`${STATIC_BLOCK}/store_react`)
});

export const setCurrentLocation = (lat, lng) => ({
  types: [LOAD_LOCATION_DATA, LOAD_LOCATION_DATA_SUCCESS, LOAD_LOCATION_DATA_FAIL],
  promise: ({ client }) => axios.get(`${MAP_URL}?latlng=${lat},${lng}&key=${mapKey}`) //eslint-disable-line
});
