import React, { Component } from 'react';

/**
 * Components
 */
import Box from 'hometown-components-dev/lib/BoxHtV1';
import FormInputHtV1 from 'hometown-components-dev/lib/FormsHtV1/FormInputHtV1';
import ButtonHtV1 from 'hometown-components-dev/lib/ButtonHtV1';
import Col from 'hometown-components-dev/lib/ColHtV1';
import Label from 'hometown-components-dev/lib/LabelHtV1';
import Image from 'hometown-components-dev/lib/ImageHtV1';

/**
 * Icons
 */
const gratificationRectangleIcon = require('../../../static/gratificationRectangle.svg');

class Gratification extends Component {
  render() {
    return (
      <Box>
        <Col pl={0} pr={0}>
          <Col>
            <Label
              sx={{
                fontfamily: 'BanksMilesSingleLine',
                fontSize: '80px',
                fontWeight: 'normal',
                color: '#f15a22',
                textAlign: 'center',
                marginTop: '61px'
              }}
            >
              Lorem ipsum !
            </Label>
            <Label mb={44} mt={10} color="#7a7d7d" textAlign="center" width={1} fontSize={21} fontWeight="500" variant="profileDashBoard">
              Your order has been placed successfully.
            </Label>
          </Col>
          <Box pl={0} pr={0} sx={{ position: 'relative' }}>
            <Image src={gratificationRectangleIcon} height="300px" width={1} />
            <Col sx={{
              position: 'absolute', top: '42px', alignItems: 'center', width: '100%'
            }}
            >
              <Label width={1} textAlign="center" color="#474747" fontSize={17} fontWeight="bold" variant="profileDashBoard">
                Set password & save your details for future
              </Label>
              <FormInputHtV1
                label=""
                type="text"
                placeholder="Type Password *"
                mt={18}
                mb={11}
                width="368px"
              />
              <FormInputHtV1
                label=""
                type="text"
                placeholder="Confirm Password *"
                mb={14}
                width="368px"
              />
              <ButtonHtV1
                btnType="custom"
                fontFamily="HelveticaNeue"
                ta="center"
                color="#ffffff"
                fontSize={17}
                va="middle"
                height="53px"
                bg="#f15a22"
                width="368px"
              >
                    SET PASSWORD
              </ButtonHtV1>
            </Col>
          </Box>
        </Col>
      </Box>
    );
  }
}

export default Gratification;
