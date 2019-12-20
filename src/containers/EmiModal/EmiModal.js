import React, { Component } from 'react';
import EmiModalContainer from 'newComponents/EmiModal/EmiModal';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';

export default class EmiModal extends Component {
  render() {
    return (
      <LabelHtV1 fontSize="0.825em" color="secondary" display="contents">
        <EmiModalContainer {...this.props} />
      </LabelHtV1>
    );
  }
}
