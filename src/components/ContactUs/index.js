import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Heading from 'hometown-components/lib/Heading';
import Text from 'hometown-components/lib/Text';
import Img from 'hometown-components/lib/Img';
import Span from 'hometown-components/lib/Span';
import TitleBar from 'components/TitleBar';

const phoneIcon = require('../../../static/phone-icon-primary.svg');
const mailIcon = require('../../../static/email-primary.svg');
const mapIcon = require('../../../static/map-icon-primary.svg');

const ContactUs = () => (
  <Div type="block">
    <TitleBar title="Help Center" />
    <Section pt="3rem" pb="3rem" mt="-0.625rem" mb="0" bg="sectionBgDark" boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)">
      <Container type="container" pr="1.5rem" pl="1.5rem">
        <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" display="flex" mb="1rem">
          <Div>
            <Heading mt="0" color="textDark" fontSize="0.875rem" fontFamily="medium">
              HOMETOWN CARE
            </Heading>
            <Text color="#8d8d8d" fontSize="0.75rem" mb="0">
              We would love to hear from you! Reach out to us through any of the modes below, and we shall respond at
              the earliest.
            </Text>
          </Div>
        </Section>
        <Section mb="0.625rem" display="block" p="0">
          <Row display="block" mr="0" ml="0">
            <Div col="6">
              <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" mb="1rem" mr="2rem" p="1.25rem">
                <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                  <Img display="inline-block" va="bottom" mr="0.3125rem" src={mapIcon} alt="Phone" width="22px" />
                  Corporate Address :
                </Heading>
                <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem">
                  Praxis Home Retail Limited (“PHRL”),
                  <br />
                  iThink Techno Campus,
                  <br />
                  Jolly Board Tower D, Ground Floor,
                  <br />
                  Kanjurmarg (East), Mumbai 400042
                </Text>
              </Section>
              <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" mb="1rem" mr="2rem" p="1.25rem">
                <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                  <Img display="inline-block" va="bottom" mr="0.3125rem" src={phoneIcon} alt="Phone" width="22px" />
                  Call Us
                </Heading>
                <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem">
                  TollFree – 1800-210-0004 <br />
                  10.00 a.m. to 8.00 p.m., 365days
                </Text>
              </Section>
              <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" mb="1rem" mr="2rem" p="1.25rem">
                <Heading mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                  <Img display="inline-block" va="bottom" mr="0.3125rem" src={mailIcon} alt="Phone" width="22px" />
                  E-mail Us
                </Heading>
                <Text color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem">
                  <a href="mailto:Care@hometown.in">Care@hometown.in</a> <br />
                  We shall respond in 24working hours.
                </Text>
              </Section>
            </Div>
            <Div col="6">
              <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" mb="1rem" p="1.25rem 1.5rem">
                <Row display="block">
                  <Div pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/case-request" className="text-primary">
                      RAISE A CASE REQUEST
                      <Span color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </Span>
                    </Link>
                  </Div>
                  {/* <Div pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/service-request" className="text-primary">
                      RAISE A SERVICE REQUEST
                      <Span color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </Span>
                    </Link>
                  </Div>
                  <Div pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/feedback" className="text-primary">
                      FEEDBACK
                      <Span color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </Span>
                    </Link>
                  </Div>
                  <Div pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/grievance" className="text-primary">
                      GRIEVANCE
                      <Span color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </Span>
                    </Link>
                  </Div> */}
                </Row>
              </Section>
            </Div>
          </Row>
        </Section>
      </Container>
    </Section>
  </Div>
);

export default ContactUs;
