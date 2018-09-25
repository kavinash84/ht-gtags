import React from 'react';
import { provideHooks } from 'redial';
import MyOrderContainer from 'components/MyOrder';
import MenuFooter from 'containers/MenuFooter';
import { loadMyOrders } from 'redux/modules/orders';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadMyOrders());
  }
};
const MyAddress = () => (
  <MenuFooter>
    <MyOrderContainer />
  </MenuFooter>
);

export default provideHooks(hooks)(MyAddress);
