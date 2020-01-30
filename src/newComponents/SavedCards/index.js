import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import Text from 'hometown-components-dev/lib/TextHtV1';
import SavedCard from './Card';

/**
 * Icons
 */
const addIcon = require('../../../static/address-add-icon.svg');

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

const SavedCards = () => (
  <Box>
    <Row justifyContent="space-between" alignItems="center" mx={0} width={1} mb={20}>
      <Label variant="heading.medium">Saved Cards</Label>
      <Button variant="outline.primary" height={42} sx={{ border: 'divider' }}>
        <Image src={addIcon} alt="ADD NEW CARD" /> ADD NEW CARD
      </Button>
    </Row>
    <Row>
      <SavedCard cardName="Lorem Ipsum" cardNo="6749 34xx xxxx 0000" validity="12/23" />
      <SavedCard cardName="Lorem Ipsum" cardNo="6749 34xx xxxx 0000" validity="12/23" />
    </Row>
  </Box>
);

export default SavedCards;
