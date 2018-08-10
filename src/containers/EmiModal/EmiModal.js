import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmiModalContainer from 'components/EmiModal/EmiModal';

export default class EmiModal extends Component {
  render() {
    const { data } = this.props;
    return (
      <div>
        <EmiModalContainer data={data} />
      </div>
    );
  }
}

EmiModal.propTypes = {
  data: PropTypes.object.isRequired
};
