import React from 'react';
import Container from 'hometown-components/lib/Container';
import Row from 'hometown-components/lib/Row';
import Div from 'hometown-components/lib/Div';
import Section from 'hometown-components/lib/Section';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import Button from 'hometown-components/lib/Buttons';
import { Label } from 'hometown-components/lib/Label';
import TitleBar from 'components/TitleBar';

const Feedback = () => (
  <Div type="block">
    <TitleBar title="FEEDBACK" />
    <Section
      pt="3rem"
      pb="4rem"
      mb="0"
      mt="-0.625rem"
      bg="sectionBgDark"
      boxShadow="0px 1px 6px 0px rgba(0,0,0,0.20)"
      display="flex"
    >
      <Container type="container" pr="1.5rem" pl="1.5rem">
        <Row m="0 -0.625rem">
          <form>
            <Div col="4" pr="0.625rem" pl="0.625rem">
              <FormInput label="Customer First name" type="text" placeholder="" />
            </Div>
            <Div col="4" pr="0.625rem" pl="0.625rem">
              <FormInput label="Customer Last name" type="text" placeholder="" />
            </Div>
            <Div col="4" pr="0.625rem" pl="0.625rem">
              <FormInput label="Registered mobile no" type="text" placeholder="" />
            </Div>
            <Div col="4" pr="0.625rem" pl="0.625rem">
              <FormInput label="Email Address" type="text" placeholder="" />
            </Div>
            <Div col="4" pr="0.625rem" pl="0.625rem">
              <FormInput label="Order number *" type="text" placeholder="" />
            </Div>
            <Div col="4" pr="0.625rem" pl="0.625rem">
              <FormInput label="Store*" type="text" placeholder="" />
            </Div>
            <Div col="4" pr="0.625rem" pl="0.625rem">
              <FormInput label="City*" type="text" placeholder="" />
              <Div mb="0.3125rem">
                <div className="checkbox">
                  <input type="checkbox" id="checkbox" />
                  {/* eslint-disable */}
                  <label htmlFor="checkbox" />
                </div>
                <Label fontSize="0.875em" ml="0.625rem" htmlFor="checkbox">
                  Instore Experience
                </Label>
              </Div>
              <Div mb="0.3125rem">
                <div className="checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox" />
                </div>
                <Label fontSize="0.875em" ml="0.625rem" htmlFor="checkbox">
                  Delivery Experience
                </Label>
              </Div>
              <Div mb="0.3125rem">
                <div className="checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox" />
                </div>
                <Label fontSize="0.875em" ml="0.625rem" htmlFor="checkbox">
                  Fitment Experience
                </Label>
              </Div>
              <Div mb="0.3125rem">
                <div className="checkbox">
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox" />
                </div>
                <Label fontSize="0.875em" ml="0.625rem" htmlFor="checkbox">
                  After Sale service Experience
                </Label>
              </Div>
            </Div>
            <Div col="8" pr="0.625rem" pl="0.625rem">
              <FormInput label="Review" rows={5} type="textarea" placeholder="" />
            </Div>
            <Div col="12" pr="0.625rem" pl="0.625rem" mt="0.3125rem">
              <Div mb="0.3125rem">
                <Label fontSize="0.875em" ml="0" htmlFor="checkbox">
                  <b>Note:</b> Order number / Invoice required for scheduling the service visit.
                </Label>
              </Div>
            </Div>
            <Div col="2" pr="0.625rem" pl="0.625rem" mt="1rem">
              <Button size="block" btnType="primary" fontWeight="regular" height="42px" mt="0.625rem" rows={5}>
                SUBMIT
              </Button>
            </Div>
          </form>
        </Row>
      </Container>
    </Section>
  </Div>
);

export default Feedback;
