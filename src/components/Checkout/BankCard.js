import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';

const styles = require('./Checkout.scss');

const BankCard = ({ name, img }) => (
  <Div col="4" pr="1rem">
    <Div className={styles.bankCard}>
      <input type="radio" name="bankOptions" id="bankOptions1" />
      <Label for="bankOptions1" bg="#FFF">
        <img src={img} alt={name} />
      </Label>
    </Div>
  </Div>
);

BankCard.defaultProps = {
  img: '',
  name: ''
};

BankCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string
};

export default BankCard;
