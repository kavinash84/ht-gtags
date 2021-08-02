import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';

// Components
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import FormInput from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import ResponsiveModal from 'components/Modal';
import Img from 'hometown-components-dev/lib/ImageHtV1';
import Div from 'hometown-components-dev/lib/BoxHtV1';
// import Button from 'hometown-components/lib/Buttons';
import { FeedBackMessage } from 'hometown-components-dev/lib/LabelHtV1';

// Css
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const formatDate = date => {
  console.log({ date }, 'inside formate date');
  if (date) {
    return moment(date, 'YYYY-MM-DD').toDate();
  }
};

const Title = ({ askName, askContact, askBirthDate }) => {
  let text = '';
  if (askName && askContact) text = 'Please update your contact number and name!';
  else if (askName) text = 'Please update your name !';
  else if (askContact) text = 'Please update your contact number';
  else if (askBirthDate) text = 'Your wallet is not created. Would you like to create a wallet?';

  return (
    <Text color="color676767" ta="center">
      {text}
    </Text>
  );
};

const AskName = ({
  onChangeName, name, nameError, nameErrorMessage
}) => (
  <FormInput
    label=""
    type="text"
    placeholder="Enter your name"
    onChange={onChangeName}
    value={name}
    feedBackError={nameError}
    feedBackMessage={nameErrorMessage}
  />
);

const AskContact = ({
  onChangePhone, phone, phoneError, phoneErrorMessage
}) => (
  <FormInput
    label=""
    type="text"
    placeholder="Enter your contact number!"
    onChange={onChangePhone}
    value={phone}
    feedBackError={phoneError}
    feedBackMessage={phoneErrorMessage}
  />
);

class AskBirthDate extends Component {
  state = {
    showDobInput: false
  };
  render() {
    const { showDobInput } = this.state;
    const {
      skipBirthdateCheck,
      birthdateCheck,
      onChangeDob,
      dob,
      dobError,
      dobErrorMessage,
      isValidField,
      onSubmitLogin,
      LoaderIcon,
      loggingIn
    } = this.props;

    if (showDobInput) {
      return (
        <Div>
          <Div mb="0.625rem">
            <DatePicker
              placeholderText="Enter your date of birth!"
              dateFormat="dd/MM/yyyy"
              selected={formatDate(dob)}
              onSelect={onChangeDob}
            />

            {dobError && <FeedBackMessage type="error">{dobErrorMessage}</FeedBackMessage>}
          </Div>
          <button
            style={isValidField ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
            disabled={isValidField}
            className="google-login-btn"
            onClick={e => onSubmitLogin(e)}
          >
            {loggingIn && <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />}
            {loggingIn ? 'Please Wait' : 'Update'}
          </button>
        </Div>
      );
    }
    return (
      <Div style={{ display: 'flex' }}>
        <button
          style={{ margin: '0 10px' }}
          className="google-login-btn"
          onClick={() => this.setState({ showDobInput: true })}
        >
          Yes
        </button>
        <button
          style={{ margin: '0 10px' }}
          className="google-login-btn"
          onClick={e => {
            onSubmitLogin(e, true);
            birthdateCheck(true);
          }}
        >
          No
        </button>
      </Div>
    );
  }
}

function UpdateProfile({
  askName,
  askContact,
  askBirthDate,
  skipBirthdateCheck,
  open,
  name,
  nameError,
  nameErrorMessage,
  phone,
  phoneError,
  phoneErrorMessage,
  dob,
  dobError,
  dobErrorMessage,
  isValidField,
  loggingIn,
  LoaderIcon,
  handleModal,
  onSubmitLogin,
  onChangeName,
  onChangePhone,
  onChangeDob,
  birthdateCheck
}) {
  return (
    <div>
      <ResponsiveModal
        onCloseModal={handleModal}
        open={open}
        classNames={{
          overlay: 'bulkOrderOverlayModal',
          modal: 'updateProfileModal'
        }}
      >
        <Row display="block" mr="0" ml="0" mb="10px">
          <Div col="12" ta="center">
            <Heading color="color676767" mt="0" mb="0" fontWeight="400" fontSize="26px" ta="center" fontFamily="light">
              Update Profile
            </Heading>
            <Text color="color676767" ta="center">
              <Title askName={askName} askContact={askContact} askBirthDate={askBirthDate} />
            </Text>
          </Div>
        </Row>
        <Div ta="center">
          <Text ta="center" fontSize="1.25rem" mb="0.625rem" mt="0" color="rgba(51, 51, 51, 0.85)">
            <form
              onSubmit={onSubmitLogin}
              id="custom_form"
              name="custom_form"
              encType="multipart/form-data"
              className="bulk-order-form"
            >
              {askName && (
                <AskName
                  onChangeName={onChangeName}
                  name={name}
                  nameError={nameError}
                  nameErrorMessage={nameErrorMessage}
                />
              )}
              {askContact && (
                <AskContact
                  onChangePhone={onChangePhone}
                  phone={phone}
                  phoneError={phoneError}
                  phoneErrorMessage={phoneErrorMessage}
                />
              )}
              {askBirthDate && (
                <AskBirthDate
                  skipBirthdateCheck={skipBirthdateCheck}
                  birthdateCheck={birthdateCheck}
                  dob={dob}
                  dobError={dobError}
                  dobErrorMessage={dobErrorMessage}
                  onChangeDob={onChangeDob}
                  isValidField={isValidField}
                  onSubmitLogin={onSubmitLogin}
                  LoaderIcon={LoaderIcon}
                  loggingIn={loggingIn}
                />
              )}
            </form>
            {skipBirthdateCheck && (
              <button
                style={isValidField ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
                disabled={isValidField}
                className="google-login-btn"
                onClick={e => onSubmitLogin(e)}
              >
                {loggingIn && <Img className="spin" src={LoaderIcon} display="inline" width="18px" va="sub" />}
                {loggingIn ? 'Please Wait' : 'Update'}
              </button>
            )}
          </Text>
        </Div>
      </ResponsiveModal>
    </div>
  );
}

UpdateProfile.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  askContact: PropTypes.bool.isRequired,
  askName: PropTypes.bool.isRequired,
  askBirthDate: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  isValidField: PropTypes.bool.isRequired,
  LoaderIcon: PropTypes.string.isRequired,
  handleModal: PropTypes.func.isRequired,
  onSubmitLogin: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangePhone: PropTypes.func.isRequired,
  onChangeDob: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  nameError: PropTypes.bool.isRequired,
  nameErrorMessage: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  phoneError: PropTypes.bool.isRequired,
  phoneErrorMessage: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  dobError: PropTypes.bool.isRequired,
  dobErrorMessage: PropTypes.string.isRequired
};

export default UpdateProfile;
