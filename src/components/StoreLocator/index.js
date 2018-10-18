import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import { Label } from 'hometown-components/lib/Label';
import PropTypes from 'prop-types';
import Map from './Map';

const styles = require('./StoreLocator.scss');

class StoreLocator extends React.Component {
  static propTypes = {
    data: PropTypes.object
  };
  static defaultProps = {
    data: {}
  };
  state = {
    position: { lat: 21.821027, lng: 78.415743 }, // Default Centre of
    zoomlevel: 5,
    open: false,
    currentList: [],
    currentState: null
  };
  componentWillMount() {
    const { data } = this.props;
    if (data && data.items && data.items.text) {
      const mapData = data.items.text;
      this.setState({
        currentList: mapData
      });
    }
  }

  handleClick = (value, mapData) => {
    const details = mapData.filter(item => item.store === value)[0];
    const { position } = details;
    this.setState({
      position,
      open: true,
      zoomlevel: 16
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
    const currentList = list.filter(item => item.city === city);
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

  render() {
    const { data } = this.props;
    const mapData = data.items.text;
    const {
      position, zoomlevel, open, currentList, currentState
    } = this.state;
    //
    let stateList = mapData.map(item => item.state);
    let cityList = mapData.filter(item => item.state === currentState).map(item => item.city);
    cityList = cityList.filter((item, pos) => cityList.indexOf(item) === pos);
    stateList = stateList.filter((item, pos) => stateList.indexOf(item) === pos);
    //
    return (
      <Div type="block">
        <Section mb="0" p="1.375rem 0.5rem" bg="bg" boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)">
          <Container type="container" pr="0.5rem" pl="0.5rem">
            <Row display="block" mr="0" ml="0" mb="0">
              <Heading fontSize="1.75rem" color="text" mt="0" mb="0" fontFamily="regular">
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

                {currentState && (
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
                    {currentList.map((item, index) => (
                      <li key={String(index)}>
                        <button onClick={() => this.handleClick(item.store, mapData)}>
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
