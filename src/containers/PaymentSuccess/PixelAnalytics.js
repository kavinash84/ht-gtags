import React from 'react';
import PropTypes from 'prop-types';

function PixelAnalytics({ transactionId, amount }) {
  return (
    <div>
      {/* Offer Conversion: Hometown CPS */}
      <img
        style={{ visibility: 'hidden' }}
        src={`https://logicsd.go2cloud.org/aff_l?offer_id=18&adv_sub=${transactionId}&amount=${amount}`}
        width="1"
        height="1"
        alt="pixel-analytics"
      />
      {/* End Offer Conversion */}
    </div>
  );
}

PixelAnalytics.defaultProps = {
  transactionId: 0,
  amount: 0
};

PixelAnalytics.propTypes = {
  transactionId: PropTypes.number,
  amount: PropTypes.number
};

export default PixelAnalytics;
