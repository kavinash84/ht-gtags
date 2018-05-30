import React from 'react';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';
import FormInput from 'hometown-components/lib/Forms/FormInput';

const styles = require('./Checkout.scss');

const CardForm = () => (
  <Div className={styles.paymentBlock}>
    <Div col="5" pr="1rem">
      <FormInput label="Name on card" type="text" placeholder="" value="" />
    </Div>
    <Div col="5" pr="1rem">
      <FormInput label="Card number" type="text" placeholder="" value="" />
    </Div>
    <Div col="2">
      <FormInput label="CVV" type="text" placeholder="" value="" />
    </Div>
    <Div col="12">
      <Label color="secondary" mb="0.625rem">
        Expiration Date
      </Label>
    </Div>
    <Div col="5">
      <select className={styles.dropDown}>
        <option>01</option>
        <option>02</option>
        <option>03</option>
      </select>
      <select className={styles.dropDown}>
        <option>01</option>
        <option>02</option>
        <option>03</option>
      </select>
    </Div>
  </Div>
);

export default CardForm;
