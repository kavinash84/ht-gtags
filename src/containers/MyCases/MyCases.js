import React from 'react';
import { provideHooks } from 'redial';
import MyCasesContainer from 'newComponents/MyCases';
import MenuFooter from 'containers/MenuFooter';
import { loadMyCases } from 'redux/modules/mycases';
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
        data: { salesforce_account_id: sfid, contact_number: cn }
      }
    } = getState();
    await dispatch(loadMyCases(sfid, '', '', '', cn));
  }
};
const MyCases = () => (
  <MenuFooter pageTitle="Profile - My Address">
    <MyCasesContainer />
  </MenuFooter>
);

export default provideHooks(hooks)(MyCases);
