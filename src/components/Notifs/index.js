import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

@connect((state, props) => ({ notifs: state.notifs[props.namespace] || [] }))
export default class Notifs extends Component {
  static propTypes = {
    notifs: PropTypes.arrayOf(PropTypes.object).isRequired,
    NotifComponent: PropTypes.func.isRequired
  };

  render() {
    const { notifs, NotifComponent } = this.props;
    return <div>{notifs.map(notif => <NotifComponent key={notif.id} msg={notif.msg} type={notif.type} />)}</div>;
  }
}
