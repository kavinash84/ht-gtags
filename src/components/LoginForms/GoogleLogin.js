/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResponsiveModal from 'components/Modal';
import GoogleLoginBtn from 'react-google-login';

/* ====== Validations ====== */
import { validateMobile, validateName } from 'utils/validation';

/* ====== Helpers ====== */
import { allowNChar, allowTypeOf } from 'utils/helper';

/* ====== Modules ====== */
import { googleLogin, clearLoginState, birthdateCheck } from 'redux/modules/login';

/* ====== Components ====== */
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

import UpdateName from './UpdateName';
import UpdateContacts from './UpdateContacts';
import UpdateDob from './UpdateDob';

const LoaderIcon = require('../../../static/refresh-black.svg');

const mapStateToProps = ({ app, userLogin }) => ({
  session: app.sessionId,
  userLogin: app.userLogin,
  skipBirthdateCheck: userLogin.skipBirthdateCheck
});

const onSuccess = (dispatcher, session, phone) => result => {
  dispatcher(result, session, phone);
};

const onError = error => e => {
  console.log('Error occuried');
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
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      phoneError: false,
      phoneErrorMessage: 'Enter Valid 10 Digit Phone Number',
      firstName: '',
      firstNameError: false,
      firstNameErrorMessage: 'Please enter a valid first name',
      lastName: '',
      lastNameError: false,
      lastNameErrorMessage: 'Please enter a valid last name'
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

  onChangeFirstName = e => {
    const {
      target: { value }
    } = e;

    let isInvalid = validateName(value).error;
    isInvalid = !isInvalid ? value.includes('customer') : true;
    // if (isInvalid) {
    return this.setState({
      firstName: value,
      firstNameError: isInvalid
    });
    // }
  };
  onChangeLastName = e => {
    const {
      target: { value }
    } = e;

    let isInvalid = validateName(value).error;
    isInvalid = !isInvalid ? value.includes('customer') : true;
    this.setState({
      lastName: value,
      lastNameError: isInvalid
    });
  };
  onChangeDob = value => {
    const checkError = validateDob(value).error;

    this.setState({
      dob: value,
      dobError: checkError,
      dobErrorMessage: validateDob(value).msg
    });
  };
  birthdateCheck = status => {
    const { dispatch } = this.context.store;
    dispatch(birthdateCheck(status));
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
 loginViaLogin, session, askContact, askName, askBirthDate, loginType, loggingIn, skipBirthdateCheck
} = this.props;
    // const { phone, phoneError, phoneErrorMessage } = this.state;
    // const open = askContact && loginType && loginType === 'google';
    const {
      // eslint-disable-next-line max-len
      phone,
      phoneError,
      phoneErrorMessage,
      firstName,
      firstNameError,
      firstNameErrorMessage,
      lastName,
      lastNameError,
      lastNameErrorMessage,
      dob,
      dobError,
      dobErrorMessage
    } = this.state;
    const open = (askContact || askName) && loginType && loginType === 'google';

    return (
      <Box>
        <Box
          as={GoogleLoginBtn}
          clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
          onSuccess={onSuccess(loginViaLogin, session)}
          onFailure={onError}
          variant="outline.secondary"
          height={42}
          width={1}
          alignItems="center"
          display="flex"
          justifyContent="center"
          color="#7a7d7d"
          fontSize={14}
          fontWeight={500}
          sx={{
            border: 'divider',
            borderRadius: 3,
            cursor: 'pointer'
          }}
        >
          <Image src={GoogleIcon} alt="Google" width={18} mr={10} />
          GOOGLE
        </Box>
        <ResponsiveModal classNames={{ modal: 'updateProfileModal' }} onCloseModal={this.handleModal} open={open}>
          {/* <Row>
            <Box variant="col-12">
              <Heading>Update Profile</Heading>
              <Text>Mobile number is required to login</Text> */}
          {askName && askContact ? (
            <UpdateContacts
              session={session}
              loggingIn={loggingIn}
              LoaderIcon={LoaderIcon}
              firstName={firstName}
              firstNameError={firstNameError}
              firstNameErrorMessage={firstNameErrorMessage}
              lastName={lastName}
              lastNameError={lastNameError}
              lastNameErrorMessage={lastNameErrorMessage}
              phone={phone}
              phoneError={phoneError}
              phoneErrorMessage={phoneErrorMessage}
              onChangeFirstName={this.onChangeFirstName}
              onChangeLastName={this.onChangeLastName}
              onChangePhone={this.onChangePhone}
              loginViaLogin={loginViaLogin}
            />
          ) : askName ? (
            <UpdateName
              session={session}
              loggingIn={loggingIn}
              LoaderIcon={LoaderIcon}
              firstName={firstName}
              firstNameError={firstNameError}
              firstNameErrorMessage={firstNameErrorMessage}
              lastName={lastName}
              lastNameError={lastNameError}
              lastNameErrorMessage={lastNameErrorMessage}
              onChangeFirstName={this.onChangeFirstName}
              onChangeLastName={this.onChangeLastName}
              loginViaLogin={loginViaLogin}
              // onSubmitForm={this.onSubmitForm}
            />
          ) : askBirthDate ? (
            <UpdateDob
              session={session}
              loggingIn={loggingIn}
              dob={dob}
              dobError={dobError}
              dobErrorMessage={dobErrorMessage}
              onChangeDob={this.onChangeDob}
              LoaderIcon={LoaderIcon}
              skipBirthdateCheck={skipBirthdateCheck}
              birthdateCheck={this.birthdateCheck}
              loginViaLogin={loginViaLogin}
            />
          ) : askContact ? (
            <Box>
              <Row>
                <Box variant="col-12">
                  <Heading>{'Update Profile'}</Heading>
                  <Text>{'Mobile number is required to login'}</Text>
                </Box>
              </Row>
              <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
                <form
                  onSubmit={this.onSubmitForm}
                  id="custom_form"
                  name="custom_form"
                  encType="multipart/form-data"
                  className="bulk-order-form"
                >
                  <FormInputHtV1
                    label=""
                    type="text"
                    placeholder=""
                    onChange={this.onChangePhone}
                    value={phone}
                    feedBackError={phoneError}
                    feedBackMessage={phoneErrorMessage}
                  />
                </form>
                {/* <GoogleLoginBtn
                  disabled={this.isValid()}
                  className="google-login-btn"
                  clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
                  onSuccess={onSuccess(loginViaLogin, session, phone)}
                  onFailure={onError}
                > */}
                <button
                  disabled={this.isValid()}
                  className="google-login-btn"
                  onClick={e => {
                    e.preventDefault();
                    loginViaLogin({}, session, phone);
                  }}
                >
                  {loggingIn ? (
                    <span>
                      Please Wait
                      <Image className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
                    </span>
                  ) : (
                    'Update Contact Number'
                  )}
                  {/* </GoogleLoginBtn> */}
                </button>
              </Text>
            </Box>
          ) : //   </Row>
          //   <form
          //     onSubmit={this.onSubmitForm}
          //     id="custom_form"
          //     name="custom_form"
          //     encType="multipart/form-data"
          //     className="bulk-order-form"
          //   >
          //     <FormInputHtV1
          //       label=""
          //       type="text"
          //       placeholder=""
          //       onChange={this.onChangePhone}
          //       value={phone}
          //       feedBackError={phoneError}
          //       feedBackMessage={phoneErrorMessage}
          //     />
          //   </form>
          //   <GoogleLoginBtn
          //     disabled={this.isValid()}
          //     className="google-login-btn"
          //     clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
          //     onSuccess={onSuccess(loginViaLogin, session, phone)}
          //     onFailure={onError}
          //   >
          //     {loggingIn ? (
          //       <span>
          //         Please Wait
          //         <Image className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
          //       </span>
          //     ) : (
          //       'Update Contact Number'
          //     )}
          //   </GoogleLoginBtn>
          // </Text>
          null}
        </ResponsiveModal>
      </Box>
    );
  }
}

GoogleLogin.propTypes = {
  loginViaLogin: PropTypes.func.isRequired,
  clearLogin: PropTypes.func.isRequired,
  session: PropTypes.string.isRequired,
  askContact: PropTypes.bool.isRequired,
  askName: PropTypes.bool.isRequired,
  loginType: PropTypes.string.isRequired,
  loggingIn: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleLogin);
