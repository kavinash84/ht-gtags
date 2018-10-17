import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StoreLocatorContainer from 'components/StoreLocator';
import MenuFooter from 'containers/MenuFooter';

const mapStateToProps = ({ storelocator }) => ({
  storelocator
});

const StoreLocator = ({ storelocator }) => (
  <MenuFooter pageTitle="Store Locator">
    <StoreLocatorContainer {...storelocator} />
  </MenuFooter>
);
StoreLocator.propTypes = {
  storelocator: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(StoreLocator);
