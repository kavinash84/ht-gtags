import React, { Component } from 'react';
import EmiModalContainer from 'components/EmiModal/EmiModal';
import { Label } from 'hometown-components-dev/lib/Label';

export default class EmiModal extends Component {
  render() {
    return (
      <Label fontSize="0.825em" color="secondary" display="contents">
        <EmiModalContainer {...this.props} />
      </Label>
    );
  }
}
