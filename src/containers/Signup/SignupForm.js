import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import SignupForm from 'hometown-components/lib/Forms/SignupForm';
import Text from 'hometown-components/lib/Text';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Div from 'hometown-components/lib/Div';
import Theme from 'hometown-components/lib/Theme';
import Img from 'hometown-components/lib/Img';
import ImageShimmer from 'hometown-components/lib/ImageShimmer';
import { validateMobile, validatePassword, validateEmail, isEmpty, checkSpecialChar } from 'utils/validation';
import { LOGIN_URL } from 'helpers/Constants';
import { signUp } from 'redux/modules/signUp';
import { allowNChar, allowTypeOf } from 'utils/helper';

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
      name: '',
      nameError: false,
      nameErrorMessage: 'Special Characters Not Allowed !',
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
  onChangeName = e => {
    const {
      target: { value }
    } = e;
    const checkError = isEmpty(value) || checkSpecialChar(value);
    this.setState({
      name: value,
      nameError: checkError
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
    const {
      name, email, password, phone
    } = this.state;
    const checkName = isEmpty(name) || checkSpecialChar(name);
    const checkEmail = !validateEmail(email);
    const checkPhone = phone ? !validateMobile(phone) : false;
    const checkPassword = validatePassword(password);
    if (checkName || checkEmail || checkPassword.error || checkPhone) {
      return this.setState({
        nameError: checkName,
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
    const styles = require('./index.scss');

    const {
      name,
      nameError,
      nameErrorMessage,
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
      <div className={styles.signupWrapper}>
        <Row display="block" mr="0" ml="0">
          <Div col={12} bg={Theme.colors.colora39994} pt="0.625rem" pb="0.625rem">
            <Heading
              color="white"
              mt="0"
              mb="0"
              fontWeight="400"
              fontSize="2.75rem"
              ta="center"
              fontFamily="light"
              lh="1"
            >
              Be the first!
            </Heading>
            <Text color="white" ta="center" mb="0" mt="0" fontSize="1rem">
              to get regular updates on new product launches, exclusive previews and specials offers.
            </Text>
          </Div>
        </Row>
        <Row display="block" mr="0" ml="0">
          <Div col={6}>
            <div className={styles.imgWrapper}>
              <ImageShimmer src="https://static.hometown.in/media/cms/hometownnew/compressed/login.jpg" height="514px">
                {imageURL => <Img src={imageURL} alt="" />}
              </ImageShimmer>
            </div>
          </Div>
          <Div col={6} p="1.25rem 3.5rem">
            <div className={styles.formBlock}>
              <Row display="block" mt="0" mr="0" ml="0">
                <Div col="12" ta="center">
                  <Heading color="#000" mt="0" mb="0" fontWeight="400" fontSize="2rem" ta="center" fontFamily="light">
                    Sign up now
                    <br />
                    and get Rs. 500 off*
                  </Heading>
                  <Text color="#676767" ta="center" fontSize="1rem" mt="0">
                    on your first purchase
                  </Text>
                </Div>
              </Row>
              <Row display="block" mr="0" ml="0">
                <Div mt="0">
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
                    loading={loading}
                    loginUrl={LOGIN_URL}
                  />
                </Div>
              </Row>
            </div>
          </Div>
        </Row>
      </div>
    );
  }
}
