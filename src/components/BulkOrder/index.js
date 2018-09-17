import React from 'react';
import Container from 'hometown-components/lib/Container';
import Div from 'hometown-components/lib/Div';
import Row from 'hometown-components/lib/Row';
import Section from 'hometown-components/lib/Section';
import Img from 'hometown-components/lib/Img';
import Heading from 'hometown-components/lib/Heading';
import FormInput from 'hometown-components/lib/Forms/FormInput';
import { Label } from 'hometown-components/lib/Label';
import InputField from 'hometown-components/lib/InputField';
import Text from 'hometown-components/lib/Text';
import Button from 'hometown-components/lib/Buttons';
import TitleBar from '../TitleBar';

const bulkOrderBG = require('../../../static/bulk-order-collage.jpg');
const styles = require('./BulkOrder.scss');

const BulkOrder = () => (
  <Div type="block">
    <TitleBar title="Bulk Order" />
    <Section display="flex" pt="2rem" pb="2.5rem" mb="0" height="auto">
      <Container type="container" pr="0" pl="0">
        <Row display="block" mr="0" ml="0">
          <Div col="12">
            <Img src={bulkOrderBG} alt="" />
          </Div>
        </Row>
        <Row display="block" mr="0" ml="0">
          <Div col="12" className={styles.headerContent}>
            <Heading mt="0">Bulk Order</Heading>
            <Text fontSize="1rem">In this gifting season select the most appropriate gift for your Friends/Teams</Text>
            <ul>
              <li>1. A bulk order can be placed from anywhere in India and will be delivered there </li>
              <li>
                2. You may also request HomeTown products which are not featured on webstores and we can arrange to send
                you images and possible samples{' '}
              </li>
              <li>3. we can make personalized products for you depending on the quantity </li>
              <li>4. Rest assured to get volume discounts </li>
              <li>
                5. Once registered with us as a bulk buyer customer, enjoy special promotions and offer only for you{' '}
              </li>
              <li>6. we will revert within 1 working day on an enquiry</li>
            </ul>
            <Div col="12" mt="2rem">
              <form
                method="post"
                id="custom_form"
                action="/customer/order/bulkorder"
                name="custom_form"
                encType="multipart/form-data"
                className="bulk-order-form"
              >
                <div className={styles.formList}>
                  <Text ta="center" mt="0" mb="0.3125rem" fontSize="0.875rem">
                    To know more, call us at 18002100004
                  </Text>
                  <Text fontSize="0.875rem" ta="center" mt="0" mb="0.3125rem">
                    Or
                  </Text>
                  <Text fontSize="0.875rem" ta="center" mt="0" mb="1.5rem">
                    Drop in your Requirement.
                  </Text>
                  <Div col="6" pl="10px" pr="10px">
                    <FormInput label="Name*" type="text" placeholder="" />
                  </Div>
                  <Div col="6" pl="10px" pr="10px">
                    <FormInput label="Email*" type="text" placeholder="" />
                  </Div>
                  <Div col="6" pl="10px" pr="10px">
                    <FormInput label="Mobile No.*" type="text" placeholder="" />
                  </Div>
                  <Div col="6" pl="10px" pr="10px">
                    <InputField mb="0.625rem">
                      <Label fontSize="0.875em" mb="0.625rem">
                        Category*
                      </Label>
                      <select className="form-control" name="bulkOrderCategory">
                        <option value="Furniture">Furniture</option>
                        <option value="Home Furnishings">Home Furnishings</option>
                        <option value="Home Decor">Home Decor</option>
                        <option value="Tableware">Tableware</option>
                        <option value="Tableware">Kitchenware</option>
                        <option value="Home Improvement">Home Improvement</option>
                      </select>
                    </InputField>
                  </Div>
                  <Div col="6" pl="10px" pr="10px">
                    <FormInput label="Budget*" type="text" placeholder="" />
                  </Div>
                  <Div col="6" pl="10px" pr="10px">
                    <FormInput label="Quantity*" type="text" placeholder="" />
                  </Div>
                  <Div col="6" pl="10px" pr="10px">
                    <div className="buttons-set">
                      <Button btnType="primary" mt="0.625rem" title="Submit" type="submit">
                        Submit
                      </Button>
                    </div>
                  </Div>
                </div>
              </form>
            </Div>
          </Div>
        </Row>
      </Container>
    </Section>
  </Div>
);

export default BulkOrder;
