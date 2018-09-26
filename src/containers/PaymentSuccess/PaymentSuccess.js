import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaymentSuccess from 'components/PaymentSuccess';
import MenuFooter from 'containers/MenuFooter';
import { connect } from 'react-redux';

@connect(({ paymentstatus: { data, loaded, error } }) => ({
  data,
  loaded,
  error
}))
export default class PaymentSuccessContainer extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  static propTypes = {
    data: PropTypes.object,
    error: PropTypes.string,
    loaded: PropTypes.bool
  };
  static defaultProps = {
    data: {},
    error: '',
    loaded: false
  };
  componentDidMount() {
    const { error } = this.props;
    if (error === '') {
      const { dispatch } = this.context.store;
      dispatch({
        type: 'PUSH_TO_DATALAYER'
      });
    }
  }
  render() {
    const { data, error, loaded } = this.props;
    return (
      <MenuFooter>
        <PaymentSuccess data={data} error={error} loaded={loaded} />
      </MenuFooter>
    );
  }
}
