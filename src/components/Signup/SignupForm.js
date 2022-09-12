import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

/* ====== Modules ====== */
import { signUp } from 'redux/modules/signUp';

/* ====== Helpers ====== */
import { allowNChar, allowTypeOf } from 'utils/helper';
import { LOGIN_URL } from 'helpers/Constants';

/* ====== Validations ====== */
import { validateMobile, validatePassword, validateEmail } from 'utils/validation';

/* ====== Components ====== */
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ColHtV1 from 'hometown-components-dev/lib/ColHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';
import SignupForm from 'hometown-components-dev/lib/Forms/SignupForm';

@connect(({ userSignUp, app }) => ({
  loading: userSignUp.loading,
  session: app.sessionId
}))
@withRouter
export default class SignupFormContainer extends Component {
  static propTypes = {
    session: PropTypes.string.isRequired,
    loading: PropTypes.bool
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    loading: false
  };
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: 'Enter Valid Email Id',
      phone: '',
      phoneError: false,
      phoneErrorMessage: 'Enter 10 Digits Valid Mobile Number',
      password: '',
      passwordError: false,
      passwordErrorMessage: 'Password must contain atleast 6 and max 15 characters'
    };
  }
  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = !validateEmail(value);
    this.setState({
      email: value,
      emailError: checkError
    });
  };
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
        value[0] === '0' ? 'Mobile number must not start with 0' : 'Enter 10 Digits Valid Mobile Number'
    });
  };
  onChangePassword = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePassword(value);
    if (!allowNChar(value, 15)) {
      return;
    }
    this.setState({
      password: value,
      passwordError: checkError.error
    });
  };
  onSubmitSignup = e => {
    e.preventDefault();
    const {
      target: { action }
    } = e;
    const isRedirect = action ? action.indexOf('redirect') !== -1 : false;
    const signupOrigin = isRedirect ? 'Top Nav' : 'Pop-up';
    const { email, password, phone } = this.state;
    const checkEmail = !validateEmail(email);
    const checkPhone = phone ? !validateMobile(phone) : false;
    const checkPassword = validatePassword(password);
    if (checkEmail || checkPassword.error || checkPhone) {
      return this.setState({
        emailError: checkEmail,
        phoneError: checkPhone,
        passwordError: checkPassword.error
      });
    }
    const { dispatch } = this.context.store;
    const { session } = this.props;
    dispatch(signUp(this.state, session, signupOrigin));
  };
  render() {
    const {
      email,
      phone,
      password,
      emailError,
      emailErrorMessage,
      phoneError,
      phoneErrorMessage,
      passwordError,
      passwordErrorMessage
    } = this.state;
    const { loading } = this.props;

    return (
      <BoxHtV1>
        <RowHtV1>
          <ColHtV1 variant="col-12">
            <HeadingHtV1>Be the first!</HeadingHtV1>
            <TextHtV1>to get regular updates on new product launches, exclusive previews and specials offers.</TextHtV1>
          </ColHtV1>
        </RowHtV1>
        <RowHtV1>
          <ColHtV1 variant="col-6">
            <BoxHtV1>
              <ImageShimmer src="https://static.hometown.in/media/cms/hometownnew/compressed/login.jpg" height="514px">
                {imageURL => <ImageHtV1 src={imageURL} alt="" />}
              </ImageShimmer>
            </BoxHtV1>
          </ColHtV1>
          <ColHtV1 variant="col-6">
            <BoxHtV1>
              <RowHtV1>
                <ColHtV1 variant="col-12" ta="center">
                  <HeadingHtV1>
                    Sign up now
                    <br />
                    and get Rs. 500 off*
                  </HeadingHtV1>
                  <TextHtV1>on your first purchase</TextHtV1>
                </ColHtV1>
              </RowHtV1>
              <RowHtV1>
                <ColHtV1>
                  <SignupForm
                    email={email}
                    onChangeEmail={this.onChangeEmail}
                    emailFeedBackError={emailError}
                    emailFeedBackMessage={emailErrorMessage}
                    name={name}
                    onChangeName={this.onChangeName}
                    nameFeedBackError={nameError}
                    nameFeedBackMessage={nameErrorMessage}
                    phone={phone}
                    onChangePhone={this.onChangePhone}
                    phoneFeedBackError={phoneError}
                    phoneFeedBackMessage={phoneErrorMessage}
                    password={password}
                    onChangePassword={this.onChangePassword}
                    passwordFeedBackError={passwordError}
                    passwordFeedBackMessage={passwordErrorMessage}
                    onSubmitSignup={this.onSubmitSignup}
                    signUpResponse={signUpResponse}
                    // loading={loading}
                    loginUrl={LOGIN_URL}
                    date={showDateField(dob, this.onChangeDob)}
                    dobFeedBackMessage={dobErrorMessage}
                    dobFeedBackError={dobError}
                  />
                </ColHtV1>
              </RowHtV1>
            </BoxHtV1>
          </ColHtV1>
        </RowHtV1>
      </BoxHtV1>
    );
  }
}
