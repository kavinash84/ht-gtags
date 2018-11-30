import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Callus from 'hometown-components/lib/Callus';
import { sendData } from 'redux/modules/services';
import { CALL_BACK as CALL_BACK_API } from 'helpers/apiUrls';
import { allowNChar, allowTypeOf } from 'utils/helper';
import { validateMobile } from 'utils/validation';
import { notifSend } from 'redux/modules/notifs';

@connect(
  ({ services }) => ({
    ...services.callus
  }),
  {
    sendCallUsData: sendData
  }
)
class CallUs extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  state = {
    phone: '',
    phoneError: false,
    phoneErrorMessage: ''
  };
  componentWillReceiveProps(nextProps) {
    if ((nextProps.loaded && !nextProps.error) !== (this.props.loaded && !this.props.error)) {
      const { dispatch } = this.context.store;
      dispatch(notifSend({
        type: 'success',
        msg: "Thank you! We'll Contack You soon.",
        dismissAfter: 2000
      }));
    }
  }
  onSubmitCallUs = e => {
    e.preventDefault();
    const { phone } = this.state;
    if (!validateMobile(phone)) {
      return this.setState({
        phoneError: true,
        phoneErrorMessage: 'Please Enter Valid Mobile NUmber'
      });
    }
    const { sendCallUsData } = this.props;
    sendCallUsData(CALL_BACK_API, { mobile: phone, name: 'HOMETOWN CALLBACK' }, 'callus');
  };
  onChangePhone = e => {
    const { value: phone } = e.target;
    const checkError = !validateMobile(phone);
    if (!allowNChar(phone, 10) || (!allowTypeOf(phone, 'number') && phone.length > 0)) {
      return;
    }
    this.setState({
      phone,
      phoneError: checkError,
      phoneErrorMessage:
        phone[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };

  render() {
    const { phone, phoneError, phoneErrorMessage } = this.state;
    const { loading, loaded, error } = this.props;
    return (
      <Callus
        onSubmitCallUs={this.onSubmitCallUs}
        onChangePhone={this.onChangePhone}
        phone={phone}
        phoneError={phoneError}
        phoneErrorMessage={phoneErrorMessage}
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
