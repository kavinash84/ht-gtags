import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import Div from 'hometown-components-dev/lib/BoxHtV1';
import ResponsiveModal from 'components/Modal';
import Text from 'hometown-components-dev/lib/TextHtV1';

const formatDate = date => {
  if (date) {
    return moment(date, 'YYYY-MM-DD').toDate();
  }
};

class updateDob extends Component {
  static propTypes = {
    dob: PropTypes.string,
    dobError: PropTypes.bool,
    dobErrorMessage: PropTypes.string,
    open: PropTypes.bool,
    handleModal: PropTypes.func,
    onChangeDob: PropTypes.func,
    onSubmitDob: PropTypes.func
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    dob: '',
    dobError: false,
    dobErrorMessage: '',
    open: false,
    handleModal: () => {},
    onChangeDob: () => {},
    onSubmitDob: () => {}
  };

  render() {
    const {
 dob, dobError, dobErrorMessage, open, handleModal, onChangeDob, onSubmitDob
} = this.props;
    return (
      <ResponsiveModal
        onCloseModal={handleModal}
        open={open}
        classNames={{
          overlay: 'bulkOrderOverlayModal',
          modal: 'updateProfileModal'
        }}
      >
        <Div>
          <Text color="color676767" textAlign="center" mb={20}>
            Pleasse Update Date of Birth
          </Text>
          <Div mb="0.625rem">
            <DatePicker
              placeholderText="Enter your date of birth!"
              // dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              selected={formatDate(dob)}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              onSelect={onChangeDob}
            />
            {dobError && (
              <Text mt={10} color="red" fontSize="12px">
                {dobErrorMessage}
              </Text>
            )}
          </Div>
          <button
            style={dobError ? { backgroundColor: 'grey' } : { backgroundColor: '#f98d29' }}
            disabled={dobError}
            className="google-login-btn"
            onClick={onSubmitDob}
          >
            Update
          </button>
        </Div>
      </ResponsiveModal>
    );
  }
}

export default updateDob;
