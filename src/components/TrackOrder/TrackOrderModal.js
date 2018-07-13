import React, { Component } from 'react';
// import Img from 'hometown-components/lib/Img';
// import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Button from 'hometown-components/lib/Buttons';
// import { Label } from 'hometown-components/lib/Label';
import ResponsiveModal from 'components/Modal';

// const LogoIcon = require('../../../static/logo.png');

export default class TrackOrderModal extends Component {
  state = {
    open: false
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const styles = require('./TrackOrderModal.scss');
    return (
      <div>
        <Button p="0" ml="1.25rem" onClick={this.onOpenModal}>
          TrackOrder
        </Button>
        <ResponsiveModal
          classNames={{ modal: styles.trackOrderModal }}
          onCloseModal={this.onCloseModal}
          open={this.state.open}
        >
          <div className={styles.trackOrderModalWrapper}>
            <Row>test test</Row>
          </div>
        </ResponsiveModal>
      </div>
    );
  }
}
