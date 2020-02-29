import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'hometown-components-dev/lib/ContainerHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Section from 'hometown-components-dev/lib/SectionHtV1';
import Heading from 'hometown-components-dev/lib/HeadingHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';

const phoneIcon = require('../../../static/phone-icon-primary.svg');
const mailIcon = require('../../../static/email-primary.svg');
const mapIcon = require('../../../static/map-icon-primary.svg');

const ContactUs = () => (
  <Box bg="#f7f7f7">
    <Container pt={[40, 40, 40, 60]}>
      <Section
        bg="white"
        display="flex"
        mt={0}
        mb={0}
        p="1.25rem"
        sx={{
          boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)'
        }}
      >
        <Box>
          <Heading mt="0" color="textDark" fontSize="0.875rem" fontFamily="medium" lineHeight="1.5">
            HOMETOWN CARE
          </Heading>
          <Text color="#8d8d8d" fontSize="0.75rem" mb="0" lineHeight="1.5">
            We would love to hear from you! Reach out to us through any of the modes below, and we shall respond at the
            earliest.
          </Text>
        </Box>
      </Section>
      <Section mb="0.625rem" p="0" mt={0}>
        <Row>
          <Col width={[1, 1, 1 / 2, 1 / 2]}>
            <Section bg="white" mb="1rem" mt="1em" p="1.25rem" sx={{ boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)' }}>
              <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                <Flex alignItems="center">
                  <Image mr="0.3125rem" src={mapIcon} alt="Phone" width="22px" />
                  Registered and Corporate Office :
                </Flex>
              </Heading>
              <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem" lineHeight="1.5">
                Praxis Home Retail Limited (“PHRL”),
                <br />
                (f/k/a Praxis Home Retail Private Limited),
                <br />
                iThink Techno Campus,
                <br />
                Jolly Board Tower D, Ground Floor,
                <br />
                Kanjurmarg (East), Mumbai 400042,
                <br />
                CIN - L52100MH2011PLC212866
              </Text>
            </Section>
            <Section bg="white" mb="1rem" mt="1em" p="1.25rem" sx={{ boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)' }}>
              <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                <Flex alignItems="center">
                  <Image mr="0.3125rem" src={phoneIcon} alt="Phone" width="22px" />
                  Call Us
                </Flex>
              </Heading>
              <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem" lineHeight="1.5">
                TollFree – 1800-210-0004 <br />
                10.00 a.m. to 8.00 p.m., 365days
              </Text>
            </Section>
            <Section bg="white" mb="1rem" mt="1em" p="1.25rem" sx={{ boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)' }}>
              <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                <Image mr="0.3125rem" src={mailIcon} alt="Phone" width="22px" />
                E-mail Us
              </Heading>
              <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem" lineHeight="1.5">
                <a href="mailto:Care@hometown.in" color="textDark">
                  Care@hometown.in
                </a>{' '}
                <br />
                We shall respond in 24working hours.
              </Text>
            </Section>
          </Col>
          <Col width={[1, 1, 1 / 2, 1 / 2]}>
            <Section
              bg="white"
              mb="1rem"
              mt="1em"
              p="1.25rem 1.5rem"
              sx={{ boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)' }}
            >
              <Row>
                {/* <Box pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/case-request" className="text-primary">
                      RAISE A CASE REQUEST
                      <Label color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </Label>
                    </Link>
                  </Box>
                   <Box pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/service-request" className="text-primary">
                      RAISE A SERVICE REQUEST
                      <Label color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </Label>
                    </Link>
                  </Box>
                  <Box pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/feedback" className="text-primary">
                      FEEDBACK
                      <Label color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </Label>
                    </Link>
                  </Box> */}
                <Box pl="0.75rem" pr="0.75rem" p="0.3125rem">
                  <Link to="/grievance" color="primary">
                    <Flex alignItems="center">
                      GRIEVANCE
                      <Label color="#757575" fontSize="1rem" ml="0.625rem">
                        ❯
                      </Label>
                    </Flex>
                  </Link>
                </Box>
              </Row>
            </Section>
          </Col>
          {/* <Box col="6">
              <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" mb="1rem" mr="2rem" p="1.25rem">
                <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                <Image va="bottom" mr="0.3125rem" src={phoneIcon} alt="Phone" width="22px" />
                  Call Us
                </Heading>
                <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem">
                  TollFree – 1800-210-0004 <br />
                  10.00 a.m. to 8.00 p.m., 365days
                </Text>
              </Section>
              <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" mb="1rem" mr="2rem" p="1.25rem">
                <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                <Image va="bottom" mr="0.3125rem" src={mailIcon} alt="Phone" width="22px" />
                  E-mail Us
                </Heading>
                <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem">
                  <a href="mailto:Care@hometown.in">Care@hometown.in</a> <br />
                  We shall respond in 24working hours.
                </Text>
              </Section>
            </Box> */}
        </Row>
      </Section>
    </Container>
  </Box>
);

export default ContactUs;
