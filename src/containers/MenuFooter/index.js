import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Menu from 'containers/MenuNew/index';
import Footer from 'components/Footer';

const MenuFooter = ({ children }) => (
  <Fragment>
    <Menu />
    {children}
    <Footer />
  </Fragment>
);

MenuFooter.propTypes = {
  children: PropTypes.object.isRequired
};
