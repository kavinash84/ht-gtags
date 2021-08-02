import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Form.module.scss';
import './Form.module.css';

// FIXME - change it to HTC
function DatePickerForm({ onChange, ...props }) {
  return (
    <div className={styles.profile_datepicker}>
      <p className={styles.label}>Date of birth*</p>
      <DatePicker className={styles.custom_profile_datepic} {...props} onChange={onChange} />
    </div>
  );
}

DatePickerForm.propTypes = {
  onChange: PropTypes.func
};

DatePickerForm.defaultProps = {
  onChange: () => {}
};

export default DatePickerForm;
