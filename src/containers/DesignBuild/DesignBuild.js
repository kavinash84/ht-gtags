import React from 'react';
import Helmet from 'react-helmet';
import DesignBuildContainer from 'components/StaticPages/DesignBuild';
import MenuFooter from 'containers/MenuFooter';

export default () => (
  <div className="wrapper">
    <Helmet title="Design & Build" />
    <MenuFooter>
      <DesignBuildContainer />
    </MenuFooter>
  </div>
);
