import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UnbxdCompleteTheLook extends Component {
  componentDidMount() {
    this.setUnbxdPid();
  }
  componentDidUpdate(prevProps) {
    console.log('inga daan pa prechane', this.props.configId, prevProps, prevProps.configId);
    if (prevProps.configId !== this.props.configId) {
      console.log('CTL vela sseiyudhu');
      this.setUnbxdPid();
    }
  }
  setUnbxdPid() {
    console.log('setUnbxdPid function triggered');
    const { configId } = this.props;
    console.log('setting pid for UnbxdWidgetsConf');
    window.UnbxdWidgetsConf = {
      pid: configId
    };
    if (window.refreshWidgets) {
      console.log('refreshWidgets function triggered');
      window.refreshWidgets();
    }
  }
  render() {
    return (
      <React.Fragment>
        <div id="unbxd_complete_the_look" />
      </React.Fragment>
    );
  }
}

UnbxdCompleteTheLook.defaultProps = {
  configId: ''
};

UnbxdCompleteTheLook.propTypes = {
  configId: PropTypes.string
};
