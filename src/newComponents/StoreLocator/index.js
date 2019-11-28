import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* ====== Modules / Selectors ====== */
import { setCurrentLocation, setError } from 'redux/modules/storelocator';
import { notifSend } from 'redux/modules/notifs';
import { getCurrentCity, getCurrentLocation, getDestination, getStores } from 'selectors/location';
import { gaVisitEvent } from 'redux/modules/stores';

/* ====== Page Components ====== */
import BoxHtV1 from 'hometown-components/lib/BoxHtV1';
import Container from 'hometown-components/lib/ContainerHtV1';
import Image from 'hometown-components/lib/ImageHtV1';
import Heading from 'hometown-components/lib/HeadingHtV1';
import Row from 'hometown-components/lib/RowHtV1';
import Section from 'hometown-components/lib/SectionHtV1';
import Label from 'hometown-components/lib/LabelHtV1';

/* ====== Page Components ====== */
import { getDistanceBetweenPoints } from 'utils/helper';
import Map from './Map';

const LoaderIcon = require('../../../static/refresh.svg');
const styles = require('./StoreLocator.scss');

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      gaVisitEvent,
      setCurrentLocation,
      setError
    },
    dispatch
  );

const mapStateToProps = ({
  storelocator: {
    locationData, locationLoaded, locationLoading, data
  }
}) => ({
  city: getCurrentCity(locationData),
  location: getCurrentLocation(locationData),
  locationLoaded,
  locationLoading,
  data
});

