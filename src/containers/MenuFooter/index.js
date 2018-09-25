import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class MenuFooter extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Menu />
        {children}
        <Footer />
      </div>
    );
  }
}

MenuFooter.propTypes = {
  children: PropTypes.object.isRequired
};
