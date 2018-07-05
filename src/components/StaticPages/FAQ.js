import React from 'react';
import TitleBar from 'components/TitleBar';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Section from 'hometown-components/lib/Section';
import faqData from '../../data/faq';

const styles = require('./StaticPages.scss');
const CloseIcon = require('../../../static/minus-round.svg');
const OpenIcon = require('../../../static/plus-round.svg');

const FAQ = () => (
  <Section display="block" p="0" mb="0" height="auto">
    <TitleBar title="Frequently Asked Questions" />
    <Container type="container" pr="0.5rem" pl="0.5rem">
      <Div className={styles.staticPageWrapper} type="block" pt="2rem" pb="2.5rem">
        {/* eslint-disable */}
        <Row ml="0" mr="0">
          {faqData.map((faqItem, index) => (
            <Div mb="1rem">
              <Heading fontWeight="700" fontSize="0.825rem" color="text">
                {faqItem.key}
              </Heading>
              {faqItem.data.map((faqContent, index) => (
                <Div className={styles.collposeBlock}>
                  <Heading
                    className={styles.collopseHeading}
                    fontWeight="400"
                    fontSize="1rem"
                    color="textDark"
                    lh="1.5"
                  >
                    <button>
                      <Img className={styles.close} src={CloseIcon} alt="Close" float="left" mr="0.625rem" />
                      <Img className={styles.open} src={OpenIcon} alt="Open" float="left" mr="0.625rem" />
                      {faqContent.que}
                    </button>
                    <Text
                      className={styles.collopseContent}
                      color="rgba(0,0,0,0.5)"
                      fontSize="0.875rem"
                      mb="1rem"
                      ml="2.125rem"
                    >
                      {faqContent.ans}
                    </Text>
                  </Heading>
                </Div>
              ))}
            </Div>
          ))}
        </Row>
      </Div>
    </Container>
  </Section>
);

export default FAQ;
