import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StoreLocatorContainer from 'components/StoreLocator';
import MenuFooter from 'containers/MenuFooter';

const mapStateToProps = ({ storelocator }) => ({
  storelocator
});

const StoreLocator = ({ storelocator }) => (
  <MenuFooter
    pageTitle="Store Locator"
    seoDescription="Visit HomeTown, a Homeware & Furniture store near you.
     Buy Furniture at sale prices at nearby HomeTown store.
      Get best discounts & offers on Home Decor, Home Furnishings,
       Furniture, Kitchenware & Tableware items at HomeTown shop near you!"
    seoKeywords="furniture shop near me, furniture stores near me, online furniture stores,
     furniture near me, furniture stores nearby, furniture shop nearby"
  >
    <StoreLocatorContainer {...storelocator} />
  </MenuFooter>
);
StoreLocator.propTypes = {
  storelocator: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(StoreLocator);
