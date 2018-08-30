import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from 'redux/modules/address';

const submitForm = () => e => {
  e.preventDefault();
  console.log('test');
};

const mapStateToProps = (state, props) => ({
  name: state.address[props.formType].name
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

const SimpleForm = ({ name, formType, onChangeName }) => (
  <form onSubmit={submitForm()}>
    <input type="text" onChange={e => onChangeName(formType, e.target.value)} value={name} />
  </form>
);

SimpleForm.defaultProps = {
  name: '',
  formType: ''
};

SimpleForm.propTypes = {
  name: PropTypes.string,
  formType: PropTypes.string,
  onChangeName: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleForm);
