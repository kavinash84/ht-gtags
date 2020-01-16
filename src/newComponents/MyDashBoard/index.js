import React, { Component } from 'react';
import MyMenu from 'newComponents/MyMenu';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';

class MyDashBoardContainer extends Component {

  render() {
    return (
      <BoxHtV1 type="block" mb="2rem">
        <MyMenu page="address" />
        start
      </BoxHtV1>
    );
  }
}

export default MyDashBoardContainer;
