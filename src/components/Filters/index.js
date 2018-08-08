import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryFilter from './Categories';

const mapStateToProps = ({ products }) => ({
  filters: products.filter
});

const Filters = ({ filters }) => {
  console.log(filters);
  return <CategoryFilter />;
};

Filters.defaultProps = {
  filters: []
};

Filters.propTypes = {
  filters: PropTypes.array
};

export default connect(mapStateToProps)(Filters);
