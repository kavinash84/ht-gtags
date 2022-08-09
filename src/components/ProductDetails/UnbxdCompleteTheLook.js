import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UnbxdCompleteTheLook extends Component {
  componentDidMount() {
    this.setUnbxdPid();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.configId !== this.props.configId) {
      this.setUnbxdPid();
    }
  }
  setUnbxdPid() {
    const { configId } = this.props;
    window.UnbxdWidgetsConf = {
      pid: configId
    };
    if (window.refreshWidgets) {
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
