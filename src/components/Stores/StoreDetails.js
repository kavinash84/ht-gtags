import React, { Component } from 'react';
import Container from 'hometown-components/lib/Container';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import MenuWithBreadcrumb from 'components/MenuWithBreadcrumb';

const storesImg = require('../../../static/storedemoimg.jpg');

export default class StoreDetails extends Component {
  render() {
    const { store } = this.props;
    return (
      <Div type="block">
        <MenuWithBreadcrumb storeName={store.store} />
        <Section display="flex" pt="2.5rem" pb="4.5rem" mb="0" height="auto">
          <Container type="container" pr="1rem" pl="1rem">
            <Row display="block" mr="0" ml="0" mb="1.25rem  ">
              <Div col="12">
                <Img src={storesImg} alt="Stores" width="100%" />
              </Div>
            </Row>
            <Row display="block" mr="0.625rem" ml="0.625rem">
              <Div col="4">
                <Heading fontSize="1em" mb="0.625rem" color="secondary">
                  STORE ADDRESS
                </Heading>
                <Text fontSize="0.875em" mb="0rem" mt="0.3125rem" color="rgba(0, 0, 0, 0.5)">
                  {store.address || null}
                </Text>
                <Text fontSize="0.875em" mb="0rem" mt="0.3125rem" color="rgba(0, 0, 0, 0.5)">
                  {store.city || null}, {store.state || null}, {store.pincode || null}
                </Text>
              </Div>
              <Div col="2">
                <Heading fontSize="1em" mb="0.625rem" color="secondary">
                  TIMING
                </Heading>
                <Text fontSize="0.875em" mb="0rem" mt="0.3125rem" color="rgba(0, 0, 0, 0.5)">
                  {store.timings || null}
                </Text>
              </Div>
              <Div col="2">
                <Heading fontSize="1em" mb="0.625rem" color="secondary">
                  PHONE
                </Heading>
                <Text fontSize="0.875em" mb="0rem" mt="0.3125rem" color="rgba(0, 0, 0, 0.5)">
                  {store.phone || null}
                </Text>
              </Div>
            </Row>
          </Container>
        </Section>
      </Div>
    );
  }
}

StoreDetails.defaultProps = {
  store: {}
};

StoreDetails.propTypes = {
  store: PropTypes.object
};
