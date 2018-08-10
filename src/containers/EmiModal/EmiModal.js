import React, { Component } from 'react';
import EmiModalContainer from 'components/EmiModal/EmiModal';

export default class EmiModal extends Component {
  render() {
    return (
      <div>
        <EmiModalContainer {...this.props} />
      </div>
    );
  }
}
