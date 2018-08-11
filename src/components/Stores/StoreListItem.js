import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import Heading from 'hometown-components/lib/Heading';
// import Img from 'hometown-components/lib/Img';

const styles = require('./Stores.scss');

const StoreListItem = ({
  city, store, address, pincode, state, phone, url
}) => (
  <Div col={4}>
    <div className={styles.storeBlock}>
      <Link to={url}>
        {/* <Img src="https://www.hometown.in/media/cms/hometownv2/compressed/New-Delhi.jpg" alt="" /> */}
        <Row type="block" m="0">
          <Div>
            <Heading color="textDark" fontSize="1em" mt="0">
              {store}
            </Heading>
            <Text fontSize="0.875em" mb="0.125rem" mt="0">
              {address}
            </Text>
            <Text fontSize="0.875em" mb="0.125rem" mt="0">
              {city}, {state}, {pincode}
            </Text>
            <Text fontSize="0.875em" mb="0" mt="0">
              {phone}
            </Text>
          </Div>
        </Row>
      </Link>
    </div>
  </Div>
);

StoreListItem.defaultProps = {
  city: '',
  store: '',
  address: '',
  pincode: '',
  state: '',
  phone: '',
  url: ''
};

StoreListItem.propTypes = {
  city: PropTypes.string,
  store: PropTypes.string,
  address: PropTypes.string,
  pincode: PropTypes.string,
  state: PropTypes.string,
  phone: PropTypes.string,
  url: PropTypes.string
};

export default StoreListItem;
