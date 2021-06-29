/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/RowHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
// import Heading from 'hometown-components-dev/lib/HeadingHtV1';

import CategoryBannerImage from './CategoryBannerImage';
import HtExclusiveContainer from './HtExclusiveContainer';

import CategoryHeader from './Header';
import Separator from '../../../static/htexclusive/separator.svg';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate1({ data }) {
  const {
 mainTitle, subTitles, description, banner, headerTitle, headerSubtitle, headerLink
} = data;
  return (
    <Box mb="-60px">
      {headerTitle && headerSubtitle && (
        <CategoryHeader mainTitle={headerTitle} subTitle={headerSubtitle} link={headerLink} />
      )}

      <CategoryBannerImage banner={banner} />

      <HtExclusiveContainer>
        <Box
          sx={{
            position: 'relative',
            bottom: '120px'
          }}
        >
          <Box
            sx={{
              backgroundColor: '#252525',
              height: '250px'
            }}
          >
            <Box pa="25px">
              <h2 className={styles.descriptionTitle}>{mainTitle}</h2>
            </Box>
            <Flex pb="25px" px="7.5rem" justifyContent="space-between">
              <Col variant="col-3" px="0" py="0">
                <h3 className={styles.subTitlesBold}>{subTitles[0].boldText}</h3>
                <span className={styles.subTitlesLight}>{subTitles[0].normalText}</span>
              </Col>
              <Flex>
                <Image src={Separator} alt="seperator" className={styles.separator} />
              </Flex>
              <Col variant="col-3" px="0" py="0">
                <h3 className={styles.subTitlesBold}>{subTitles[1].boldText}</h3>
                <span className={styles.subTitlesLight}>{subTitles[1].normalText}</span>
              </Col>
              <Flex>
                <Image src={Separator} alt="seperator" className={styles.separator} />
              </Flex>
              <Col variant="col-3" px="0" py="0">
                <h3 className={styles.subTitlesBold}>{subTitles[2].boldText}</h3>
                <span className={styles.subTitlesLight}>{subTitles[2].normalText}</span>
              </Col>
            </Flex>
          </Box>

          <Text sx={{ margin: '20px 0', fontSize: '26px' }} className={styles.descriptionText}>
            {description}
          </Text>
        </Box>
      </HtExclusiveContainer>
    </Box>
  );
}
HtExclusiveTemplate1.propTypes = {
  data: PropTypes.object
};

HtExclusiveTemplate1.defaultProps = {
  data: {
    mainTitle: '',
    subTitles: [],
    description: '',
    banner: '',
    headerSubtitle: '',
    headerTitle: ''
  }
};

export default HtExclusiveTemplate1;
