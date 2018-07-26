import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import Text from 'hometown-components/lib/Text';
import TitleBar from 'components/TitleBar';

const Grievance = () => (
  <Div type="block">
    <TitleBar title="GRIEVANCE" />
    <Section
      pt="3rem"
      pb="3rem"
      mb="0"
      mt="-0.625rem"
      bg="sectionBgDark"
      boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
      display="flex"
    >
      <Container type="container" pr="1.5rem" pl="1.5rem">
        <Section boxShadow="1px 2px 5px 0px rgba(0,0,0,0.1)" bg="white" display="flex" mb="1rem" p="1.5rem">
          <Div>
            <Text color="#8d8d8d" fontSize="1rem" mb="1.5rem" mt="0">
              At HomeTowm, it is our endeavor to provide the best in customer service. It is our priority to positively
              respond and address any concerns you may have at the earliest. To ensure this, our team is continuously
              working to provide you the best of support though a few concern/issues that are complex in nature may
              require additional time to resolve. Concerns not Addressed?
            </Text>
            <Text color="#8d8d8d" fontSize="1rem" mb="0" mt="0">
              You may write to the Head of Customer Support at cshead@hometown.in if the ticket raised remains
              unattended / not responded for 72hours. While writing, please do quote original date of raising the issue
              and allied resolution offered by our customer support team. Please allow 24-48 hours for a resolution. We
              value every communication sent and look forward to speedily resolve it.
            </Text>
          </Div>
        </Section>
      </Container>
    </Section>
  </Div>
);

export default Grievance;
