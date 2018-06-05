import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Title from 'components/Title';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import { filterStoreList } from 'selectors/homepage';
import StoresCarouselItem from './StoresCarouselItem';
import StoreListItem from './StoreListItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 7,
  slidesToScroll: 7,
  autoplay: false
};

@connect(({ stores }) => ({
  filteredStores: filterStoreList(stores)
}))
export default class StoresCarousel extends Component {
  render() {
    const { cities, filteredStores } = this.props;
    return (
      <Section p="0" pt="2.5rem" mb="0" className="storeCarousel">
        <Container pr="0" pl="0">
          <Row type="block" m="0" mb="0.5rem">
            <Title title="Stores" subTitle="" />
          </Row>
          <Row type="block" m="0" mb="0.5rem">
            <Div col={12} p="0 0.75rem 0.5rem">
              <SlickSlider settings={settings}>
                {cities.map((city, index) => (
                  <div key={String(index)}>
                    <StoresCarouselItem city={city} />
                  </div>
                ))}
              </SlickSlider>
            </Div>
          </Row>
          <Row type="block" m="0" mb="0.5rem">
            {filteredStores.map((store, index) => (
              <StoreListItem
                key={String(index)}
                city={store.city}
                store={store.store}
                address={store.address}
                pincode={store.pincode}
                state={store.state}
                phone={store.phone}
              />
            ))}
          </Row>
        </Container>
      </Section>
    );
  }
}

StoresCarousel.defaultProps = {
  cities: [],
  filteredStores: []
};

StoresCarousel.propTypes = {
  cities: PropTypes.array,
  filteredStores: PropTypes.array
};
