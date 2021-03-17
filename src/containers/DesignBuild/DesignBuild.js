import React from 'react';
import DesignBuildContainer from 'components/StaticPages/DesignBuild';
import MenuFooter from 'containers/MenuFooter';

export default () => (
  <div className="wrapper">
    <MenuFooter pageTitle="Design & Build">
      <DesignBuildContainer />
    </MenuFooter>
  </div>
);
