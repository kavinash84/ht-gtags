import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input } from 'reactstrap';
import styles from './InputBox.module.css';

const RadioButton = ({
  checked,
  name,
  onChangeInput,
  value,
  label,
  error,
  flexFlow,
}) => {
  const inputProps = {
    name,
    checked,
    value,
    onChange: onChangeInput,
  };
  if (error) inputProps.valid = false;
  return (
    <FormGroup
      check
      className={`${styles.formGroup} ${
        flexFlow === 'inherit' ? 'inherit' : flexFlow
      }`}>
      <Label check>
        <Input type="radio" {...inputProps} />
        {label}
      </Label>
    </FormGroup>
  );
};

RadioButton.defaultProps = {
  errorMessage: '',
  flexFlow: 'inherit',
  labelProps: {},
  inputStyleProps: {},
  accept: ''
};

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  name: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  flexFlow: PropTypes.string,
  labelProps: PropTypes.objectOf(PropTypes.any),
  inputStyleProps: PropTypes.objectOf(PropTypes.any),
  accept: PropTypes.string,
};

export default RadioButton;
