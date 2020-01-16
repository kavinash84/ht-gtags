import React from 'react';
import MyDashBoardContainer from 'newComponents/MyDashBoard';
import MenuFooter from 'containers/MenuFooter';

const MyDashBoard = () => (
  <MenuFooter pageTitle="Profile - My Dashboard">
    <MyDashBoardContainer />
  </MenuFooter>
);

export default MyDashBoard;
