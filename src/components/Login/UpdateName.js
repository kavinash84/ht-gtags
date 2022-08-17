import React from 'react';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import PropTypes from 'prop-types';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Row from 'hometown-components/lib/Row';
import Img from 'hometown-components/lib/Img';
import Div from 'hometown-components/lib/Div';

const LoginModal = props => {
  const {
    firstName,
    firstNameError,
    firstNameErrorMessage,
    lastName,
    lastNameError,
    lastNameErrorMessage,
    session,
    loginViaLogin,
    loggingIn,
    LoaderIcon,
    onChangeLastName,
    onChangeFirstName
  } = props;
  const isValid = () => {
    if (firstNameError) return false;
    if (lastNameError) return false;
    if (!firstName) return false;
    if (!lastName) return false;
    return true;
  };
  return (
    <div>
      <Row display="block" mr="0" ml="0" mb="10px">
        <Div col="12" ta="center">
          <Heading color="color676767" mt="0" mb="0" fontWeight="400" fontSize="26px" ta="center" fontFamily="light">
            {'Update Profile'}
          </Heading>
          <Text color="color676767" ta="center">
            {'Name is required to login'}
          </Text>
        </Div>
      </Row>
      <Div ta="left">
        <Text ta="left" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
          <form
            // onSubmit={onSubmitForm}
            id="custom_form"
            name="custom_form"
            encType="multipart/form-data"
            className="bulk-order-form"
          >
            <FormInput
              label="First Name"
              type="text"
              placeholder=""
              value={firstName}
              onChange={onChangeFirstName}
              feedBackError={firstNameError}
              feedBackMessage={firstNameErrorMessage}
            />

            <FormInput
              label="Last Name"
              type="text"
              value={lastName}
              placeholder=""
              onChange={onChangeLastName}
              feedBackError={lastNameError}
              feedBackMessage={lastNameErrorMessage}
            />
          </form>
          <button
            disabled={!isValid()}
            className="google-login-btn"
            onClick={() => {
              const username = `${firstName} ${lastName}`;
              loginViaLogin({}, session, null, username);
            }}
          >
            {loggingIn ? (
              <span>
                Please Wait
                <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />
              </span>
            ) : (
              'Update'
            )}
          </button>
        </Text>
      </Div>
    </div>
  );
};

LoginModal.defaultProps = {
  firstName: '',
  firstNameErrorMessage: '',
  lastName: '',
  lastNameErrorMessage: '',
  session: ''
};

LoginModal.propTypes = {
  loginViaLogin: PropTypes.func.isRequired,
  LoaderIcon: PropTypes.string.isRequired,
  onChangeLastName: PropTypes.func.isRequired,
  onChangeFirstName: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool.isRequired,
  firstName: PropTypes.string,
  firstNameError: PropTypes.bool.isRequired,
  firstNameErrorMessage: PropTypes.string,
  lastName: PropTypes.string,
  lastNameError: PropTypes.bool.isRequired,
  lastNameErrorMessage: PropTypes.string,
  session: PropTypes.string
};

export default LoginModal;
