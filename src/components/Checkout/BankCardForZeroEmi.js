import React from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';

const changeDetails = (dispatcher, gateway, name, detailkey, emiCode, type) => () => {
  dispatcher({ gateway, data: { [detailkey]: name, emiCode, cardType: type } });
};

const BankCard = ({
 name, img, setPaymentDetails, gateway, detailkey, details: { emiCode }
}) => (
  <React.Fragment>
    <Row w={1 / 2} mb={20}>
      <Col>
        <Label for={`bankOptions${name}`} bg="white" mr={10}>
          <Image src={img} alt={name} maxHeight={24} sx={{ flexShrink: 0 }} />
        </Label>
      </Col>
    </Row>
    <Row w={1 / 2}>
      <Col onClick={changeDetails(setPaymentDetails, gateway, name, detailkey, 'EMI3', 'credit')} pa={10}>
        <Flex alignItems="center">
          <Box
            as="input"
            type="radio"
            name="bankOptions"
            id={`bankOptions${name}`}
            checked={emiCode === 'EMI3'}
            mr={10}
          />
          <Box>
            <Label fontSize="0.875em">HDFC Credit</Label>
          </Box>
        </Flex>
      </Col>
      <Col onClick={changeDetails(setPaymentDetails, gateway, name, detailkey, 'HDFCD03', 'debit')} pa={10}>
        <Flex alignItems="center">
          <Box
            as="input"
            type="radio"
            name="bankOptions"
            id={`bankOptions${name}`}
            checked={emiCode === 'HDFCD03'}
            mr={10}
          />
          <Box>
            <Label fontSize="0.875em">HDFC Debit</Label>
          </Box>
        </Flex>
      </Col>
    </Row>
  </React.Fragment>
);

BankCard.defaultProps = {
  img: '',
  name: ''
};

BankCard.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  detailkey: PropTypes.string.isRequired,
  gateway: PropTypes.string.isRequired,
  setPaymentDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired
};

export default BankCard;
