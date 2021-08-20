import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback, Fade } from 'reactstrap';
import styles from './InputBox.module.css';

const InputBox = ({
  type,
  placeholder,
  onChangeInput,
  value,
  label,
  min,
  error,
  errorMessage,
  flexFlow,
  labelProps,
  inputStyleProps,
  accept
}) => {
  const inputProps = {
    min,
    type,
    value,
    placeholder,
    onChange: onChangeInput,
    accept
  };
  if (error) inputProps.valid = false;
  return (
    <FormGroup
      className={`${styles.formGroup} ${
        flexFlow === 'inherit' ? 'inherit' : flexFlow
      }`}
    >
      <Label for={label} {...labelProps}>
        {label}
      </Label>
      <Input {...inputProps} {...inputStyleProps} />
      <FormFeedback className="text-right">
        <Fade in={error}>{errorMessage}</Fade>
      </FormFeedback>
    </FormGroup>
  );
};

InputBox.defaultProps = {
  errorMessage: '',
  flexFlow: 'inherit',
  labelProps: {},
  inputStyleProps: {},
  accept: '',
  min: ''
};

InputBox.propTypes = {
  min: PropTypes.string,
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

export default InputBox;
