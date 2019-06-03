import React from 'react';
import { provideHooks } from 'redial';
import MyOrderContainer from 'components/MyOrder';
import MenuFooter from 'containers/MenuFooter';
import { loadMyOrders } from 'redux/modules/orders';
import { loadUserProfile } from 'redux/modules/profile';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      profile: { loaded }
    } = getState();
    if (!loaded) {
      await dispatch(loadUserProfile());
    }
    const {
      profile: {
        data: { contact_number: contactNumber }
      }
    } = getState();
    await dispatch(loadMyOrders(contactNumber));
  }
};
const MyAddress = () => (
  <MenuFooter pageTitle="Profile - My Orders">
    <MyOrderContainer />
  </MenuFooter>
);

export default provideHooks(hooks)(MyAddress);
