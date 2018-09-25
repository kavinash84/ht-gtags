import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuFooter from 'containers/MenuFooter';
import StoreDetails from 'components/Stores/StoreDetails';

class Stores extends Component {
  render() {
    const { city, storeName } = this.props.match.params;
    return (
      <MenuFooter>
        <StoreDetails city={city} storeName={storeName} />
      </MenuFooter>
    );
  }
}

Stores.propTypes = {
  match: PropTypes.object.isRequired
};

export default Stores;
