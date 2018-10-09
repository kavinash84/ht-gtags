import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

export default class MenuFooter extends Component {
  render() {
    const { children, pageTitle } = this.props;
    return (
      <div>
        <Helmet title={pageTitle} />
        <Menu />
        {children}
        <Footer />
      </div>
    );
  }
}

MenuFooter.propTypes = {
  children: PropTypes.object.isRequired,
  pageTitle: PropTypes.string
};

MenuFooter.defaultProps = {
  pageTitle: ''
};
