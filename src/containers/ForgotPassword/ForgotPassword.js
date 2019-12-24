import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Header from 'newComponents/Header';

// import Footer from 'components/Footer';
import ForgotPasswordFormHtV1 from 'hometown-components-dev/lib/FormsHtV1/ForgotPasswordFormHtV1';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
// import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import { LOGIN_URL } from 'helpers/Constants';
import { validateEmail } from 'js-utility-functions';
import { forgotPassword } from 'redux/modules/forgotpassword';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';

import GoogleLoginBtn from 'newComponents/LoginForms/GoogleLogin';

const ForgotPasswordImg = require('../../../static/forgot-password-icon.png');
// const OTPIcon = require('../../../static/otp.svg');
const EmailIcon = require('../../../static/email-primary.svg');

@connect(({ forgotpassword }) => ({
  response: forgotpassword
}))
@withRouter
export default class ForgotPasswordContainer extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: '',
      submitted: false
    };
  }

  onChangeEmail = e => {
    const {
      target: { value }
    } = e;
    const checkError = validateEmail(value, 'Enter valid email');
    this.setState({
      email: value,
      emailError: checkError.error,
      emailErrorMessage: checkError.error ? checkError.errorMessage : ''
    });
  };

  onSubmitForgot = e => {
    e.preventDefault();
    const { email } = this.state;
    const checkEmail = validateEmail(email, 'Invalid Email');
    if (checkEmail.error) {
      return this.setState({
        emailError: checkEmail.error,
        emailErrorMessage: checkEmail.errorMessage
      });
    }
    this.setState({ submitted: true });
    const { dispatch } = this.context.store;
    dispatch(forgotPassword(email));
  };
  render() {
    const styles = require('../Login/index.scss');

    const {
 email, emailError, emailErrorMessage, submitted
} = this.state;
    const { response } = this.props;
    const { loaded, error } = response;
    return (
      <SectionHtV1 p="0" mb="0">
        <Header />
        <BoxHtV1>
          <ContainerHtV1 pr="0" pl="0">
            <BoxHtV1 p="3rem 0 3rem">
              <RowHtV1 display="block" mr="0" ml="0">
                <BoxHtV1 variant="col-4" p="0rem 3.5rem">
                  {loaded && !error && submitted ? (
                    <BoxHtV1 className={`${styles.responseBlock}`}>
                      <ImageHtV1 src={ForgotPasswordImg} alt="" />
                      <RowHtV1 display="block" mr="0" ml="0">
                        <BoxHtV1 mt="0">
                          <BoxHtV1 className={styles.content}>
                            <p>
                              An email has been sent to <br />
                              <b>{email}</b>
                            </p>
                            <p>Please follow the instructions to reset your password</p>
                          </BoxHtV1>
                        </BoxHtV1>
                      </RowHtV1>
                    </BoxHtV1>
                  ) : (
                    <BoxHtV1 className={`${styles.formBlock} ${styles.forgotForm}`}>
                      <RowHtV1 display="block" mr="0" ml="0">
                        <BoxHtV1 variant="col-12" ta="center" px="0">
                          <HeadingHtV1
                            color="#1b2125"
                            mt="0"
                            mb="0"
                            fontWeight="700"
                            fontSize="23px"
                            ta="center"
                            fontFamily="HelveticaNeue"
                          >
                            SIGN IN
                          </HeadingHtV1>
                        </BoxHtV1>
                        <BoxHtV1 variant="col-12" ta="center" px="0">
                          <hr
                            sx={{
                              color: '#000000',
                              backgroundColor: '#000000',
                              height: 0.5,
                              borderColor: '#000000',
                              mx: '0',
                              width: '100%'
                            }}
                          />
                        </BoxHtV1>
                        <BoxHtV1 variant="col-12" ta="center" px="0">
                          <TextHtV1 color="textPrimary" ta="center" fontSize="10px">
                            *Required
                          </TextHtV1>
                        </BoxHtV1>
                      </RowHtV1>
                      <RowHtV1 display="block" mr="0" ml="0" mt="1em">
                        <BoxHtV1 variant="col-12" mt="0">
                          <ForgotPasswordFormHtV1
                            email={email}
                            onChangeEmail={this.onChangeEmail}
                            emailFeedBackError={emailError}
                            emailFeedBackMessage={emailErrorMessage}
                            onSubmitForgot={this.onSubmitForgot}
                            forgotResponse={response}
                            loginUrl={LOGIN_URL}
                          />
                        </BoxHtV1>
                        <BoxHtV1 variant="col-12" ta="center" pt="1em" mb="0.625rem" textAlign="center">
                          <LabelHtV1 fontFamily="regular" ta="center" color="color79716c" fontSize="12px" va="middle">
                            Or continue with
                          </LabelHtV1>
                        </BoxHtV1>
                        <BoxHtV1 variant="col-6" ta="center" mb="0" pr="0.625rem">
                          <ButtonHtV1
                            btnType="custom"
                            fontFamily="regular"
                            ta="center"
                            color="black"
                            mr="0.3125rem"
                            p=".375rem .75rem"
                            fontSize="0.825rem"
                            va="middle"
                            size="block"
                            height="42px"
                            width="100%"
                            bg="#FFF"
                            font="400 0.825rem system-ui"
                            onClick={this.toggleLoginForm}
                            sx={{
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#e6e6e6'
                            }}
                          >
                            {/* {!this.state.loginviaotp ? (
                              <ImageHtV1
                                display="inline-block"
                                src={OTPIcon}
                                alt="OTP Login"
                                va="sub"
                                width="18px"
                                mr="0.625rem"
                              />
                            ) : (
                              <ImageHtV1
                                display="inline-block"
                                src={EmailIcon}
                                alt="OTP Login"
                                va="sub"
                                width="18px"
                                mr="0.625rem"
                              />
                            )}
                            {!this.state.loginviaotp ? 'OTP Login' : 'Email'} */}
                            <ImageHtV1
                              display="inline-block"
                              src={EmailIcon}
                              alt="OTP Login"
                              va="sub"
                              width="18px"
                              mr="0.625rem"
                            />{' '}
                            Email
                          </ButtonHtV1>
                        </BoxHtV1>
                        <BoxHtV1 variant="col-6" ta="center" mb="0" pl="0.625rem">
                          <GoogleLoginBtn />
                        </BoxHtV1>
                      </RowHtV1>
                    </BoxHtV1>
                  )}
                </BoxHtV1>
                <BoxHtV1 variant="col-8">
                  <BoxHtV1 variant="col-12" ta="center" px="0">
                    <HeadingHtV1
                      color="#1b2125"
                      mt="0"
                      mb="0"
                      fontWeight="700"
                      fontSize="23px"
                      ta="center"
                      fontFamily="HelveticaNeue"
                    >
                      CREATE AN ACCOUNT
                    </HeadingHtV1>
                  </BoxHtV1>
                  <BoxHtV1 variant="col-12" ta="center" px="0">
                    <hr
                      sx={{
                        color: '#000000',
                        backgroundColor: '#000000',
                        height: 0.5,
                        borderColor: '#000000',
                        mx: '0',
                        width: '100%'
                      }}
                    />
                  </BoxHtV1>
                  <BoxHtV1 variant="col-12" ta="center" px="0">
                    <TextHtV1 color="textPrimary" ta="center" mt="1em" fontSize="12px" fontWeight="600">
                      If you don't yet have HomeTown account, please register.
                    </TextHtV1>
                  </BoxHtV1>
                  <ButtonHtV1 px="2.5em" mt="2em">
                    Register
                  </ButtonHtV1>
                </BoxHtV1>
              </RowHtV1>
            </BoxHtV1>
          </ContainerHtV1>
        </BoxHtV1>
        {/* <Footer /> */}
      </SectionHtV1>
    );
  }
}
