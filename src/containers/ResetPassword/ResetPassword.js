import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResetPasswordForm from 'hometown-components-dev/lib/FormsHtV1/ResetPasswordFormHtV1';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
// import Div from 'hometown-components-dev/lib/Div';
// import Box from 'hometown-components-dev/lib/BoxHtV1';
import Img from 'hometown-components-dev/lib/Img';
import ImageShimmer from 'hometown-components-dev/lib/ImageShimmer';
import Empty from 'hometown-components-dev/lib/Empty';
import { isBlank } from 'js-utility-functions';
import { validatePassword } from 'utils/validation';
import { resetPassword } from 'redux/modules/forgotpassword';
import { allowNChar } from 'utils/helper';
import MenuFooter from 'containers/MenuFooter';

const PasswordExpiredIcon = require('../../../static/password-expired-icon.png');

@connect(({ forgotpassword }) => ({
  response: forgotpassword
}))
export default class ResetPasswordContainer extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired,
    history: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    params: PropTypes.object
  };

  state = {
    newPwd: '',
    newPwdError: false,
    newPwdErrorMessage: '',
    confirmPwd: '',
    confirmPwdError: false,
    confirmPwdErrorMessage: ''
  };
  componentWillReceiveProps(nextProps) {
    if (window && nextProps.response.passwordUpdated) {
      window.setTimeout(() => nextProps.history.push('/login'), 2000);
    }
  }
  onChangeNewPwd = e => {
    const {
      target: { value }
    } = e;
    const checkError = validatePassword(value);
    if (!allowNChar(value, 15)) {
      return;
    }
    this.setState({
      newPwd: value,
      newPwdError: checkError.error,
      newPwdErrorMessage: checkError ? checkError.errorMessage : ''
    });
  };
  onChangeConfirmPwd = e => {
    const {
      target: { value }
    } = e;
    const checkError = this.matchConfirmPassword(value);
    this.setState({
      confirmPwd: value,
      confirmPwdError: checkError,
      confirmPwdErrorMessage: checkError ? "Confirm Password doesn't match" : ''
    });
  };
  onSubmitUpdatePassword = e => {
    e.preventDefault();
    const {
 confirmPwd, newPwd, newPwdError, confirmPwdError
} = this.state;
    const checkNewPwd = isBlank(newPwd) || newPwdError;
    const checkConfirmPwd = isBlank(confirmPwd) || confirmPwdError;
    if (newPwd !== confirmPwd) {
      return this.setState({
        confirmPwdError: true,
        confirmPwdErrorMessage: "Confirm Password doesn't match"
      });
    }

    if (checkConfirmPwd || checkNewPwd) {
      return this.setState({
        newPwdError: checkNewPwd,
        newPwdErrorMessage: checkNewPwd ? 'Password must contain atleast 6 and max 15 characters' : '',
        confirmPwdError: checkConfirmPwd,
        confirmPwdErrorMessage: checkConfirmPwd ? "Confirm Password doesn't match" : ''
      });
    }
    const { dispatch } = this.context.store;
    const { response } = this.props;
    const { hash } = response.checkHash;

    dispatch(resetPassword(this.state, hash));
  };
  matchConfirmPassword = value => {
    if (value === this.state.newPwd) {
      return false;
    }
    return true;
  };

  render() {
    const styles = require('../Login/index.scss');
    const {
 newPwd, confirmPwd, newPwdError, newPwdErrorMessage, confirmPwdError, confirmPwdErrorMessage
} = this.state;
    const { response } = this.props;
    const {
      checkHash: { is_valid: isValid }
    } = response;
    return (
      <Section p="0" mb="0">
        <MenuFooter pageTitle="Reset Password">
          <div className="wrapper">
            {isValid ? (
              <Container pr="0" pl="0">
                <div p="3rem 0 3rem">
                  <div className={styles.userWrapper}>
                    <Row display="block" mr="0" ml="0">
                      <div col={6}>
                        <div className={styles.imgWrapper}>
                          {/*eslint-disable*/}
                          <ImageShimmer
                            src="https://static.hometown.in/media/cms/hometownnew/compressed/forgotpassword-sidebar-bg.jpg"
                            height="596px"
                          >
                            {imageURL => <Img src={imageURL} alt="" />}
                          </ImageShimmer>
                          {/* eslint-enable */}
                        </div>
                      </div>
                      <div col={6} p="4rem 3.5rem">
                        <div className={`${styles.formBlock} ${styles.resetForm}`}>
                          <Row display="block" mt="1.5rem" mr="0" ml="0">
                            <div col="12" ta="center">
                              <Heading
                                color="#676767"
                                mt="0"
                                mb="0"
                                fontWeight="400"
                                fontSize="2rem"
                                ta="center"
                                fontFamily="light"
                              >
                                Reset Password
                              </Heading>
                            </div>
                          </Row>
                          <Row display="block" mr="0" ml="0">
                            <div mt="0">
                              <ResetPasswordForm
                                newPwd={newPwd}
                                onChangeNewPwd={this.onChangeNewPwd}
                                newPwdFeedBackError={newPwdError}
                                newPwdFeedBackMessage={newPwdErrorMessage}
                                confirmPwd={confirmPwd}
                                onChangeConfirmPwd={this.onChangeConfirmPwd}
                                confirmPwdFeedBackError={confirmPwdError}
                                confirmPwdFeedBackMessage={confirmPwdErrorMessage}
                                onSubmitUpdatePassword={this.onSubmitUpdatePassword}
                                resetResponse={response}
                              />
                            </div>
                          </Row>
                        </div>
                      </div>
                    </Row>
                  </div>
                </div>
              </Container>
            ) : (
              <Section display="flex" p="0.625rem" pt="1.25rem" mb="0">
                <Empty
                  title="Password link is expired !!"
                  subTitle=""
                  btnName="Resend Link"
                  url="/forgot-password"
                  bg="#fafafa"
                >
                  <Img src={PasswordExpiredIcon} width="initial" m="auto" alt="Password link is expired !!" />
                </Empty>
              </Section>
            )}
          </div>
        </MenuFooter>
      </Section>
    );
  }
}
