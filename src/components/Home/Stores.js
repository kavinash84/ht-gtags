import React from 'react';
import PropTypes from 'prop-types';
import Title from 'components/Title';
import Section from 'hometown-components/lib/Section';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import StoreCarousel from './StoreCarousel';
import StoreItem from './StoreItem';

const Stores = ({ data, categoryName, subTitle }) => (
  <Section p="0" pt="2.5rem" mb="0">
    <Container pr="0" pl="0">
      <Row type="block" m="0" mb="0.5rem">
        <Title title={categoryName} subTitle={subTitle} />
      </Row>
      <Row type="block" m="0" mb="0.5rem">
        <Div col={12} p="0 0.75rem 1rem">
          <StoreCarousel
            autoPlayVal={false}
            className="storeSlider"
            showThumbsVal={false}
            showStatusVal={false}
            showArrowsVal
            showIndicatorsVal={false}
            infiniteLoopVal={false}
            centerModeVal
            centerSlidePercentageVal={20}
            data={data}
          />
        </Div>
      </Row>
      <Row type="block" m="0" mb="0.5rem">
        {data.map((store, index) => (
          <StoreItem
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

Stores.defaultProps = {
  data: [],
  categoryName: '',
  subTitle: ''
};

Stores.propTypes = {
  data: PropTypes.array,
  categoryName: PropTypes.string,
  subTitle: PropTypes.string
};

export default Stores;
