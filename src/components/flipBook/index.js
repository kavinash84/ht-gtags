import React, { Component } from 'react';
import { connect } from 'react-redux';
import Text from 'hometown-components-dev/lib/TextHtV1';
import PropTypes from 'prop-types';
import LinkRedirect from 'hometown-components-dev/lib/LinkRedirectHtV1';
/** eslint-disable* */
@connect(
  ({ homepage }) => ({
    menu: homepage.menu.data
  }),
  null
)
class FlipBook extends Component {
  state = {
    // open: false
  };
  handleClick = () => {};
  render() {
    const { menu } = this.props;
    const found = menu.find(menuItem => menuItem.name === 'Festive Catalog') || '';
    return (
      <div>
        <iframe
          src="https://cdn.flipsnack.com/widget/v2/widget.html?hash=1n54iind1j"
          width="100%"
          height="480"
          seamless="seamless"
          scrolling="no"
          frameBorder="0"
          allowFullScreen
          title="Festive Catalog"
        />
        {found ? (
          <div>
            <Text
              as={LinkRedirect}
              variant="menuLight"
              href={found.url_key}
              title={found.name}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Please click here to download the Catalogue
            </Text>
          </div>
        ) : null}
      </div>
    );
  }
}

FlipBook.propTypes = {
  menu: PropTypes.array.isRequired
};

export default FlipBook;
