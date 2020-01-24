import React, { Component } from 'react';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';
import Row from 'hometown-components-dev/lib/RowHtV1';

const cardIcon = require('../../../static/mastercard.svg');
const debitCardIcon = require('../../../static/visa.svg');
const addIcon = require('../../../static/addressAddIcon.svg');
const editIcon = require('../../../static/addressEdit.svg');
const removeIcon = require('../../../static/addressRemove.svg');

class SavedCardsContainer extends Component {
  render() {
    return (
      <Box>
        <Row justifyContent="space-between" ml={0} mr={0} width={1}>
          <Label fontSize={20} fontWeight="500" color="#474747" variant="profileDashBoard">
          Saved Cards
          </Label>
          <ButtonHtV1 bg="#fff" onClick={this.toggleAddAddresForm}>
            <Image src={addIcon} alt="Add another address" />
            <Label fontSize={14} fontWeight="bold" color="#f15a22" variant="profileDashBoard">
            ADD NEW CARD
            </Label>
          </ButtonHtV1>
        </Row>
        <Box
          width="483px"
          pl={16}
          pr={32}
          pt={19}
          sx={{
          boxShadow: '2px 2px 4px 0 rgba(0, 0, 0, 0.22)',
          border: 'solid 0.5px #7a7d7d',
          bg: '#ffffff'
        }}
      >
          <Col>
            <Row justifyContent="space-between">
              <Image src={cardIcon} width="37px" height="26px" />
              <Col>
                <Image src={debitCardIcon} width="56px" height="24px" />
                <Label fontSize={12} fontWeight="300" width={1} variant="profileDashBoard">
                DEBIT CARD
                </Label>
              </Col>
            </Row>
            <Box ml={-12}>
              <Label fontSize={13} fontWeight="normal" width={1} variant="profileDashBoard">
              CARD NUMBER
              </Label>
              <Box fontSize={20} fontWeight="normal" width={1} variant="profileDashBoard">
            6749 34xx xxxx 0000
              </Box>
            </Box>
            <Row justifyContent="space-between" mb={16} mt={15}>
              <Box>
                <Label fontSize={13} fontWeight="normal" width={1} variant="profileDashBoard">
              NAME ON CARD
                </Label>
                <Box fontSize={20} fontWeight="normal" width={1} variant="profileDashBoard">
              Lorem Ipsum
                </Box>
              </Box>
              <Box>
                <Label fontSize={13} fontWeight="normal" width={1} variant="profileDashBoard">
              VALIDITY
                </Label>
                <Box fontSize={20} fontWeight="normal" width={1} variant="profileDashBoard">
              12/23
                </Box>
              </Box>
            </Row>
            <Row>
              <ButtonHtV1 bg="#fff" width="50%">
                <Label fontSize={21} color="#f15a22" variant="profileDashBoard">
                  <Image src={editIcon} height="14px" width="14px" mr={12} />
                  Edit
                </Label>
              </ButtonHtV1>
              <ButtonHtV1 bg="#fff" width="50%">
                <Label fontSize={21} color="#f15a22" variant="profileDashBoard">
                  <Image src={removeIcon} height="18px" width="18px" mr={12} />
                    Remove
                </Label>
              </ButtonHtV1>
            </Row>
          </Col>
        </Box>
      </Box>
    );
  }
}

export default SavedCardsContainer;
