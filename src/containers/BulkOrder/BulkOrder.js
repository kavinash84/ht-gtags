import React from 'react';
import Helmet from 'react-helmet';
import BulkOrderContainer from 'components/BulkOrder';
import MenuFooter from 'containers/MenuFooter';

export default () => (
  <MenuFooter>
    <Helmet title="Bulk Order" />
    <BulkOrderContainer />
  </MenuFooter>
);
