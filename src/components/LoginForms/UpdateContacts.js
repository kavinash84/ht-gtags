import React from 'react';
// import Heading from 'hometown-components/lib/Heading';
// import Text from 'hometown-components/lib/Text';
import PropTypes from 'prop-types';
// import FormInput from 'hometown-components/lib/Forms/FormInput';
// import Row from 'hometown-components/lib/Row';
// import Img from 'hometown-components/lib/Img';
// import Div from 'hometown-components/lib/Div';
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
// import GoogleLoginBtn from 'react-google-login';

const LoginModal = props => {
  const {
    firstName,
    firstNameError,
    firstNameErrorMessage,
    lastName,
    lastNameError,
    lastNameErrorMessage,
    phone,
    phoneError,
    phoneErrorMessage,
    session,
    loginViaLogin,
    loggingIn,
    onChangeLastName,
    onChangeFirstName,
    onChangePhone
  } = props;
  const isValid = () => {
    console.log('firstName && firstNameError', firstNameError);
    console.log('lastName && lastNameError', lastNameError);
    if (firstNameError) return false;
    if (lastNameError) return false;
    if (phoneError) return false;
    if (!firstName) return false;
    if (!lastName) return false;
    if (!phone) return false;
    return true;
  };

  // const onError = error => e => {
  //   console.log('Error occuried');
  //   console.log(error, e);
  // };

  // const onSuccess = (dispatcher, session, phone) => result => {
  //   dispatcher(result.tokenId, session, phone);
  // };

  return (
    <div>
      <Row>
        <Box variant="col-12">
          <Heading>{'Update Profile'}</Heading>
          <Text>{'Contact information is required to login'}</Text>
        </Box>
      </Row>
      <Text>
        <form
          // onSubmit={onSubmitForm}
          id="custom_form"
          name="custom_form"
          encType="multipart/form-data"
          className="bulk-order-form"
        >
          <FormInputHtV1
            label="First Name"
            type="text"
            placeholder=""
            value={firstName}
            onChange={onChangeFirstName}
            feedBackError={firstNameError}
            feedBackMessage={firstNameErrorMessage}
          />

          <FormInputHtV1
            label="Last Name"
            type="text"
            value={lastName}
            placeholder=""
            onChange={onChangeLastName}
            feedBackError={lastNameError}
            feedBackMessage={lastNameErrorMessage}
          />
          <FormInputHtV1
            label="Mobile"
            type="text"
            placeholder=""
            onChange={onChangePhone}
            value={phone}
            feedBackError={phoneError}
            feedBackMessage={phoneErrorMessage}
          />
        </form>
        {/* <GoogleLoginBtn
          disabled={!isValid()}
          className="google-login-btn"
          clientId="663311547699-jersj1hfflbl8gfukgsuvug8u1gc88nm.apps.googleusercontent.com"
          onSuccess={() => {
            const username = `${firstName} ${lastName}`;
            console.log(!isValid(), session, phone, username);
            loginViaLogin({}, session, phone, username);
          }}
          onFailure={onError}
        > */}
        <button
          disabled={!isValid()}
          className="google-login-btn"
          onClick={() => {
            const username = `${firstName} ${lastName}`;
            console.log(!isValid(), session, phone, username);
            loginViaLogin({}, session, phone, username);
          }}
        >
          {loggingIn ? (
            <span>
              Please Wait
              <Image className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
            </span>
          ) : (
            'Update'
          )}
          {/* </GoogleLoginBtn> */}
        </button>
      </Text>
    </div>
  );
};

LoginModal.defaultProps = {
  firstName: '',
  firstNameErrorMessage: '',
  lastName: '',
  lastNameErrorMessage: '',
  phone: '',
  phoneErrorMessage: '',
  session: ''
};

LoginModal.propTypes = {
  loginViaLogin: PropTypes.func.isRequired,
  onChangeLastName: PropTypes.func.isRequired,
  onChangeFirstName: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  firstNameError: PropTypes.bool.isRequired,
  firstNameErrorMessage: PropTypes.string,
  phone: PropTypes.string,
  phoneError: PropTypes.bool.isRequired,
  phoneErrorMessage: PropTypes.string,
  lastName: PropTypes.string,
  lastNameError: PropTypes.bool.isRequired,
  lastNameErrorMessage: PropTypes.string,
  session: PropTypes.string
};

export default LoginModal;
