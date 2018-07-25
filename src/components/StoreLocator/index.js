import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Heading from 'hometown-components/lib/Heading';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Button from 'hometown-components/lib/Buttons';
import { Label } from 'hometown-components/lib/Label';

const styles = require('./StoreLocator.scss');

const StoreLocator = () => (
  <Div type="block">
    <Section mb="0" p="1.375rem 0.5rem" bg="oldMont" boxShadow="0 2px 8px 0 rgba(0, 0, 0, 0.17)">
      <Container type="container" pr="0.5rem" pl="0.5rem">
        <Row display="block" mr="0" ml="0" mb="0">
          <Heading fontSize="1.75rem" color="white" mt="0" mb="0" fontWeight="400">
            Store Locator
          </Heading>
        </Row>
      </Container>
    </Section>
    <Section pt="0" p="0" mb="0">
      <Row display="block" mr="0" ml="0" mb="0">
        <Div className={styles.googleMapWrapper}>
          <iframe
            title="store-locator"
            src="https://www.google.com/maps/d/embed?mid=1qpSPv0L80TUPVteuoiO6EVm4mbw"
            width="100%"
            height="550"
          />
          <Div className={styles.filterWrapper}>
            <div className={`${styles.filterBlock} dropdownWrapper`}>
              <Button
                btnType="custom"
                size="block"
                bg="#FFF"
                color="#656565"
                border="none"
                fontSize="0.75em"
                tt="uppercase"
                fontWeight="medium"
                className={styles.filterDD}
              >
                Select City
              </Button>
              <div className={`dropDown ${styles.dropDown}`}>
                <ul>
                  <li>
                    <Label fontSize="0.75em" ml="0.625rem">
                      Mumbai
                    </Label>
                  </li>
                  <li>
                    <Label fontSize="0.75em" ml="0.625rem">
                      Mumbai
                    </Label>
                  </li>
                  <li>
                    <Label fontSize="0.75em" ml="0.625rem">
                      Mumbai
                    </Label>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.cistList}>
              <ul>
                <li>
                  <button>
                    <Label fontSize="1rem" mt="0" ml="0">
                      Phoenix United Mall
                    </Label>
                    <address>Phoenix United Mall - 3rd Floor, CP 8, Sector B, LDA Colony, Kanpur Road</address>
                  </button>
                </li>
                <li>
                  <button>
                    <Label fontSize="1rem" mt="0" ml="0">
                      Phoenix United Mall
                    </Label>
                    <address>Phoenix United Mall - 3rd Floor, CP 8, Sector B, LDA Colony, Kanpur Road</address>
                  </button>
                </li>
                <li>
                  <button>
                    <Label fontSize="1rem" mt="0" ml="0">
                      Phoenix United Mall
                    </Label>
                    <address>Phoenix United Mall - 3rd Floor, CP 8, Sector B, LDA Colony, Kanpur Road</address>
                  </button>
                </li>
              </ul>
            </div>
          </Div>
        </Div>
      </Row>
    </Section>
  </Div>
);

export default StoreLocator;
