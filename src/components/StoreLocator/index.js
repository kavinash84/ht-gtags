import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import { Label } from 'hometown-components/lib/Label';
import Map from './Map';
import mapData from './mapData';

const styles = require('./StoreLocator.scss');

class StoreLocator extends React.Component {
  state = {
    position: { lat: 21.821027, lng: 78.415743 }, // Default Centre of
    zoomlevel: 5,
    open: false,
    currentList: [],
    currentState: null,
    currentCity: null
  };
  componentWillMount() {
    this.setState({
      currentList: mapData
    });
  }

  handleClick = value => {
    const details = mapData.filter(item => item.store === value)[0];
    const { position } = details;
    this.setState({
      position,
      open: true,
      zoomlevel: 16
    });
  };

  handleSelectState = state => {
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
      currentCity: null,
      zoomlevel: 8,
      open: false
    });
  };

  handleSelectCity = city => {
    let currentList = this.state.currentList.filter(item => item.city === city);
    if (currentList.length === 0) {
      currentList = mapData;
    }
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
      currentCity: city
    });
  };

  render() {
    const {
      position, zoomlevel, open, currentList, currentState, currentCity
    } = this.state;
    //
    let stateList = mapData.map(item => item.state);
    stateList = stateList.filter((item, pos) => stateList.indexOf(item) === pos);
    let cityList = currentList.map(item => item.city);
    cityList = cityList.filter((item, pos) => cityList.indexOf(item) === pos);
    //
    return (
      <Div type="block">
        <Section mb="0" p="1.375rem 0.5rem" bg="oldMont" boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row display="block" mr="0" ml="0" mb="0">
              <Heading fontSize="1.75rem" color="white" mt="0" mb="0" fontWeight="400">
                Store Locator
              </Heading>
            </Row>
          </Container>
        </Section>
        <Section pt="0" p="0" mb="0">
          <Row display="block" mr="0" ml="0" mb="0">
            <Div className={styles.googleMapWrapper}>
              <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={<div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: '100%' }} />}
                position={position}
                zoom={zoomlevel}
                mapData={mapData}
                open={open}
              />
              <Div className={styles.filterWrapper}>
                <div className={`${styles.filterBlock} dropdownWrapper`}>
                  <Button
                    btnType="custom"
                    size="block"
                    bg="#FFF"
                    color="#656565"
                    border="none"
                    fontSize="0.75em"
                    tt="uppercase"
                    fontWeight="medium"
                    className={styles.filterDD}
                  >
                    {currentState || 'Select State'}
                  </Button>
                  <div className={`dropDown ${styles.dropDown}`}>
                    <ul>
                      {stateList.map(item => (
                        <li key={item}>
                          <button onClick={() => this.handleSelectState(item)}>
                            <Label fontSize="0.75em" ml="0.625rem">
                              {item}
                            </Label>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {currentState && (
                  <div className={`${styles.filterBlock} dropdownWrapper`}>
                    <Button
                      btnType="custom"
                      size="block"
                      bg="#FFF"
                      color="#656565"
                      border="none"
                      fontSize="0.75em"
                      tt="uppercase"
                      fontWeight="medium"
                      className={styles.filterDD}
                    >
                      {currentCity || 'Select City'}
                    </Button>
                    <div className={`dropDown ${styles.dropDown}`}>
                      <ul>
                        {cityList.map(item => (
                          <li key={item}>
                            <button onClick={() => this.handleSelectCity(item)}>
                              <Label fontSize="0.75em" ml="0.625rem">
                                {item}
                              </Label>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className={styles.cistList}>
                  <ul>
                    {currentList.map((item, index) => (
                      <li key={String(index)}>
                        <button onClick={() => this.handleClick(item.store)}>
                          <Label fontSize="1rem" mt="0" ml="0">
                            {item.store}
                          </Label>
                          <address>{item.address}</address>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </Div>
            </Div>
          </Row>
        </Section>
      </Div>
    );
  }
}

export default StoreLocator;
