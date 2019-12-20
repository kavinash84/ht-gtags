import React from 'react';
import { provideHooks } from 'redial';
import MyAddressContainer from 'newComponents/MyAddress';
import MenuFooter from 'containers/MenuFooter';
import { loadMyAddress } from 'redux/modules/myaddress';

const hooks = {
  fetch: async ({ store: { dispatch } }) => {
    await dispatch(loadMyAddress());
  }
};
const MyAddress = () => (
  <MenuFooter pageTitle="Profile - My Address">
    <MyAddressContainer />
  </MenuFooter>
);

export default provideHooks(hooks)(MyAddress);
