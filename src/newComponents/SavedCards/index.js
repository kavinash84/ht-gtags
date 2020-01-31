import React from 'react';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Button from 'hometown-components-dev/lib/ButtonHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';
import SavedCard from './Card';

/**
 * Icons
 */
const addIcon = require('../../../static/address-add-icon.svg');

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
