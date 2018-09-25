import React from 'react';
import ModularKitchenContainer from 'components/StaticPages/ModularKitchen';
import MenuFooter from 'containers/MenuFooter';

export default () => (
  <div className="wrapper">
    <MenuFooter>
      <ModularKitchenContainer />
    </MenuFooter>
  </div>
);
