import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Callus from 'hometown-components/lib/Callus';
import { sendData } from 'redux/modules/services';
import { CALL_BACK as CALL_BACK_API } from 'helpers/apiUrls';

@connect(
  ({ services }) => ({
    ...services.callus
  }),
  {
    sendCallUsData: sendData
  }
)
class CallUs extends React.Component {
  state = {
    phone: ''
  };
  onSubmitCallUs = e => {
    e.preventDefault();
    const { phone } = this.state;
    const { sendCallUsData } = this.props;
    sendCallUsData(CALL_BACK_API, { mobile: phone, name: 'HOMETOWN CALLBACK' }, 'callus');
  };
  onChangePhone = e => {
    const { value: phone } = e.target;
    this.setState({ phone });
  };
  render() {
    const { phone } = this.state;
    const { loading, loaded, error } = this.props;
    return (
      <Callus
        onSubmitCallUs={this.onSubmitCallUs}
        onChangePhone={this.onChangePhone}
        phone={phone}
        loading={loading}
        loaded={loaded}
        error={error}
      />
    );
  }
}

CallUs.defaultProps = {
  sendCallUsData: () => {},
  loading: false,
  loaded: false,
  error: false
};
CallUs.propTypes = {
  sendCallUsData: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.bool
};
export default CallUs;