class StoreLocator extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      position: { lat: 21.821027, lng: 78.415743 }, // Default Centre of
      zoomlevel: 5,
      open: false,
      currentList: [],
      currentState: null,
      selectedStore: '',
      selectCity: false,
      nearMe: [],
      isLoading: false,
      currentLocation: {}
    };
    this.setCurrentList = this.setCurrentList.bind(this);
    this.GEORADIUS_OFFLINE = 120;
    this.GEORADIUS_ONLINE = 100000;
  }
  componentWillMount() {
    const { data } = this.props;
    if (data && data.items && data.items.text) {
      const mapData = data.items.text;
      this.setState({
        currentList: mapData
      });
    }
  }
  // componentWillReceiveProps(nextProps) {
  //   const { locationLoaded, data, loc } = nextProps;
  //   if (data && data.items && data.items.text && locationLoaded && loc.lat && loc.lng) {
  //     const mapData = data.items.text;
  //     console.log(mapData);
  //     // this.handleNearestLocation(loc, mapData);
  //   }
  // }
  setError = msg => {
    const { dispatch } = this.context.store;
    dispatch(notifSend({
      type: 'error',
      msg,
      dismissAfter: 4000
    }));
  };
  getURL = (origin, dest) => {
    const baseUrl = 'http://maps.google.com/?';
    const start = `saddr=${origin.lat || ''},${origin.lng || ''}`;
    const destination = `&daddr=${dest.lat || ''},${dest.lng || ''}`;
    const mapURL = `${baseUrl}${start}${destination}`;
    return mapURL;
  };
  getGoogleLatLng = locations => {
    const result = [];
    locations.forEach(location => {
      const { position: item } = location;
      if (item.lat && item.lng && window && window.google) {
        result.push(new window.google.maps.LatLng(item.lat, item.lng));
      }
    });
    return result;
  };
  setCurrentList(elements) {
    const { nearMe } = this.state;
    const rawData = {};
    const rawIds = [];
    nearMe.forEach((item, i) => {
      const { distance = {}, duration = {} } = elements[i];
      if (distance.value && item.id && distance.value < this.GEORADIUS_ONLINE) {
        rawData[item.id] = {
          disText: distance.text || '',
          disValue: distance.value || '',
          duration: duration.text || ''
        };
        rawIds.push(item.id);
      }
    });
    const { data } = this.props;
    const stores = getStores(data);
    // const filteredStores = stores.filter(item => rawIds.indexOf(item.id) !== -1);
    const currentList = [];
    stores.forEach(item => {
      //eslint-disable-line
      const { id = '' } = item;
      if (rawData[id]) {
        currentList.push({
          ...item,
          ...rawData[id]
        });
      }
    });
    currentList.sort((a, b) => {
      const point1 = parseInt(a.disText || '', 10);
      const point2 = parseInt(b.disText || '', 10);
      return point1 - point2;
    });
    let lat = 0;
    currentList.map(item => {
      lat += item.position.lat;
      return 0;
    });
    lat /= currentList.length;
    let lng = 0;
    currentList.map(item => {
      lng += item.position.lng;
      return 0;
    });
    lng /= currentList.length;
    this.setState({
      currentList,
      position: { lat, lng },
      zoomlevel: 11,
      open: false
    });
  }
  nearByStores = (currentLocation, destinations) => {
    const { lat: lat1, lng: lng1 } = currentLocation;
    const stores = [];
    destinations.forEach(pos => {
      const { position } = pos;
      const { lat: lat2, lng: lng2 } = position;
      const dis = getDistanceBetweenPoints(lat1, lng1, lat2, lng2);
      const distance = Number(dis.toFixed(0));
      if (lat2 && lng2 && distance <= this.GEORADIUS_OFFLINE) {
        stores.push(pos);
      }
    });
    return stores;
  };
  handleClick = (store = '', mapData, city = '') => {
    const details = mapData.filter(item => item.store === store)[0];
    const { position } = details;
    // const { open } = this.state;
    this.setState({
      position,
      open: true,
      zoomlevel: 16,
      selectedStore: store
    });
    const { gaVisitEvent: recordStoreVisit } = this.props;
    recordStoreVisit({
      city,
      store,
      event: 'event storelocator',
      category: 'Storelocator'
    });
  };
  handleSelectState = (state, mapData) => {
    const currentList = mapData.filter(item => item.state === state);
    let lat = 0;
    currentList.map(item => {
      lat += item.position.lat;
      return 0;
    });
    lat /= currentList.length;
    let lng = 0;
    currentList.map(item => {
      lng += item.position.lng;
      return 0;
    });
    lng /= currentList.length;
    this.setState({
      currentList,
      position: { lat, lng },
      currentState: state,
      zoomlevel: 8,
      open: false
    });
  };
  handleSelectCity = (city, list) => {
    const currentList = list.filter(item => item.city.toUpperCase() === city.toUpperCase());
    let lat = 0;
    currentList.map(item => {
      lat += item.position.lat;
      return 0;
    });
    lat /= currentList.length;
    let lng = 0;
    currentList.map(item => {
      lng += item.position.lng;
      return 0;
    });
    lng /= currentList.length;
    this.setState({
      currentList,
      position: { lat, lng },
      zoomlevel: 11,
      open: false
    });
  };
  locationSuccess = position => {
    const lat = position.coords.latitude || '';
    const lng = position.coords.longitude || '';
    const { data: stores } = this.props;
    // setLocation(lat, lng);
    if (lat && lng && window && window.google) {
      const destinations = getDestination(stores);
      const nearByDestinations = this.nearByStores({ lat, lng }, destinations);
      const googleLatLng = this.getGoogleLatLng(nearByDestinations);
      const matrix = new window.google.maps.DistanceMatrixService();
      this.setState(
        {
          currentLocation: { lat, lng },
          nearMe: nearByDestinations,
          isLoading: true
        },
        () => {
          matrix.getDistanceMatrix(
            {
              origins: [new window.google.maps.LatLng(lat, lng)],
              destinations: googleLatLng,
              travelMode: window.google.maps.TravelMode.DRIVING
            },
            (response, status) => {
              if (status === 'OK') {
                this.setState({ isLoading: false }, () => {
                  const rows = response && response.rows ? response.rows[0] : {};
                  const elements = rows.elements || [];
                  this.setCurrentList(elements);
                });
              } else {
                this.setError('Error in getting near by stores, please try again !');
              }
            }
          );
        }
      );
    }
  };
  locationError = error => {
    const { code } = error;
    switch (code) {
      case 1:
        this.setError(`We need location permission, to fetch stores near you !
          Please provide permission by visiting Settings>location`);
        break;
      case 2:
        this.setError('Not able to detect current location, please select from the drop down!');
        break;
      case 3:
        this.setError('Location not available, please try after some time !');
        break;
      default:
    }
  };
  detectUserLocation = () => {
    // const { setCurrentLocation: setLocation } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
    } else {
      this.setError('Unable to detect the current location !');
    }
  };
  render() {
    const { data, locationLoaded } = this.props;
    const mapData = data.items.text;
    const {
      position,
      zoomlevel,
      open,
      currentList,
      currentState,
      selectedStore,
      selectCity,
      isLoading,
      currentLocation
    } = this.state;
    //
    let stateList = mapData.map(item => item.state);
    let cityList = mapData.filter(item => item.state === currentState).map(item => item.city);
    cityList = cityList.filter((item, pos) => cityList.indexOf(item) === pos);
    stateList = stateList.filter((item, pos) => stateList.indexOf(item) === pos);
    //
    return (
      <BoxHtV1>
        <Section>
          <Container>
            <Row>
              <Heading>Store Locator</Heading>
            </Row>
          </Container>
        </Section>
        <Section pt="0" p="0" mb="0">
          <Row display="block" mr="0" ml="0" mb="0">
            <BoxHtV1 className={styles.googleMapWrapper}>
              <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                position={position}
                zoom={zoomlevel}
                mapData={mapData}
                open={open}
                handleClick={this.handleClick}
                selectedStore={selectedStore}
                currentLocation={currentLocation}
              />
              <BoxHtV1 className={styles.filterWrapper}>
                <button
                  style={{ marginBottom: '4px', marginRight: '10px' }}
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ selectCity: true });
                  }}
                  className={styles.selectLocation}
                >
                  Select Store
                </button>
                <button
                  style={{ marginBottom: '4px' }}
                  onClick={e => {
                    e.preventDefault();
                    this.detectUserLocation();
                  }}
                  className={styles.selectLocation}
                >
                  {isLoading && <Image className="spin" src={LoaderIcon} display="inline" width="20px" va="sub" />}
                  Store Near Me
                </button>
                {selectCity && (
                  <select onChange={e => this.handleSelectState(e.target.value, mapData)}>
                    <option value={null} key="state">
                      SELECT STATE
                    </option>
                    {stateList.map(item => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                )}

                {selectCity &&
                  currentState && (
                  <select onChange={e => this.handleSelectCity(e.target.value, mapData)}>
                    <option value={null} key="state">
                        SELECT CITY
                    </option>
                    {cityList.map(item => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                )}
                <div className={styles.cistList}>
                  <ul>
                    {locationLoaded && currentList.length ? (
                      <div
                        style={{
                          margin: '0 0 5px 0',
                          padding: '4px',
                          border: '2px solid f98d2936',
                          borderRadius: '4px',
                          backgroundColor: '#ffa500'
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '1rem',
                            margin: 0,
                            padding: 0,
                            color: '#ffffff'
                          }}
                        >
                          {' '}
                          Nearest Hometown Stores
                        </h4>
                      </div>
                    ) : (
                      ''
                    )}
                    {currentList && !currentList.length ? (
                      <div
                        style={{
                          margin: '0 0 5px 0',
                          padding: '4px',
                          border: '2px solid f98d2936',
                          borderRadius: '4px',
                          backgroundColor: '#000000cc'
                        }}
                      >
                        <h4
                          style={{
                            fontSize: '1rem',
                            margin: 0,
                            padding: 0,
                            color: '#ffffff'
                          }}
                        >
                          {' '}
                          We will be in your town very soon..
                        </h4>
                      </div>
                    ) : (
                      ''
                    )}
                    {currentList.map((item, index) => (
                      <li key={String(index)}>
                        <button onClick={() => this.handleClick(item.store, mapData, item.city)}>
                          <Label fontSize="1rem" mt="0" ml="0">
                            {item.store.toUpperCase()}
                          </Label>
                          <address style={{ color: 'black', fontStyle: 'normal' }}>{item.address}</address>
                          <a
                            title="Hometown Store Locator Direction"
                            href={this.getURL(currentLocation, item.position)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.disText && item.duration ? `${item.disText || ''} | ${item.duration || ''} ` : ''}
                            <button className={styles.directionBtn}>Direction</button>
                          </a>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </BoxHtV1>
            </BoxHtV1>
          </Row>
        </Section>
      </BoxHtV1>
    );
  }
}
StoreLocator.propTypes = {
  data: PropTypes.object.isRequired,
  gaVisitEvent: PropTypes.func.isRequired,
  locationLoaded: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreLocator);
