import React from 'react';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Title from '../Title';

const faqData = require('../../data/FAQ');

const styles = require('./StaticPages.scss');
const CloseIcon = require('../../../static/minus-round.svg');
const OpenIcon = require('../../../static/plus-round.svg');

const FAQ = () => (
  <Container pt={[40, 40, 40, 60]}>
    <Title title="FAQ's" />
    <Box className={styles.staticPageWrapper}>
      {/* eslint-disable */}
      <Row ml="0" mr="0">
        {faqData.map((faqItem, index) => (
          <Box variant="col-12" mb="1rem" key={faqItem.key}>
            <Heading fontFamily="400" fontSize="0.825rem" color="textLight" mb="1.5em">
              {faqItem.key}
            </Heading>
            {faqItem.data.map((faqContent, index) => (
              <Box className={styles.collposeBlock} key={String(index)}>
                <Heading
                  className={styles.collopseHeading}
                  fontFamily="regular"
                  fontSize="1rem"
                  color="secondary"
                  lineHeight="2"
                  mb="1em"
                  ellipsis={false}
                >
                  <Box display="flex">
                    <Image className={styles.close} src={CloseIcon} alt="Close" float="left" mr="0.625rem" />
                    <Image className={styles.open} src={OpenIcon} alt="Open" float="left" mr="0.625rem" />
                    {faqContent.que}
                  </Box>
                  <Text
                    className={styles.collopseContent}
                    color="rgba(0,0,0,0.5)"
                    fontSize="0.875rem"
                    mb="1rem"
                    ml="2.125rem"
                    lh="1.5"
                    dangerouslySetInnerHTML={{ __html: faqContent.ans }}
                  />
                </Heading>
              </Box>
            ))}
          </Box>
        ))}
      </Row>
    </Box>
  </Container>
);

export default FAQ;
