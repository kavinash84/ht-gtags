import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as counterActions from 'redux/modules/quantityCounter';

import { bindActionCreators } from 'multireducer';

@connect(
  (state, { counterType: key }) => ({ count: state.counters[key].count }),
  (dispatch, { counterType: key }) => bindActionCreators(counterActions, dispatch, key)
)
export default class ProductQuantityCounter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  };

  render() {
    const { count, increment, decrement } = this.props;
    return (
      <div>
        <button onClick={decrement} disabled={count === 0}>
          {' '}
          -{' '}
        </button>
        <span>{count}</span>
        <button onClick={increment}> + </button>
      </div>
    );
  }
}
