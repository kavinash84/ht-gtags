/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Flex from 'hometown-components-dev/lib/RowHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';

// import Separator from '../../../static/htexclusive/separator.svg';
import Arrow from '../../../static/arrow_forward.svg';

const styles = require('./HtExclusive.scss');

function HtExclusiveTemplate1({ data }) {
  const {
    mainTitle, subTitles, description, banner, headerTitle, headerSubtitle
  } = data;
  return (
    <Box>
      {headerTitle && headerSubtitle && (
        <Box bg="#F5F5F5" pb="10" >
          <Heading textAlign="center" as="h2" pb="10" className={styles.headerTitle} >
            {headerTitle}
          </Heading>
          <Flex justifyContent="center" alignItems="center">
            <Text textAlign="center" className={styles.subTitle}>{headerSubtitle}</Text>
            <Image src={Arrow} />
          </Flex>
        </Box>
      )}
      <Box>
        <Image src={banner} alt="chester-furniture" height="850px" width="100%" />
      </Box>

      <Box className={styles.desContainer}>
        <Box bg="#252525" height="240px" >
          <Box pa="25px">
            <Text className={styles.descriptionTitle} as="h2">
              {mainTitle}
            </Text>
          </Box>
          <Flex pb="25px" px="7.5rem" justifyContent="space-between">
            <Col variant="col-3" px="0" py="0">
              <Text className={styles.subTitlesBold} as="h3">
                {subTitles[0].boldText}
              </Text>
              <Text className={styles.subTitlesLight} as="span">
                {subTitles[0].normalText}
              </Text>
            </Col>
            <Flex>
              {/* <Image src={Separator} alt="seperator" className={styles.separator} /> */}
            </Flex>
            <Col variant="col-3" px="0" py="0">
              <Text className={styles.subTitlesBold} as="h3">
                {subTitles[1].boldText}
              </Text>
              <Text className={styles.subTitlesLight} as="span">
                {subTitles[1].normalText}
              </Text>
            </Col>
            <Flex>
              {/* <Image src={Separator} alt="seperator" className={styles.separator} /> */}
            </Flex>
            <Col variant="col-3" px="0" py="0">
              <Text className={styles.subTitlesBold} as="h3">
                {subTitles[2].boldText}
              </Text>
              <Text className={styles.subTitlesLight} as="span">
                {subTitles[2].normalText}
              </Text>
            </Col>
          </Flex>
        </Box>
        <Text className={styles.descriptionText}>{description}</Text>
      </Box>
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
