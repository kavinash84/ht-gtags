import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import Button from 'hometown-components/lib/Buttons';
import Img from 'hometown-components/lib/Img';
import Heading from 'hometown-components/lib/Heading';

const fbIcon = require('../../../static/facebook-round.svg');
const emailIcon = require('../../../static/closed-envelope-circle.svg');
const pintIcon = require('../../../static/pinterest-round.svg');
const shareIcon = require('../../../static/share-symbol.svg');
const styles = require('./ShareBar.scss');

const ShareBar = ({ url, title, ...rest }) => (
  <Div className={styles.shareBar} {...rest}>
    <Heading fontSize="14px" color="textDark" fontWeight="400" mt="0" mb="0" p="0 3px" pb="4px">
      <Img display="inline-block" va="middle" mr="8px" src={shareIcon} alt="Share" width="16px" />
      Share
    </Heading>
    <ul>
      <li>
        <a target="_blank" rel="noopener noreferrer" href={`http://www.facebook.com/sharer.php?u=${url}`}>
          <Button btnType="link" p="5px 3px">
            <Img src={fbIcon} alt="Facebook" width="24px" />
          </Button>
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`http://pinterest.com/pin/create/button/?url=${url}&description=${title}`}
        >
          <Button btnType="link" p="5px 3px">
            <Img src={pintIcon} alt="Pinterest" width="24px" />
          </Button>
        </a>
      </li>
      <li>
        <a target="_blank" rel="noopener noreferrer" href={`mailto:?subject=${title}&body=${url}`}>
          <Button btnType="link" p="5px 3px">
            <Img src={emailIcon} alt="Email" width="24px" />
          </Button>
        </a>
      </li>
    </ul>
  </Div>
);

ShareBar.defaultProps = {
  title: '',
  url: ''
};

ShareBar.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string
};

export default ShareBar;
