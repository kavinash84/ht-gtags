import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

import Arrow from '../../../static/htexclusive/forward-arrow.svg';

const styles = require('./HtExclusive.scss');

function Header({
 mainTitle, link, subTitle, horizontalSeperator
}) {
  if (mainTitle && subTitle) {
    return (
      <Box>
        <Box bg="#F5F5F5" py="20px">
          <h2 className={styles.headerTitle}>{mainTitle}</h2>
          {subTitle && (
            <Link to={link}>
              <Flex justifyContent="center" alignItems="center">
                <Text fontSize="30px" fontWeight="bold" className={styles.subTitle}>
                  {subTitle}
                </Text>
                <Image src={Arrow} ml="5px" height="15px" width="30px" />
              </Flex>
            </Link>
          )}

          {horizontalSeperator && (
            <Flex justifyContent="center">
              <Box className={styles.horizontalSeperator} />
            </Flex>
          )}
        </Box>
      </Box>
    );
  }
  return null;
}

Header.propTypes = {
  mainTitle: PropTypes.string,
  link: PropTypes.string,
  subTitle: PropTypes.string,
  horizontalSeperator: PropTypes.bool
};

Header.defaultProps = {
  mainTitle: '',
  link: '',
  subTitle: '',
  horizontalSeperator: false
};

export default Header;
