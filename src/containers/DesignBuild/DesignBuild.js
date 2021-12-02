import React from 'react';
// import MenuFooter from 'containers/MenuFooter';
import DesignBuildContainer from '../../components/DesignBuild';
import Footer from '../../components/Footer';

export default () => (
  <div className="wrapper">
      {/* <MenuFooter pageTitle="Design & Build"> */}
    <DesignBuildContainer />
    <Footer />
    {/* </MenuFooter> */}
  </div>
);
