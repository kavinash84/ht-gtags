import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import Footer from 'components/Footer';
import Header from 'newComponents/Header';

export default class MenuFooter extends Component {
  render() {
    const {
 children, pageTitle, seoDescription, seoKeywords
} = this.props;
    return (
      <div>
        {pageTitle && <Helmet title={pageTitle} />}
        <Helmet>
          {seoDescription && <meta name="description" content={seoDescription} />}
          {seoKeywords && <meta name="keywords" content={seoKeywords} />}
        </Helmet>
        <Header />
        {children}
        {pageTitle && pageTitle === 'Bulk Order' ? '' : <Footer />}
      </div>
    );
  }
}

MenuFooter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  pageTitle: PropTypes.string,
  seoDescription: PropTypes.string,
  seoKeywords: PropTypes.string
};

MenuFooter.defaultProps = {
  pageTitle: null,
  seoDescription: null,
  seoKeywords: null
};
