import React, { Component } from 'react';
import ResponsiveModal from 'components/Modal';

class UpdateNotification extends Component {
  state = {
    active: true
  };
  componentDidMount() {
    window.addEventListener('updateFound', this.handleToggle);
  }
  componentWillUnmount() {
    window.removeEventListener('updateFound', this.handleToggle);
  }
  handleToggle = () => {
    this.setState({ active: true });
  };
  render() {
    return (
      <ResponsiveModal open={this.state.active} onCloseModal={() => {}}>
        <p>A new version of this page available.</p>
        <p>Please Reload.</p>
        <p>&nbsp;</p>
        <button label="Reload" onClick={() => window && window.location.reload()} />
      </ResponsiveModal>
    );
  }
}

export default UpdateNotification;
