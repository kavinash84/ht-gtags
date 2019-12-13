import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Row from 'hometown-components-dev/lib/Row';
import Div from 'hometown-components-dev/lib/Div';
import Text from 'hometown-components-dev/lib/Text';
import Heading from 'hometown-components-dev/lib/Heading';
// import Img from 'hometown-components-dev/lib/Img';

const styles = require('./Stores.scss');

const StoreListItem = ({
 city, store, address, pincode, state, phone, url, visitHandler
}) => (
  <Div col={4}>
    <div //eslint-disable-line
      onClick={e => {
        e.preventDefault();
        visitHandler({
          city,
          store,
          event: 'event storelocator-hmpg',
          category: 'Storelocator- HMPG'
        });
      }}
      className={styles.storeBlock}
    >
      <Link to={url}>
        {/* <Img src="https://static.hometown.in/media/cms/hometownv2/compressed/New-Delhi.jpg" alt="" /> */}
        <Row type="block" m="0">
          <Div>
            <Heading color="textDark" fontSize="1em" mt="0" pb="2px" mb="5px">
              {store}
            </Heading>
            <Text color="rgba(0,0,0,0.5)" fontSize="0.875em" mb="0.125rem" mt="0">
              {address}
            </Text>
            <Text color="rgba(0,0,0,0.5)" fontSize="0.875em" mb="0.125rem" mt="0">
              {city}, {state}, {pincode}
            </Text>
            <Text color="rgba(0,0,0,0.5)" fontSize="0.875em" mb="0" mt="0">
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
  url: PropTypes.string,
  visitHandler: PropTypes.func.isRequired
};

export default StoreListItem;
