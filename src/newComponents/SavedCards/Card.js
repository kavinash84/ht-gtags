import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Flex from 'hometown-components-dev/lib/FlexHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';

/**
 * Icons
 */
const cardIcon = require('../../../static/master-card.jpg');
const debitCardIcon = require('../../../static/visa.jpg');

const CardDetails = ({ name, value }) => (
  <Fragment>
    <Label fontFamily="light" variant="xSmall" pb={5}>
      {name}
    </Label>
    <Text color="label" fontSize={18}>
      {value}
    </Text>
  </Fragment>
);

CardDetails.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

const SavedCard = ({ cardName, cardNo, validity }) => (
  <Col width={1 / 3} mb={30}>
    <Box sx={{ boxShadow: 'primary', border: 'light' }}>
      <Box p={15}>
        <Flex justifyContent="space-between" pb={5}>
          <Image src={cardIcon} height={32} />
          <Image src={debitCardIcon} height={32} />
        </Flex>
        <Flex justifyContent="flex-end" pb={10}>
          <Label fontFamily="light" variant="xSmall">
            DEBIT CARD
          </Label>
        </Flex>
        <Row mb={20}>
          <Col width={1}>
            <CardDetails name="CARD NUMBER" value={cardNo} />
          </Col>
        </Row>
        <Row>
          <Col width={2 / 3}>
            <CardDetails name="NAME ON CARD" value={cardName} />
          </Col>
          <Col width={1 / 3} textAlign="right" pl={[0, 0, 16]}>
            <CardDetails name="VALIDITY" value={validity} />
          </Col>
        </Row>
      </Box>
      <Row mx={5} py={5} px={5} sx={{ borderTop: 'divider' }}>
        <Col flexGrow={1} sx={{ borderRight: 'divider' }}>
          <Button variant="linkPrimary" height={30}>
            EDIT
          </Button>
        </Col>
        <Col flexGrow={1}>
          <Button variant="linkPrimary" height={30}>
            REMOVE
          </Button>
        </Col>
      </Row>
    </Box>
  </Col>
);

SavedCard.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardNo: PropTypes.string.isRequired,
  validity: PropTypes.string.isRequired
};

export default SavedCard;
