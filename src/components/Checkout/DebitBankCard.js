import React from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';

import { setCreditCard } from "../../redux/modules/paymentoptions";
import { connect } from 'react-redux';

const changeDetails = (dispatcher, gateway, name, detailkey) => {
  dispatcher({ gateway, data: { [detailkey]: name } });
};

@connect(({ paymentoptions }) => ({
    isCreditSelected : paymentoptions.isCreditSelected
  }))

class DebitBankCard extends React.Component {

    static contextTypes = {
        store: PropTypes.object.isRequired
      };
    
    handleClick = (value) => {
      const { dispatch } = this.context.store;
      dispatch(setCreditCard(value));
    }

  render() { 
    const {name, img, setPaymentDetails, gateway, detailkey, currentSelection, isCreditSelected} = this.props;
    return (
      <Col variant="col-4" onClick={() =>{
        this.handleClick(false);
        changeDetails(setPaymentDetails, gateway, name, detailkey);
        }
       } py={10}>
      <Flex alignItems="center">
        <Box
          as="input"
          type="radio"
          name="debitcardbankOptions"
          id={`debitcardbankOptions${name}`}
          checked={currentSelection === name && !isCreditSelected }
          mr={10}
        />
        <Label for={`debitcardbankOptions${name}`} bg="white">
          <Image src={img} alt={name} maxHeight={30} sx={{ flexShrink: 0 }} />
        </Label>
      </Flex>
    </Col>
    );
  }
}
 
export default DebitBankCard;

DebitBankCard.defaultProps = {
  img: '',
  name: '',
  currentSelection: ''
};

DebitBankCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  detailkey: PropTypes.string.isRequired,
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  currentSelection: PropTypes.string
};

