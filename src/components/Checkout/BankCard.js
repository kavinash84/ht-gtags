import React from 'react';
import PropTypes from 'prop-types';
import Div from 'hometown-components/lib/Div';
import { Label } from 'hometown-components/lib/Label';

const styles = require('./Checkout.scss');

const changeDetails = (dispatcher, gateway, name, detailkey) => () => {
  dispatcher({ gateway, data: { [detailkey]: name } });
};

const BankCard = ({
  name, img, setPaymentDetails, gateway, detailkey, currentSelection
}) => (
  <Div col="4" pr="1rem" onClick={changeDetails(setPaymentDetails, gateway, name, detailkey)}>
    <Div className={styles.bankCard}>
      <input type="radio" name="bankOptions" id={`bankOptions${name}`} checked={currentSelection === name} />
      <Label for={`bankOptions${name}`} bg="#FFF" mb="15px">
        <img src={img} alt={name} />
      </Label>
    </Div>
  </Div>
);

BankCard.defaultProps = {
  img: '',
  name: '',
  currentSelection: ''
};

BankCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  detailkey: PropTypes.string.isRequired,
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  currentSelection: PropTypes.string
};

export default BankCard;
