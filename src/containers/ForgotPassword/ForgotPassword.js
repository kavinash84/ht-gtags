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
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import ImageShimmerHtV1 from 'hometown-components-dev/lib/ImageShimmerHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import { LOGIN_URL } from 'helpers/Constants';
import { validateEmail } from 'js-utility-functions';
import { forgotPassword } from 'redux/modules/forgotpassword';

const ForgotPasswordImg = require('../../../static/forgot-password-icon.png');

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
              <BoxHtV1 className={styles.userWrapper}>
                <RowHtV1 display="block" mr="0" ml="0">
                  <BoxHtV1 col={6}>
                    <BoxHtV1 className={styles.imgWrapper}>
                      {/*eslint-disable*/}
                      <ImageShimmerHtV1
                        src="https://static.hometown.in/media/cms/hometownnew/compressed/forgotpassword-sidebar-bg.jpg"
                        height="596px"
                      >
                        {imageURL => <ImageHtV1 src={imageURL} alt="" />}
                      </ImageShimmerHtV1>
                      {/* eslint-enable */}
                    </BoxHtV1>
                  </BoxHtV1>
                  <BoxHtV1 col={6} p="1.25rem 3.5rem">
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
                        <RowHtV1 display="block" mt="1.5rem" mr="0" ml="0">
                          <BoxHtV1 col="12" ta="center">
                            <HeadingHtV1
                              color="color676767"
                              mt="0"
                              mb="0"
                              fontWeight="400"
                              fontSize="2rem"
                              ta="center"
                              fontFamily="light"
                            >
                              Forgot password?
                            </HeadingHtV1>
                            <TextHtV1 color="color676767" ta="center" lh="1.6">
                              Enter the e-mail address associated with your account <br />
                              Click submit to have your password e-mailed to you.
                            </TextHtV1>
                          </BoxHtV1>
                        </RowHtV1>
                        <RowHtV1 display="block" mr="0" ml="0">
                          <BoxHtV1 mt="0">
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
                        </RowHtV1>
                      </BoxHtV1>
                    )}
                  </BoxHtV1>
                </RowHtV1>
              </BoxHtV1>
            </BoxHtV1>
          </ContainerHtV1>
        </BoxHtV1>
        {/* <Footer /> */}
      </SectionHtV1>
    );
  }
}
