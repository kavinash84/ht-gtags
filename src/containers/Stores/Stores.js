import React from 'react';
import Menu from 'containers/MenuNew/index';
import { provideHooks } from 'redial';
import PropTypes from 'prop-types';
import Footer from 'components/Footer';
import StoreDetails from 'components/Stores/StoreDetails';
import { loadStores, isLoaded as isStoresLoaded } from 'redux/modules/stores';

@provideHooks({
  fetch: async ({ store: { dispatch, getState } }) => {
    if (!isStoresLoaded(getState())) {
      await dispatch(loadStores()).catch(error => console.log(error));
    }
  }
})
class Stores extends React.Component {
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
