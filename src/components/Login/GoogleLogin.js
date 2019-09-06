import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';
import Text from 'hometown-components/lib/Text';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import ResponsiveModal from 'components/Modal';
import { validateMobile } from 'utils/validation';
import { allowNChar, allowTypeOf } from 'utils/helper';
import GoogleLoginBtn from 'react-google-login';
import { googleLogin, clearLoginState } from 'redux/modules/login';

const LoaderIcon = require('../../../static/refresh-black.svg');

const mapStateToProps = ({ app }) => ({
  session: app.sessionId
});

const onSuccess = (dispatcher, session, phone) => result => {
  dispatcher(result.tokenId, session, phone);
};

const onError = error => e => {
  console.log(error, e);
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginViaLogin: googleLogin,
      clearLogin: clearLoginState
    },
    dispatch
  );

const GoogleIcon = require('../../../static/google.svg');

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      phoneError: false,
      phoneErrorMessage: 'Enter Valid 10 Digit Phone Number'
    };
  }
  onChangePhone = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateMobile(value);
    if (!allowNChar(value, 10) || (!allowTypeOf(value, 'number') && value.length > 0)) {
      return;
    }
    this.setState({
      phone: value,
      phoneError: checkError,
      phoneErrorMessage:
        value[0] === '0' ? 'Mobile Number Must Not Start With 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  handleModal = () => {
    this.props.clearLogin();
  };
  isValid = () => {
    const value = this.state.phone;
    const valid = !validateMobile(value);
    return valid;
  };
  render() {
    const {
      loginViaLogin, session, askContact, loginType, loading
    } = this.props;
    const { phone, phoneError, phoneErrorMessage } = this.state;
    const open = askContact && loginType && loginType === 'google';
    return (
      <div>
        <GoogleLoginBtn
          className="socialBtn"
          clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
          onSuccess={onSuccess(loginViaLogin, session)}
          onFailure={onError}
        >
          <Img display="inline-block" src={GoogleIcon} alt="Google" va="sub" width="18px" mr="10px" /> GOOGLE
        </GoogleLoginBtn>
        <ResponsiveModal classNames={{ modal: 'updateProfileModal' }} onCloseModal={this.handleModal} open={open}>
          <Row display="block" mr="0" ml="0" mb="10px">
            <Div col="12" ta="center">
              <Heading
                color="color676767"
                mt="0"
                mb="0"
                fontWeight="400"
                fontSize="26px"
                ta="center"
                fontFamily="light"
              >
                {'Update Profile'}
              </Heading>
              <Text color="color676767" ta="center">
                {'Mobile number is required to login'}
              </Text>
            </Div>
          </Row>
          <Div ta="center">
            <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
              <form
                onSubmit={this.onSubmitForm}
                id="custom_form"
                name="custom_form"
                encType="multipart/form-data"
                className="bulk-order-form"
              >
                <FormInput
                  label=""
                  type="text"
                  placeholder=""
                  onChange={this.onChangePhone}
                  value={phone}
                  feedBackError={phoneError}
                  feedBackMessage={phoneErrorMessage}
                />
              </form>
              <GoogleLoginBtn
                disabled={this.isValid()}
                className="google-login-btn"
                clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
                onSuccess={onSuccess(loginViaLogin, session, phone)}
                onFailure={onError}
              >
                {loading ? (
                  <span>
                    Please Wait
                    <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                  </span>
                ) : (
                  'Update Contact Number'
                )}
              </GoogleLoginBtn>
            </Text>
          </Div>
        </ResponsiveModal>
      </div>
    );
  }
}

GoogleLogin.propTypes = {
  loginViaLogin: PropTypes.func.isRequired,
  clearLogin: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
  askContact: PropTypes.bool.isRequired,
  loginType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleLogin);
