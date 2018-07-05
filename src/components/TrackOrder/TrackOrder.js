import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const mapStateToProps = ({ trackorder }) => ({
  ...trackorder
});

const TrackOrder = ({
  status, handleSubmit, handleChange, loading, data, error, errorMessage
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} required />
      <button type="submit">SUBMIT</button>
    </form>
    {status && (
      <div>
        {loading && !error && <div>Loading...</div>}
        {!error && !loading && <div> {JSON.stringify(data)}</div>}
        {error && !loading && <div>{JSON.stringify(errorMessage)}</div>}
      </div>
    )}
  </div>
);

TrackOrder.propTypes = {
  status: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired
};
export default connect(
  mapStateToProps,
  null
)(TrackOrder);
