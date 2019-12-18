import React from 'react';
import PropTypes from 'prop-types';
import BoxHtV1 from 'hometown-components-dev/lib/BoxHtV1';
import ImageHtV1 from 'hometown-components-dev/lib/ImageHtV1';
import LabelHtV1 from 'hometown-components-dev/lib/LabelHtV1';
import InputFieldHtV1 from 'hometown-components-dev/lib/InputFieldHtV1';

const styles = require('./Checkout.scss');

const changeDetails = (dispatcher, gateway, name, detailkey) => () => {
  dispatcher({ gateway, data: { [detailkey]: name } });
};

const BankCard = ({
 name, img, setPaymentDetails, gateway, detailkey, currentSelection
}) => (
  <BoxHtV1 col="4" pr="1rem" onClick={changeDetails(setPaymentDetails, gateway, name, detailkey)}>
    <BoxHtV1 className={styles.bankCard}>
      <InputFieldHtV1 type="radio" name="bankOptions" id={`bankOptions${name}`} checked={currentSelection === name} />
      <LabelHtV1 for={`bankOptions${name}`} bg="#FFF" mb="15px">
        <ImageHtV1 src={img} alt={name} />
      </LabelHtV1>
    </BoxHtV1>
  </BoxHtV1>
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
