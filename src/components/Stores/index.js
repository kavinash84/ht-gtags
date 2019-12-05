import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Title from 'components/Title';
import Section from 'hometown-components-dev/lib/Section';
import Container from 'hometown-components-dev/lib/Container';
import Row from 'hometown-components-dev/lib/Row';
import Div from 'hometown-components-dev/lib/Div';
import { hyphenedString } from 'utils/helper';
import { filterStoreList } from 'selectors/homepage';
import { gaVisitEvent } from 'redux/modules/stores';
import StoresCarouselItem from './StoresCarouselItem';
import StoreListItem from './StoreListItem';
import SlickSlider from '../SlickSlider';

const settings = {
  slidesToShow: 6,
  slidesToScroll: 6,
  autoplay: false,
  infinite: false
};
const mapDispatchToProps = dispatch => bindActionCreators({ gaVisitEvent }, dispatch);
const mapStateToProps = ({ stores }) => ({
  filteredStores: filterStoreList(stores)
});
class StoresCarousel extends Component {
  render() {
    const { cities, filteredStores, gaVisitEvent: recordStoreVisit } = this.props;
    return (
      <Section p="0" pt="2.5rem" pb="2rem" mb="0" className="storeCarousel">
        <Container pr="0" pl="0">
          <Row type="block" m="0" mb="0.5rem">
            {cities && cities.length > 0 && <Title title="Stores" subTitle="" />}
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
          <Row type="block" m="0 1.5rem 0.5rem">
            {filteredStores.map((store, index) => {
              const url =
                store.meta.url.length > 0
                  ? store.meta.url
                  : `/store/${hyphenedString(store.city).toLowerCase()}/${hyphenedString(store.store).toLowerCase()}`;
              return (
                <StoreListItem
                  key={String(index)}
                  city={store.city}
                  store={store.store}
                  address={store.address}
                  pincode={store.pincode}
                  state={store.state}
                  phone={store.phone}
                  url={url}
                  visitHandler={recordStoreVisit}
                />
              );
            })}
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
  filteredStores: PropTypes.array,
  gaVisitEvent: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoresCarousel);
