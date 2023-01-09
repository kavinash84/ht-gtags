import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BASE_IMAGE_URL } from "helpers/Constants";

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

/**
 * Page Components
 */
import Footer from 'components/Footer';
import ForgotPasswordForm from 'components/ForgotPasswordForm';
import GoogleLoginBtn from 'components/LoginForms/GoogleLogin';
import Header from 'components/Header';
import ResponsiveModal from 'components/Modal';

/**
 * helpers / modules
 */
import { LOGIN_URL, SIGNUP_URL } from 'helpers/Constants';
import { validateEmail } from 'js-utility-functions';
import { forgotPassword } from 'redux/modules/forgotpassword';

/**
 * Icons
 */
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
      submitted: false,
      showLoginModal: true
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

  handleForgotPasswordModal = () => {
    const { history } = this.props;
    this.setState({ showLoginModal: !this.state.showLoginModal });
    history.push('/login');
  };

  render() {
    const styles = require('../Login/index.scss');

    const {
 email, emailError, emailErrorMessage, submitted
} = this.state;
    const { response } = this.props;
    const { loaded, error } = response;
    return (
      <Section p="0" mb="0">
        {/* Header */}
        <Header />

        {/* Container */}
        <Container mt={[40, 40, 80]}>
          <Row>
            <Box maxWidth="50%" pl={16} pr={16}>
              {loaded && !error && submitted ? (
                <Box className={`${styles.responseBlock}`}>
                  <Image src={`${BASE_IMAGE_URL}/media/cms/extras-desktop/forgot-password-icon.png`} alt="" />
                  <Row display="block" mr="0" ml="0">
                    <Box mt="0">
                      <Box className={styles.content}>
                        <p>
                          An email has been sent to <br />
                          <b>{email}</b>
                        </p>
                        <p>Please follow the instructions to reset your password</p>
                      </Box>
                    </Box>
                  </Row>
                </Box>
              ) : (
                <Fragment>
                  <ResponsiveModal
                    classNames={{ modal: 'forgotPasswordModal' }}
                    onCloseModal={this.handleForgotPasswordModal}
                    open={this.state.showLoginModal}
                  >
                    <Box pb={30}>
                      <ForgotPasswordForm
                        email={email}
                        onChangeEmail={this.onChangeEmail}
                        emailFeedBackError={emailError}
                        emailFeedBackMessage={emailErrorMessage}
                        onSubmitForgot={this.onSubmitForgot}
                        forgotResponse={response}
                        loginUrl={LOGIN_URL}
                      />
                    </Box>
                  </ResponsiveModal>
                  <Row mx={0}>
                    <Box variant="col-12" textAlign="center" mb={16}>
                      <Label color="textLight" fontSize={15}>
                        Or Continue with
                      </Label>
                    </Box>
                    <Box variant="col-6" ta="center" mb="0" pr="0.625rem">
                      <Button
                        onClick={this.toggleLoginForm}
                        variant="outline.secondary"
                        height={42}
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        width={1}
                        sx={{
                          border: 'divider',
                          borderRadius: 3
                        }}
                      >
                        <Image display="inline-block" src={EmailIcon} alt="OTP Login" va="sub" width={20} mr={10} />{' '}
                        Email
                      </Button>
                    </Box>
                    <Box variant="col-6">
                      <GoogleLoginBtn />
                    </Box>
                  </Row>
                </Fragment>
              )}
            </Box>
            <Box maxWidth="50%" pr={16} pl={40}>
              <Box
                width={1}
                mb={20}
                sx={{
                  borderBottom: 'divider'
                }}
              >
                <Heading color="#1b2125" pb={20}>
                  CREATE AN ACCOUNT
                </Heading>
              </Box>
              <Heading fontSize={16}>If you don't yet have HomeTown account, please register.</Heading>
              <Button px={80} mt={30} height={42} lineHeight={1.7} fontWeight={600} as={Link} to={SIGNUP_URL}>
                Register
              </Button>
            </Box>
          </Row>
        </Container>

        {/* Footer */}
        <Footer />
      </Section>
    );
  }
}

ForgotPasswordContainer.propTypes = {
  history: PropTypes.object.isRequired
};
