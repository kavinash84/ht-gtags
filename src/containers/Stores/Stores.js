import React, { Component } from 'react';
import Menu from 'containers/MenuNew/index';
import PropTypes from 'prop-types';
import Footer from 'components/Footer';
import StoreDetails from 'components/Stores/StoreDetails';

class Stores extends Component {
  render() {
    const { city, storeName } = this.props.match.params;
    return (
      <div>
        <Menu />
        <StoreDetails city={city} storeName={storeName} />
        <Footer />
      </div>
    );
  }
}

Stores.propTypes = {
  match: PropTypes.object.isRequired
};

export default Stores;
