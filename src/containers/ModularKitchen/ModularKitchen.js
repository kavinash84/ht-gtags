import React from 'react';
import ModularKitchenContainer from 'components/StaticPages/ModularKitchen';
import MenuFooter from 'containers/MenuFooter';

export default () => (
  <div className="wrapper">
    <MenuFooter pageTitle="Modular Kitchen">
      <ModularKitchenContainer />
    </MenuFooter>
  </div>
);
