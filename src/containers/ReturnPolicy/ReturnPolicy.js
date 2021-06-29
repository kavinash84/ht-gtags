import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Components
 */
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';

/**
 * Page Components
 */
import MenuFooter from 'containers/MenuFooter';

/**
 * selectors
 */
import { getMetaDescription, getTitle, getText } from 'selectors/homepage';

@connect(({ homepage: { returnpolicy } }) => ({
  seoDescription: getMetaDescription(returnpolicy),
  pageTitle: getTitle(returnpolicy),
  text: getText(returnpolicy)
}))
export default class ReturnPolicy extends Component {
  render() {
    const { seoDescription, pageTitle, text } = this.props;
    return (
      <MenuFooter pageTitle={pageTitle} seoDescription={seoDescription}>
        <ContainerHtV1>
          <Box pt="2rem" pb="2.5rem" dangerouslySetInnerHTML={{ __html: text }} />
        </ContainerHtV1>
      </MenuFooter>
    );
  }
}
ReturnPolicy.defaultProps = {
  seoDescription: '',
  pageTitle: '',
  text: ''
};

ReturnPolicy.propTypes = {
  seoDescription: PropTypes.string,
  pageTitle: PropTypes.string,
  text: PropTypes.string
};
