import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* ====== Modules / Selectors ====== */
import { setCurrentLocation, setError } from 'redux/modules/storelocator';
import { notifSend } from 'redux/modules/notifs';
import { getCurrentCity, getCurrentLocation, getDestination, getStores } from 'selectors/location';
import { gaVisitEvent } from 'redux/modules/stores';

/* ====== Page Components ====== */
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import LocationIcon from 'hometown-components-dev/lib/Icons/LocationHtV1';
import Li from 'hometown-components-dev/lib/LiHtV1';
import LinkRedirect from 'hometown-components-dev/lib/LinkRedirectHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Ul from 'hometown-components-dev/lib/UlHtV1';

/* ====== Page Components ====== */
import { getDistanceBetweenPoints } from 'utils/helper';
import Map from './Map';

const LoaderIcon = require('../../../static/refresh.svg');
const DirectionIcon = require('../../../static/direction.svg');
const styles = require('./StoreLocator.scss');

const customStyles = {
  control: () => ({
    backgroundColor: '#6d7377',
    borderRadius: '6px',
    color: 'white',
    display: 'flex'
  }),
  placeholder: () => ({
    color: 'white'
  }),
  singleValue: () => ({
    color: 'white'
  })
};

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
      nearMe: [],
      isLoading: false,
      currentLocation: {},
      currentCity: null
    };
    this.setCurrentList = this.setCurrentList.bind(this);
    this.GEORADIUS_OFFLINE = 120;
    this.GEORADIUS_ONLINE = 100000;
  }
  componentWillMount() {
    const { data, redirectCity } = this.props;
    if (data && data.items && data.items.text) {
      const mapData = data.items.text;
      this.setState({
        currentList: mapData
      });
    }
    if (redirectCity) {
      this.handleSelectCity(redirectCity);
    }
  }
  setError = msg => {
    const { dispatch } = this.context.store;
    this.setState({ isLoading: false }, () => {
      dispatch(notifSend({
          type: 'error',
          msg,
          dismissAfter: 4000
        }));
    });
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
  directionHandler = (store = '', city = '') => {
    const { gaVisitEvent: recordStoreVisit } = this.props;
    if (store && city) {
      recordStoreVisit({
        city,
        store,
        event: 'event storelocator',
        category: 'Storelocator - Location'
      });
    }
  };
  // handleSelectState = (state, mapData) => {
  //   const currentList = mapData.filter(item => item.state === state);
  //   let lat = 0;
  //   currentList.map(item => {
  //     lat += item.position.lat;
  //     return 0;
  //   });
  //   lat /= currentList.length;
  //   let lng = 0;
  //   currentList.map(item => {
  //     lng += item.position.lng;
  //     return 0;
  //   });
  //   lng /= currentList.length;
  //   this.setState({
  //     currentList,
  //     position: { lat, lng },
  //     currentState: state,
  //     zoomlevel: 8,
  //     open: false
  //   });
  // };
  handleSelectCity = city => {
    if (city) {
      const {
        data: {
          items: { text: list = [] }
        }
      } = this.props;
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
        open: false,
        currentCity: { value: city, label: city }
      });
    }
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
          nearMe: nearByDestinations
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
    } else {
      this.setError('Error in getting near by stores, please try again !');
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
      this.setState({ isLoading: true }, () => {
        navigator.geolocation.getCurrentPosition(this.locationSuccess, this.locationError);
      });
    } else {
      this.setError('Unable to detect the current location !');
    }
  };
  render() {
    const {
 data, locationLoaded, redirectCity, gaVisitEvent: recordStoreDirection
} = this.props;
    const mapData = data.items.text;
    const {
      position,
      zoomlevel,
      open,
      currentList,
      currentState,
      selectedStore,
      isLoading,
      currentLocation,
      currentCity
    } = this.state;
    const selectedCity = currentCity;
    let stateList = mapData.map(item => item.state);
    let cityList = mapData.filter(item => item.state === currentState).map(item => item.city);
    const cities = Array.from(new Set(mapData.filter(item => item.city).map(item => item.city))).map(item => ({
      value: item.toUpperCase(),
      label: item.toUpperCase()
    }));
    cityList = cityList.filter((item, pos) => cityList.indexOf(item) === pos);
    stateList = stateList.filter((item, pos) => stateList.indexOf(item) === pos);
    //
    return (
      <Section>
        <Container variant="container-fluid">
          <Row justifyContent="center">
            <Heading fontSize={42} lineHeight={1.53}>
              Locate a store
            </Heading>
          </Row>
          <Box className={styles.googleMapWrapper}>
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
              recordStoreDirection={recordStoreDirection}
            />
            <Box
              pt={30}
              width={550}
              sx={{
                position: 'absolute',
                left: 30,
                top: 0
              }}
            >
              <Row
                mb={10}
                mx={-10}
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1
                }}
              >
                <Col width={1 / 2} px={10}>
                  <Select
                    placeholder="SELECT CITY"
                    defaultValue={redirectCity || null}
                    value={selectedCity}
                    onChange={({ value }) => {
                      this.handleSelectCity(value);
                    }}
                    options={cities}
                    styles={customStyles}
                  />
                </Col>
                <Col width={1 / 2} px={10}>
                  <Button
                    sx={{ cursor: 'pointer' }}
                    onClick={e => {
                      e.preventDefault();
                      this.detectUserLocation();
                    }}
                  >
                    {isLoading && <Image className="spin" src={LoaderIcon} display="inline" width="20px" va="sub" />}
                    Locate Near Me
                  </Button>
                </Col>
              </Row>
              <Box height={522} overflow="auto" bg="bgSecondary" px={20}>
                <Ul mt={0}>
                  {locationLoaded && currentList.length ? (
                    <Box
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
                    </Box>
                  ) : (
                    ''
                  )}
                  {currentList && !currentList.length ? (
                    <Box py={20}>
                      <h4
                        style={{
                          fontSize: '1rem',
                          margin: 0,
                          padding: 0,
                          color: '#ffffff'
                        }}
                      >
                        {' '}
                        {'We will be in your town very soon..'}
                      </h4>
                    </Box>
                  ) : (
                    ''
                  )}
                  {currentList.map((item, index) => (
                    <Li
                      key={String(index)}
                      py={20}
                      sx={{
                        display: 'flex',
                        borderBottom: '1px solid #FFF',
                        cursor: 'pointer'
                      }}
                    >
                      <Box width="calc(100% - 134px)" onClick={() => this.handleClick(item.store, mapData, item.city)}>
                        <Heading
                          variant="heading.regular"
                          fontSize={16}
                          color="#FFF"
                          mb={8}
                          sx={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <LocationIcon color="#FFF" sx={{ flexShrink: 0 }} /> {item.store.toUpperCase()}
                        </Heading>
                        <Text color="#FFF" fontSize={14} pl={5} lineHeight={1.4}>
                          {item.address}
                        </Text>
                        <Flex sx={{ alignItems: 'center' }} mt={8} pl={5}>
                          <Text color="white" fontSize={14} mr={10}>
                            {item.disText && item.duration ? `${item.disText || ''} | ${item.duration || ''} ` : ''}
                          </Text>
                          {item.disText && (
                            <LinkRedirect
                              title="Hometown Store Locator Direction"
                              href={this.getURL(currentLocation, item.position)}
                              target="_blank"
                              rel="noopener"
                            >
                              <Button
                                variant="link"
                                color="white"
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  cursor: 'pointer'
                                }}
                                onClick={e => {
                                  e.stopPropagation();
                                  this.directionHandler(item.store, item.city);
                                }}
                              >
                                <Image src={DirectionIcon} mr={10} /> Get Direction
                              </Button>
                            </LinkRedirect>
                          )}
                        </Flex>
                      </Box>
                      <Box width={110} pl={20}>
                        <Image alt={item.store} src={item.image_url || 'https://via.placeholder.com/110x110'} />
                      </Box>
                    </Li>
                  ))}
                </Ul>
              </Box>
            </Box>
          </Box>
        </Container>
      </Section>
    );
  }
}
StoreLocator.defaultProps = {
  redirectCity: ''
};
StoreLocator.propTypes = {
  data: PropTypes.object.isRequired,
  gaVisitEvent: PropTypes.func.isRequired,
  locationLoaded: PropTypes.bool.isRequired,
  redirectCity: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(StoreLocator);
