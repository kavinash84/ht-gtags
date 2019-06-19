import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TrackingDetails extends Component {
  render() {
    const stylesModal = require('./index.scss');
    const { data } = this.props;
    return (
      <div className={stylesModal.signupWrapper}>
        {data.map(item => {
          const { image, product_name: name, status } = item;
          return (
            <div>
              <div>
                <img src={image || ''} alt="" />
              </div>
              <div>{name}</div>
              <div>
                {status.map(statusDetails => {
                  const { status: StatusKey } = statusDetails;
                  return <p> {StatusKey || 'NA'} </p>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

TrackingDetails.propTypes = {
  data: PropTypes.array.isRequired
};
export default TrackingDetails;
