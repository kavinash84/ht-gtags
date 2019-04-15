import React from 'react';
import { provideHooks } from 'redial';
import MyCasesContainer from 'components/MyCases';
import MenuFooter from 'containers/MenuFooter';
import { loadMyCases } from 'redux/modules/mycases';

const hooks = {
  fetch: async ({ store: { dispatch, getState } }) => {
    const {
      profile: {
        data: { salesforce_product_interest_id: sfid }
      }
    } = getState();
    await dispatch(loadMyCases(sfid));
  }
};
const MyCases = () => (
  <MenuFooter pageTitle="Profile - My Address">
    <MyCasesContainer />
  </MenuFooter>
);

export default provideHooks(hooks)(MyCases);
