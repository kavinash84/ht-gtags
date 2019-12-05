import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpdatePasswordForm from 'hometown-components-dev/lib/Forms/UpdatePasswordForm';
import Section from 'hometown-components-dev/lib/Section';
import Row from 'hometown-components-dev/lib/Row';
import Heading from 'hometown-components-dev/lib/Heading';
import Div from 'hometown-components-dev/lib/Div';
import { isBlank } from 'js-utility-functions';
import { validatePassword } from 'utils/validation';
import { updateUserPassword } from 'redux/modules/updatepassword';
import { allowNChar } from 'utils/helper';

@connect(({ updatepassword }) => ({
  response: updatepassword
}))
export default class UpdatePasswordFormContainer extends Component {
  static propTypes = {
    response: PropTypes.object
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static defaultProps = {
    response: {}
  };
  state = {
    oldPwd: '',
    oldPwdError: false,
    oldPwdErrorMessage: '',
    newPwd: '',
    newPwdError: false,
    newPwdErrorMessage: '',
    confirmPwd: '',
    confirmPwdError: false,
    confirmPwdErrorMessage: ''
  };
  onChangeOldPwd = e => {
    const {
      target: { value }
    } = e;
    const checkError = isBlank(value);
    this.setState({
      oldPwd: value,
      oldPwdError: checkError.error,
      oldPwdErrorMessage: checkError ? "Old Password can't be blank" : ''
    });
  };
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
    const checkError = value !== this.state.newPwd;
    if (!allowNChar(value, 15)) {
      return;
    }
    this.setState({
      confirmPwd: value,
      confirmPwdError: checkError,
      confirmPwdErrorMessage: checkError ? "Confirm Password doesn't match" : ''
    });
  };
  onSubmitUpdatePassword = e => {
    e.preventDefault();
    const {
      oldPwd, confirmPwd, newPwd, oldPwdError, newPwdError, confirmPwdError
    } = this.state;
    const checkOldPwd = isBlank(oldPwd) || oldPwdError;
    const checkNewPwd = isBlank(newPwd) || newPwdError;
    const checkConfirmPwd = isBlank(confirmPwd) || confirmPwdError;
    if (newPwd !== confirmPwd) {
      return this.setState({
        confirmPwdError: true,
        confirmPwdErrorMessage: "Confirm Password doesn't match"
      });
    }

    if (checkOldPwd || checkConfirmPwd || checkNewPwd) {
      return this.setState({
        oldPwdError: checkOldPwd,
        oldPwdErrorMessage: checkOldPwd ? "Old Password can't be blank" : '',
        newPwdError: checkNewPwd,
        newPwdErrorMessage: checkNewPwd ? 'Password should be minimum 6 and maximum 15 characters' : '',
        confirmPwdError: checkConfirmPwd,
        confirmPwdErrorMessage: checkConfirmPwd ? "Confirm Password doesn't match" : ''
      });
    }
    const { dispatch } = this.context.store;
    dispatch(updateUserPassword(this.state));
    this.setState({
      newPwd: '',
      oldPwd: '',
      confirmPwd: ''
    });
  };

  render() {
    const styles = require('./index.scss');

    const {
      oldPwd,
      newPwd,
      confirmPwd,
      oldPwdError,
      oldPwdErrorMessage,
      newPwdError,
      newPwdErrorMessage,
      confirmPwdError,
      confirmPwdErrorMessage
    } = this.state;
    const { response } = this.props;
    return (
      <div className={styles.formContainer}>
        <Section mb="0.3125rem" pr="0.5rem" pl="0.5rem">
          <Row display="block" mr="0" ml="0">
            <Heading fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="light">
              Update Password
            </Heading>
          </Row>
        </Section>
        <div className={styles.formWrapper}>
          <Section p="0.5rem" mb="0">
            <Row display="block" mr="0" ml="0">
              <Div>
                <UpdatePasswordForm
                  oldPwd={oldPwd}
                  onChangeOldPwd={this.onChangeOldPwd}
                  oldPwdFeedBackError={oldPwdError}
                  oldPwdFeedBackMessage={oldPwdErrorMessage}
                  newPwd={newPwd}
                  onChangeNewPwd={this.onChangeNewPwd}
                  newPwdFeedBackError={newPwdError}
                  newPwdFeedBackMessage={newPwdErrorMessage}
                  confirmPwd={confirmPwd}
                  onChangeConfirmPwd={this.onChangeConfirmPwd}
                  confirmPwdFeedBackError={confirmPwdError}
                  confirmPwdFeedBackMessage={confirmPwdErrorMessage}
                  onSubmitUpdatePassword={this.onSubmitUpdatePassword}
                  response={response}
                />
              </Div>
            </Row>
          </Section>
        </div>
      </div>
    );
  }
}
