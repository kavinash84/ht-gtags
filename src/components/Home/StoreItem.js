import React from 'react';
import PropTypes from 'prop-types';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';

const styles = require('./Stores.scss');

const Stores = ({
  city, store, address, pincode, state, phone
}) => (
  <Div col={4}>
    <div className={styles.storeBlock}>
      <Img src="https://www.hometown.in/media/cms/hometownv2/compressed/New-Delhi.jpg" alt="" />
      <Row type="block" m="0">
        <Div>
          <Heading color="textDark" fontSize="1em" mt="1rem">
            {store}
          </Heading>
          <Text fontSize="0.875em" mb="0.125rem" mt="0">
            {address}
          </Text>
          <Text fontSize="0.875em" mb="0.125rem" mt="0">
            {city}, {state}, {pincode}
          </Text>
          <Text fontSize="0.875em" mb="0.125rem" mt="0">
            {phone}
          </Text>
        </Div>
      </Row>
    </div>
  </Div>
);

Stores.defaultProps = {
  city: '',
  store: '',
  address: '',
  pincode: '',
  state: '',
  phone: ''
};

Stores.propTypes = {
  city: PropTypes.string,
  store: PropTypes.string,
  address: PropTypes.string,
  pincode: PropTypes.string,
  state: PropTypes.string,
  phone: PropTypes.string
};

export default Stores;
