import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TrackingDetails extends Component {
  // renderDetails = () => {
  //   const { data } = this.props;
  //   data.map(itemObject => {
  //     const { status = [] } = itemObject;
  //     const lines = status.map(({ text }) => <p>{text}</p>);
  //     return lines;
  //   });
  // }
  render() {
    const stylesModal = require('./index.scss');
    console.log(this.props.data);
    return (
      <div className={stylesModal.signupWrapper}>
        <p>ksjdfsdhfkjsdhf</p>
        <p>sdfsdfdsfds</p>
        <p>sdfsdfdsfsd</p>
      </div>
    );
  }
}

TrackingDetails.propTypes = {
  data: PropTypes.array.isRequired
};
export default TrackingDetails;
