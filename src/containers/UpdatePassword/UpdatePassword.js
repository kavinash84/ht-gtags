import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UpdatePasswordForm from 'hometown-components-dev/lib/FormsHtV1/UpdatePasswordFormHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
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
      <BoxHtV1 className={styles.formContainer}>
        <SectionHtV1 mb="0.3125rem" pr="0.5rem" pl="0.5rem">
          <RowHtV1 display="block" mr="0" ml="0">
            <HeadingHtV1 fontSize="1.25rem" color="textDark" mb="0px" mt="0px" fontFamily="light">
              Update Password
            </HeadingHtV1>
          </RowHtV1>
        </SectionHtV1>
        <BoxHtV1 className={styles.formWrapper}>
          <SectionHtV1 p="0.5rem" mb="0">
            <RowHtV1 display="block" mr="0" ml="0">
              <BoxHtV1>
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
              </BoxHtV1>
            </RowHtV1>
          </SectionHtV1>
        </BoxHtV1>
      </BoxHtV1>
    );
  }
}
