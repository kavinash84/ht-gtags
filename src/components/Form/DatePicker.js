import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Form.module.scss';
import './Form.module.css';

// FIXME - change it to HTC
function DatePickerForm({
 onChange, dobError, dobErrorMessage, ...props
}) {
  return (
    <div className={styles.profile_datepicker}>
      <p className={styles.label}>Date of birth *</p>
      <DatePicker {...props} onChange={onChange} />
      {console.log(dobError, 'dobError')}
      {dobError ? <p className={styles.error}>{dobErrorMessage}</p> : null}
    </div>
  );
}

DatePickerForm.propTypes = {
  onChange: PropTypes.func,
  dobError: PropTypes.bool,
  dobErrorMessage: PropTypes.string
};

DatePickerForm.defaultProps = {
  onChange: () => {},
  dobError: false,
  dobErrorMessage: ''
};

export default DatePickerForm;
