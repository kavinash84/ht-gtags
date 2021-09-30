import React from 'react';
import { Link } from 'react-router-dom';
import ContainerHtV1 from 'hometown-components-dev/lib/ContainerHtV1';
import RowHtV1 from 'hometown-components-dev/lib/RowHtV1';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import SectionHtV1 from 'hometown-components-dev/lib/SectionHtV1';
import HeadingHtV1 from 'hometown-components-dev/lib/HeadingHtV1';
import TextHtV1 from 'hometown-components-dev/lib/TextHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
// import TitleBar from 'components/TitleBar';

const phoneIcon = require('../../../static/phone-icon-primary.svg');
const mailIcon = require('../../../static/email-primary.svg');
const mapIcon = require('../../../static/map-icon-primary.svg');

const ContactUs = () => (
  <BoxHtV1 type="block">
    {/* <TitleBar title="Help Center" /> */}
    <SectionHtV1
      pt="3rem"
      pb="3rem"
      mb="0"
      bg="sectionBgDark"
      sx={{
        boxShadow: '0px 1px 6px 0px rgba(0,0,0,0.20)'
      }}
    >
      <ContainerHtV1 type="container" pr="1.5rem" pl="1.5rem">
        <SectionHtV1
          bg="white"
          display="flex"
          mb="1rem"
          mt="1em"
          p="1.25rem"
          sx={{
            boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)'
          }}
        >
          <BoxHtV1>
            <HeadingHtV1 as="h1" mt="0" color="textDark" fontSize="0.875rem" fontFamily="medium" lineHeight="1.5">
              HOMETOWN CARE
            </HeadingHtV1>
            <TextHtV1 color="#8d8d8d" fontSize="0.75rem" mb="0" lineHeight="1.5">
              We would love to hear from you! Reach out to us through any of the modes below, and we shall respond at
              the earliest.
            </TextHtV1>
          </BoxHtV1>
        </SectionHtV1>
        <SectionHtV1 mb="0.625rem" display="block" p="0">
          <RowHtV1 display="block">
            <BoxHtV1 variant="col-6">
              <SectionHtV1
                bg="white"
                mb="1rem"
                mt="1em"
                p="1.25rem"
                sx={{
                  boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)'
                }}
              >
                <HeadingHtV1 mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                  <ImageHtV1 display="inline-block" va="bottom" mr="0.3125rem" src={mapIcon} alt="Phone" width="22px" />
                  Registered and Corporate Office :
                </HeadingHtV1>
                <TextHtV1 color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem" lineHeight="1.5">
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
                </TextHtV1>
              </SectionHtV1>
              <SectionHtV1
                bg="white"
                mb="1rem"
                mt="1em"
                p="1.25rem"
                sx={{
                  boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)'
                }}
              >
                <HeadingHtV1 mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                  <ImageHtV1
                    display="inline-block"
                    va="bottom"
                    mr="0.3125rem"
                    src={phoneIcon}
                    alt="Phone"
                    width="22px"
                  />
                  Call Us
                </HeadingHtV1>
                <TextHtV1 color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem" lineHeight="1.5">
                  TollFree – 1800-210-0004 <br />
                  10.00 a.m. to 7.00 p.m., 365days
                </TextHtV1>
              </SectionHtV1>
              <SectionHtV1
                bg="white"
                mb="1rem"
                mt="1em"
                p="1.25rem"
                sx={{
                  boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)'
                }}
              >
                <HeadingHtV1 mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                  <ImageHtV1
                    display="inline-block"
                    va="bottom"
                    mr="0.3125rem"
                    src={mailIcon}
                    alt="Phone"
                    width="22px"
                  />
                  E-mail Us
                </HeadingHtV1>
                <TextHtV1 color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem" lineHeight="1.5">
                  <a href="mailto:Care@hometown.in" color="textDark">
                    Care@hometown.in
                  </a>{' '}
                  <br />
                  We shall respond in 24working hours.
                </TextHtV1>
              </SectionHtV1>
            </BoxHtV1>
            <BoxHtV1 variant="col-6">
              <SectionHtV1
                bg="white"
                mb="1rem"
                mt="1em"
                p="1.25rem 1.5rem"
                sx={{
                  boxShadow: '1px 2px 5px 0px rgba(0,0,0,0.1)'
                }}
              >
                <RowHtV1 display="block">
                  {/* <BoxHtV1 pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/case-request" className="text-primary">
                      RAISE A CASE REQUEST
                      <LabelHtV1 color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </LabelHtV1>
                    </Link>
                  </BoxHtV1>
                   <BoxHtV1 pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/service-request" className="text-primary">
                      RAISE A SERVICE REQUEST
                      <LabelHtV1 color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </LabelHtV1>
                    </Link>
                  </BoxHtV1>
                  <BoxHtV1 pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/feedback" className="text-primary">
                      FEEDBACK
                      <LabelHtV1 color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </LabelHtV1>
                    </Link>
                  </BoxHtV1> */}
                  <BoxHtV1 pl="0.75rem" pr="0.75rem" p="0.3125rem">
                    <Link to="/grievance" className="text-primary" color="textDark">
                      GRIEVANCE
                      <LabelHtV1 color="#757575" fontSize="1rem" va="top" ml="0.625rem">
                        ❯
                      </LabelHtV1>
                    </Link>
                  </BoxHtV1>
                </RowHtV1>
              </SectionHtV1>
            </BoxHtV1>
            {/* <BoxHtV1 col="6">
              <SectionHtV1 boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" mb="1rem" mr="2rem" p="1.25rem">
                <HeadingHtV1 mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                <ImageHtV1 display="inline-block" va="bottom" mr="0.3125rem" src={phoneIcon} alt="Phone" width="22px" />
                  Call Us
                </HeadingHtV1>
                <TextHtV1 color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem">
                  TollFree – 1800-210-0004 <br />
                  10.00 a.m. to 8.00 p.m., 365days
                </TextHtV1>
              </SectionHtV1>
              <SectionHtV1 boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" mb="1rem" mr="2rem" p="1.25rem">
                <HeadingHtV1 mt="0" mb="0" color="primary" fontSize="1.125rem" fontFamily="medium">
                <ImageHtV1 display="inline-block" va="bottom" mr="0.3125rem" src={mailIcon} alt="Phone" width="22px" />
                  E-mail Us
                </HeadingHtV1>
                <TextHtV1 color="#8d8d8d" fontSize="0.875rem" mb="0" mt="0.625rem">
                  <a href="mailto:Care@hometown.in">Care@hometown.in</a> <br />
                  We shall respond in 24working hours.
                </TextHtV1>
              </SectionHtV1>
            </BoxHtV1> */}
          </RowHtV1>
        </SectionHtV1>
      </ContainerHtV1>
    </SectionHtV1>
  </BoxHtV1>
);

export default ContactUs;
