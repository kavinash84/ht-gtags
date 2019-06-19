import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TrackingDetails extends Component {
  render() {
    const stylesModal = require('./index.scss');
    const { data } = this.props;
    return (
      <div className={stylesModal.signupWrapper}>
        {data.map((item, index) => {
          const { image, product_name: name, status } = item;
          return (
            <div key={String(index)}>
              <div>
                <img src={image || ''} alt="" />
              </div>
              <div>{name}</div>
              <div>
                {status.map((statusDetails, i) => {
                  const { status: StatusKey } = statusDetails;
                  return <p key={String(i)}> {StatusKey || 'NA'} </p>;
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
