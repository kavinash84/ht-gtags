import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label, Input, FormFeedback, Fade } from 'reactstrap';
import styles from './InputBox.module.css';

export default class DropDown extends Component {
  render() {
    const {
      selectedValue,
      handleChange,
      error,
      errorMessage,
      flexFlow,
      label,
      labelProps,
      inputStyleProps,
      options
    } = this.props;
    return (
      <FormGroup
        className={`${styles.formGroup} ${
          flexFlow === 'inherit' ? 'inherit' : flexFlow
        }`}
      >
        <Label for="exampleSelect" {...labelProps}>
          {label}
        </Label>
        <Input 
          valid={!error ? null : !error}
          type="select"
          onChange={handleChange}
          value={selectedValue}
          {...inputStyleProps}
        >
          <option style={{ display: 'none' }}></option>
          {options.map(option => (
            <option key={option.id} value={option.id}>
              {option.option}
            </option>
          ))}
        </Input>
        <FormFeedback>
          <Fade in={error}>{errorMessage}</Fade>
        </FormFeedback>
      </FormGroup>
    );
  }
}

DropDown.defaultProps = {
  selectedValue: '',
  error: false,
  errorMessage: '',
  flexFlow: 'inherit',
  labelProps: {},
  inputStyleProps: {},
  options: []
};

DropDown.propTypes = {
  selectedValue: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  flexFlow: PropTypes.string,
  label: PropTypes.string.isRequired,
  labelProps: PropTypes.objectOf(PropTypes.any),
  inputStyleProps: PropTypes.objectOf(PropTypes.any),
  options: PropTypes.array.isRequired
};
